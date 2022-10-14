import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
import { Query } from 'stencil-apollo';
import gql from 'graphql-tag';

const USER = gql`
  query User($id: Int!) {
    user(id: $id) {
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
  tag: 'user-card',
  styleUrl: 'user-card.css',
  shadow: true
})
export class UserCard {
  @Prop() userId: number;
  @Prop() simple: boolean;

  @Event() userTapped: EventEmitter<number>;

  render() {
    return (
      <Query query={USER} variables={{ id: this.userId }} options={{ query: USER, pollInterval: 5000 }}>
        {({ data, loading }) => {
          if (loading) return 'Loading...';
          const user = data['user'];
          return (
            <div class={`user-card ${this.simple ? "simple" : ""}`}>
              {!this.simple ? <div class={'close'} onClick={() => this.userTapped.emit(null)}>X</div> : <span />}
              <div class={'avatar'}>
                <img src={`${user.avatar}`} />
              </div>
              <h2>{user.firstName} {user.lastName}</h2>
              <div class={'since'}>Member Since 22</div>
              {this.simple ? <span /> : (
                <div>
                  <div class={'status'}>
                    <div class={'speak'} />
                    {user.status}
                  </div>
                  <div class={'music'}>
                    <spotify-player userId={this.userId} />
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </Query>
    )
  }
}
