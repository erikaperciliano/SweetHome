import React, { useEffect, useState} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import * as ReactBootStrap from 'react-bootstrap';


import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import '../styles/pages/shelter.css';
import api from "../services/api";


interface Resthome {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<
    {
      id: number;
      url: string;
    }
  >;
}

interface ResthomeParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<ResthomeParams>();
  const [resthome, setResthome] = useState<Resthome>();
  const [activeImageIndex, setActiveImageIndex] = useState(0); // a 1 img ficará ativa

  
  //console.log(resthomes);
  
  useEffect(() => {
      api.get(`resthomes/${params.id}`).then(response => {
          //console.log(response.data);
          setResthome(response.data);
      });
  }, [params.id]);


  if(!resthome) {
    //return <p>Carregando...</p>
    return(
        <div id="loading_resthome">
          <ReactBootStrap.Spinner animation="border"/>
          <p className="loading">Carregando...</p>
        </div>
      ) 

  }

  return (
    <div id="page-orphanage">
       <Sidebar/>

      <main>
        <div className="orphanage-details">
          <img src={resthome.images[activeImageIndex].url} alt={resthome.name} />

          <div className="images">
            {resthome.images.map((image, index) => {
              return (
                <button 
                  key={image.id}
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={resthome.name} />
                </button>
              );
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{resthome.name}</h1>
            <p>{resthome.about}</p>

            <div className="map-container">
              <Map 
                center={[resthome.latitude,resthome.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[resthome.latitude,resthome.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&origin=34.1030032,-118.41046840000001&destination=${resthome.latitude},${resthome.longitude}`}>View directions on Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Visiting instructions</h2>
            <p>{resthome.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Monday to Friday <br />
                {resthome.opening_hours}
              </div>
              {resthome.open_on_weekends ? 
                (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                      We serve <br/>
                      on the weekend
                  </div>
                ):
                (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                      We do not attend <br/>
                      on the weekend
                  </div>
                )
              }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Get in touch
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}