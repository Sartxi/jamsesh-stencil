import { Component, Prop, h } from '@stencil/core';
import { JamSeshTrack } from '../../global/interface';

@Component({
  tag: 'jam-card',
  styleUrl: 'jam-card.css',
  shadow: true
})
export class JamCard {
  @Prop() track: JamSeshTrack;

  render() {
    return (
      <div class={'jam-card'}>
        
      </div>
    );
  }
}
