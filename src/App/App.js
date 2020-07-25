import React, { useState, useEffect } from 'react';
import Gallery from '../Gallery/Gallery';
import PaintingInfo from '../PaintingInfo/PaintingInfo';
import PainterInfo from '../PainterInfo/PainterInfo';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import usePaintings from '../Hooks/usePaintings';
import { getFavorites } from '../apiCalls'
// import PropTypes from 'prop-types';

function App() {

// state declarations and default value
  const [selected, setSelected] = useState({})
  const [favorites, setFavorites] = useState([])
  const [error, setError] = useState('')
  const paintings = usePaintings('http://www.wikiart.org/en/App/Painting/MostViewedPaintings');
  

  const getUserFavorites = async () => {
        const userFavs = await getFavorites()
        setFavorites({userFavs})
  }

  useEffect(() => {
    try {
      getUserFavorites()
      console.log(favorites);
    } catch (error) {
      setError(error)
    }
  }, [])
  
// render
 const mainPage = (
    <main>
      <section className="header">
        <h1 className="page-title">ArtisTry</h1>
        <button className="my-gallery-btn">
          My Gallery
        </button>
      </section>
      <section className="gallery">
        <img src='../assets/offwhite wallpaper.jpg' alt="background-img" className="background-img" />
        <Gallery paintings={paintings} setSelected={setSelected} />
      </section>
    </main>
 )
  return (
    <Switch>
      <Route path="/artists-gallery" render={(routeProps) => {
        const { params } = routeProps.match;
        const { id } = params;
        return <PainterInfo 
          info={selected} 
          painterId={id} {...routeProps} 
          artistName= {selected.artistName}
          favorites={favorites}
          />
      }} />

      <Route exact path='/:paintingTitle'   render={(routeProps) => {
        const { params } = routeProps.match;
        const { id } = params;
        return <PaintingInfo 
                  paintingInfo={selected} 
                  setSelected={setSelected} 
                  paintingId={id} {...routeProps}
                  favorites={favorites}
                  />
        
      }} />


      <Route exact path='/' render={() => mainPage} />
    </Switch> 
  )



}

export default withRouter(App);
