import { Component, Prop, h } from '@stencil/core';
import { JamSeshTrack } from '../../global/interface';

@Component({
  tag: 'jam-player',
  styleUrl: 'jam-player.css',
  shadow: true
})
export class JamPlayer {
  @Prop() track: JamSeshTrack;

  render() {
    return (
      <div class={'jam-player'}>
        
      </div>
    );
  }
}
