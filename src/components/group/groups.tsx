import { Component, Prop, h, State, Listen } from '@stencil/core';
import { MatchResults } from '@stencil-community/router';
import { Query } from 'stencil-apollo';
import gql from 'graphql-tag';

const GROUP = gql`
  query Group($id: Int!) {
    group(id: $id) {
      id
      name
    }
  }
`;

@Component({
  tag: 'user-groups',
  styleUrl: 'groups.css',
  shadow: true,
})
export class UserGroups {
  @Prop() match: MatchResults;
  @State() selectedUser: number;

  @Listen('userTapped')
  userTappedHandler(event: CustomEvent<number>) {
    this.selectedUser = event.detail;
  }

  render() {
    if (!this.match || !this.match.params.groupId) return <span />;
    const groupId = this.match.params.groupId;

    return (
      <Query query={GROUP} variables={{ id: parseInt(groupId, 10) }}>
        {({ data, loading }) => {
          if (loading) return 'Loading...';
          const group = data['group'];
          return (
            <div class='groups'>
              <h3>{group.name}</h3>
              <group-map group={group.id} selectedUser={this.selectedUser} />
              {this.selectedUser && (
                <div class={'selected'}>
                  {this.selectedUser ? <user-card userId={this.selectedUser} /> : <span />}
                </div>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}
