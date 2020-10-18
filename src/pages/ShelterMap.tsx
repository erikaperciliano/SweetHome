import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


import Sidebar from "../components/Sidebar";


import '../styles/pages/shelter-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';


// informações da API que serão utilizadas nessa tela
interface Resthome {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function ShelterMap(){
    const [resthomes, setResthomes] = useState<Resthome[]>([]);

    //console.log(resthomes);
    
    useEffect(() => {
        api.get('resthomes').then(response => {
            //console.log(response.data);
            setResthomes(response.data);
        })
    }, []);


    return (
        <div id="page-map">
            <Sidebar/>

            <Map 
                center={[-22.9120894,-43.3584274]}
                zoom={15}
                style={{ width:'100%', height:'100%' }}
            >
               {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer
                   url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />  

               {resthomes.map(resthome => {
                   return(
                        <Marker
                        icon={mapIcon}
                        position={[resthome.latitude, resthome.longitude]}
                        key={resthome.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {resthome.name}
                                <Link to={`/shelters/${resthome.id}`}>
                                    <FiArrowRight size={20} color="#FFF"/>
                                </Link>
                            </Popup>
                        </Marker>
                   )
               })}
                
            </Map>

            <Link to="/shelters/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}

export default ShelterMap;