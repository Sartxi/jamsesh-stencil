import { Component, Prop, h } from '@stencil/core';
import { Query } from 'stencil-apollo';
import gql from 'graphql-tag';

const GROUPUSERS = gql`
  query GroupUsers($id: Int!) {
    groupUsers(groupId: $id) {
        id
        firstName
        lastName
        status
        avatar
        lat
        lng
        created
        groupId
    }
  }
`;

@Component({
    tag: 'group-map',
    styleUrl: 'group-map.css',
    shadow: true,
})
export class UserGroups {
    @Prop() group: number;
    @Prop() selectedUser: number;

    render() {
        return (
            <Query query={GROUPUSERS} variables={{ id: this.group }}>
                {({ data, loading }) => {
                    if (loading) return 'Loading...';
                    const users = data['groupUsers'];
                    return (
                        <div id="MapScreen">
                            <div id="MapGL">
                                <map-gl id="map" users={users} apiKey={process.env.MAP_API_TOKEN} />
                            </div>
                            {!this.selectedUser ? (
                                <div class={'members'}>
                                    <h4>Active Members</h4>
                                    {users.map(user => {
                                        return <user-card simple={true} userId={user.id} />
                                    })}
                                </div>
                            ) : <span />}
                        </div>
                    );
                }}
            </Query>
        );
    }
}
