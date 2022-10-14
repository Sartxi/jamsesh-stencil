import { Component, Prop, h } from '@stencil/core';
import { MatchResults } from '@stencil-community/router';

@Component({
  tag: 'user-profile',
  styleUrl: 'profile.css',
  shadow: true,
})
export class UserProfile {
  @Prop() match: MatchResults;

  normalize(name: string): string {
    if (name) {
      return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
    }
    return '';
  }

  render() {
    // const user = getUser(this.match.params.userId);
    if (this.match && this.match.params.userId) {
      return (
        <div class="member">
          <p>Hello! My name is. My name was passed in through a route param!</p>
        </div>
      );
    }
  }
}
