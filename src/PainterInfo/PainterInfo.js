import React from 'react'
import { Link } from 'react-router-dom'
import usePaintings from '../Hooks/usePaintings';
import Gallery from '../Gallery/Gallery';
import '../PaintingInfo/PaintingInfo.css'
import backBtn from '../assets/back-btn.png'
import tagBtn from '../assets/tagIcon.png'

function PainterInfo(props) {
  let url;
  const {artistName} = props.info;

  if(artistName !== undefined){
    url = artistName.replace(/\s+/g, '-').toLowerCase()
  }

  const artistPaintings = usePaintings(`http://www.wikiart.org/en/App/Painting/PaintingsByArtist?artistUrl=${url}&json=2`);

  console.log(artistPaintings)

  return (
    <section className="painter-page">
      <section className="painter-nav">
        <Link to={"/"} style={{ textDecoration: 'none' }}>
          <img src={backBtn} alt='back-btn' className='back-btn' />
        </Link>
        <h1 className="artist-name">{artistName}</h1>
      </section>
      <Gallery paintings={artistPaintings}  />  
    </section>
  )
}

export default PainterInfo;