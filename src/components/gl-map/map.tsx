import mapboxgl from 'mapbox-gl';
import { JamSeshUser } from '../../global/interface';
import { Component, Element, h, Host, Prop, Event, EventEmitter } from '@stencil/core';
import { decorateMarker } from './util';

@Component({
    tag: 'map-gl',
    styleUrl: 'glmap.css'
})
export class MapComponent {
    public map: mapboxgl.Map;
    @Prop() users: Array<JamSeshUser>;
    @Prop() apiKey: string;

    @Element() mapEl: HTMLElement;
    @Event() userTapped: EventEmitter<number>;

    render() {
        return <Host />;
    }

    componentDidLoad() {
        const firstMarker = this.users[0];
        mapboxgl.accessToken = this.apiKey;
        this.map = new mapboxgl.Map({
            container: this.mapEl,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [firstMarker.lat, firstMarker.lng],
            zoom: 13
        });
        this.map.addControl(new mapboxgl.NavigationControl());
        for (const user of this.users) {
            const { id, lat, lng, avatar } = user;

            const marker = decorateMarker({
                iconPath: avatar,
                iconSize: [60, 60]
            });
            marker.addEventListener('click', () => this.userTapped.emit(id));

            new mapboxgl.Marker(marker)
                .setLngLat([lat, lng])
                .addTo(this.map);
        }
    }
}