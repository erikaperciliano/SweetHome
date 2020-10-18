
import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.png';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg, 
    iconSize:[58, 68],
    iconAnchor:[29, 68], // metade do tamanho do icon (horizonta e vertical)
    popupAnchor:[170, 2]//posição na tela que o popup será renderizado (x, y)
});

export default mapIcon;