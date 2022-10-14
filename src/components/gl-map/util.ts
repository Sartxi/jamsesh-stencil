export const decorateMarker = ({ iconSize, iconPath }) => {
    const el = document.createElement('div');
    const width = iconSize[0];
    const height = iconSize[1];

    el.className = 'marker';
    el.style.backgroundImage = `url(${iconPath})`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = '100%';

    return el;
}