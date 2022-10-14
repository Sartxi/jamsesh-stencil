import { Component, Element, h, Prop } from '@stencil/core';
import { getTrack } from './mock';

@Component({
    tag: 'spotify-player',
    styleUrl: 'spotify-player.css',
})
export class SpotifyPlayer {
    private spotifyPlayer: any;
    @Prop() userId: number;
    @Element() playerEl: HTMLElement;

    componentDidLoad() {
        const spotifyCDN = document.createElement('script');
        spotifyCDN.src = 'https://sdk.scdn.co/spotify-player.js';
        this.playerEl.insertAdjacentElement('beforebegin', spotifyCDN);

        window.onSpotifyWebPlaybackSDKReady = () => {
            this.spotifyPlayer = new Spotify.Player({
                name: 'JamSesh Playlist',
                getOAuthToken: cb => { cb(process.env.SPOTIFY_TOKEN); },
                volume: 0.7
            });
            this.spotifyPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });
            this.spotifyPlayer.connect();
        }
    }

    componentDidRender() {
        this.playerEl.querySelector('#SpotifyPlay').addEventListener('click', () => {
            this.spotifyPlayer.togglePlay();
            console.log('play');
        });
    }

    render() {
        const { song, artist, album } = getTrack(this.userId);
        return (
            <div id="SpotifyPlayer">
                <button id="SpotifyPlay" class={'play-button'}>Jam</button>
                <div class={'track'}>
                    <div class={'song'}>{song}</div>
                    <div class={'artist'}>{artist}</div>
                    <div class={'album'}>{album}</div>
                </div>
            </div>
        );
    }
}
