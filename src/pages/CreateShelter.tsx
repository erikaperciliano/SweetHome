import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';


import { FiPlus } from 'react-icons/fi';

import Sidebar from '../components/Sidebar';
import mapIcon from "../utils/mapIcon";

import '../styles/pages/create-shelter.css';


export default function CreateOrphanage() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function hangleMapClick(e: LeafletMouseEvent){
    const {lat, lng} = e.latlng;

    //console.log(e.latlng);
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files){
      return;
    }

    const selectedImages = Array.from(e.target.files)

    setImages(selectedImages);

    //percorre todas as imgs
    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);

    //console.log(e.target.files);
  }

  function handleSubmit(e: FormEvent){
    e.preventDefault();

    const {latitude, longitude} = position;

    console.log({
      position,
      name,
      about,
      latitude, 
      longitude,
      instructions,
      opening_hours,
      open_on_weekends
    })
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Data</legend>

            <Map 
              center={[-22.9120894,-43.3584274]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={hangleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && 
                (<Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[position.latitude,
                  position.longitude]}/>
                )
              }
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Name</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">About <span>Maximum 300 characters</span></label>
              <textarea id="name"  value={about} onChange={e => setAbout(e.target.value)} maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Photos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return(
                    <img key={image} src={image} alt={name}/>
                  )
                  })
                }

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#FFC107" />
                </label>
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]" style={{display:'none'}}/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitation</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instructions</label>
              <textarea id="instructions"  value={instructions} onChange={e => setInstructions(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Opening hours</label>
              <input id="opening_hours"  value={opening_hours} onChange={e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Open weekend</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className= {open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenWeekends(true)}
                > 
                  Yes
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenWeekends(false)}
                >
                  No
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirm
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
