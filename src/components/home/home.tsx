import { Component, h } from '@stencil/core';
import gql from 'graphql-tag';
import { Query } from 'stencil-apollo';

const GROUPS = gql`
  query allGroups {
    groups {
      id
      name
    }
  }
`;

@Component({
  tag: 'app-home',
  styleUrl: 'home.css',
  shadow: true
})
export class AppHome {
  render() {
    return (
      <Query query={GROUPS}>
        {({ data, loading }) => {
          if (loading) return 'Loading...';
          return (
            <div class='app-home'>
              <p>Welcome to JamSesh! Join one of your groups to start a sesh.</p>
              <div class='tracks-groups'>
                Your Groups:
                {data['groups'].map(group => {
                  const url = `/group/${group.id}`;
                  return (
                    <stencil-route-link class={'group-lnk'} url={url}>
                      <button class='group-btn'>{group.name}</button>
                    </stencil-route-link>
                  )
                })}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
