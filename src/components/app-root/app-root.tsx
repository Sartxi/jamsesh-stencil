import { Component, h } from '@stencil/core';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'stencil-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  client = new ApolloClient({
    link: createHttpLink({
      uri: 'http://localhost:4000/graphql',
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  });

  render() {
    return (
      <ApolloProvider client={this.client}>
        <div id='JamSesh'>
          <header>
            <stencil-route-link url={'/'}>
              <img src='/assets/icon/icon.png' class='stencil-icon' />
            </stencil-route-link>
            <h1>JamSesh</h1>
          </header>
          <main>
            <stencil-router>
              <stencil-route-switch scrollTopOffset={0}>
                <stencil-route url='/' component='app-home' exact={true} />
                <stencil-route url='/group/:groupId' component='user-groups' />
                <stencil-route url='/member/:userId' component='user-profile' />
              </stencil-route-switch>
            </stencil-router>
          </main>
        </div>
      </ApolloProvider>
    );
  }
}
