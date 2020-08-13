import React, { useState, useEffect } from 'react'
import './App.css'
import {
  Switch, Route, withRouter, Link
} from 'react-router-dom'
import Gallery from '../Gallery/Gallery'
import PaintingInfo from '../PaintingInfo/PaintingInfo'
import ArtistGallery from '../ArtistGallery/ArtistGallery';
import UserGallery from '../UserGallery/UserGallery'
import RandomArt from '../RandomArt/RandomArt'
import usePaintings from '../Hooks/usePaintings'
import { getFavorites } from '../apiCalls'

function App() {
  const [selected, setSelected] = useState({})
  const [favorites, setFavorites] = useState([])
  const [error, setError] = useState('')
  const { paintings } = usePaintings('http://www.wikiart.org/en/App/Painting/MostViewedPaintings')
  const getUserFavorites = async () => {
    const userFavs = await getFavorites()
    setFavorites({ userFavs })
  }

  useEffect(() => {
    try {
      getUserFavorites()
    } catch (error) {
      setError(error)
    }
  }, [])

  const mainPage = (
    <main>
      <section className="header">
        <h1 className="page-title">ArtisTry</h1>
        <section className="nav-btn-box">
          <Link to="/random-art" style={{ textDecoration: 'none', color: 'inherit' }}>
            <button type="button" className="random-button">Explore</button>
          </Link>
          <Link to="/user-gallery" style={{ textDecoration: 'none' }}>
            <button type="button" className="my-gallery-btn" onClick={getUserFavorites}>My Gallery</button>
          </Link>
        </section>
      </section>
      <section className="gallery" aria-label="gallery">
        <Gallery paintings={paintings} setSelected={setSelected} />
      </section>
    </main>
  )

  return (
    <Switch>
      <Route
        path="/artists-gallery"
        render={(routeProps) => {
          const { params } = routeProps.match
          const { id } = params
          return (
            <ArtistGallery
              info={selected}
              painterId={id}
              artistName={selected.artistName}
              favorites={favorites}
              setSelected={setSelected}
              getUserFavorites={getUserFavorites}
            />
          )
        }}
      />
      <Route
        path="/user-gallery"
        render={() => (
          <UserGallery
            favorites={favorites}
            setSelected={setSelected}
          />
        )}
      />
      <Route
        path="/random-art"
        render={() => <RandomArt info={selected} setSelected={setSelected} getUserFavorites={getUserFavorites} />}
      />
      <Route
        exact
        path="/:paintingTitle"
        render={(routeProps) => {
          const { params } = routeProps.match
          const { id } = params
          return (
            <PaintingInfo
              {...routeProps}
              paintingInfo={selected}
              setSelected={setSelected}
              paintingId={id}
              getUserFavorites={getUserFavorites}
              favorites={favorites}
            />
          )
        }}
      />
      <Route exact path="/" render={() => mainPage} />
    </Switch>
  )
}

export default withRouter(App)
