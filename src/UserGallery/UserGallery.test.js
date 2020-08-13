import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import UserGallery from './UserGallery'
import Gallery from '../Gallery/Gallery'
import PaintingInfo from '../PaintingInfo/PaintingInfo'
import { getPaintings } from '../apiCalls'
import '@testing-library/jest-dom'

// jest.mock('../ApiCalls')

describe('UserGallery', () => {
  let userGalleryElement1 = null
  let userGalleryElement2 = null
  let galleryElement = null
  let favorites = null
  let setSelected = null
  beforeEach(() => {
    setSelected = jest.fn().mockImplementation(() => <PaintingInfo />)
    favorites = [
      {
        title: 'Mona Lisa',
        contentId: 225189,
        artistContentId: 225091,
        artistName: 'Leonardo da Vinci',
        competitionYear: 1519,
        yearAsString: '1519',
        width: 2835,
        image: 'https://uploads7.wikiart.org/images/leonardo-da-vinci/mona-lisa.jpg!Large.jpg',
        height: 4289
      }, {
        title: 'The Starry Night',
        contentId: 207190,
        artistContentId: 204915,
        artistName: 'Vincent van Gogh',
        competitionYear: 1889,
        yearAsString: '1889',
        width: 5000,
        image: 'https://uploads4.wikiart.org/00142/images/vincent-van-gogh/the-starry-night.jpg!Large.jpg',
        height: 3959
      }, {
        title: 'The Son of Man',
        contentId: 211454,
        artistContentId: 210903,
        artistName: 'Rene Magritte',
        competitionYear: 1964,
        yearAsString: '1964',
        width: 1252,
        image: 'https://uploads3.wikiart.org/images/rene-magritte/son-of-man-1964(1).jpg!Large.jpg',
        height: 1624
      }
    ]

    userGalleryElement1 = (<BrowserRouter><UserGallery favorites={[]} /></BrowserRouter>)
    userGalleryElement2 = (<BrowserRouter><UserGallery favorites={favorites} setSelected={setSelected} /></BrowserRouter>)
    galleryElement = (<BrowserRouter><Gallery paintings={favorites} setSelected={setSelected} /></BrowserRouter>)
  })
  it('renders loading message', () => {
    const { getByText } = render(userGalleryElement1)
    const loadingMessage = getByText('Add some paintings to your collection')
    expect(loadingMessage).toBeInTheDocument()
  })

  it.skip('should display paintings on load', async () => {
    getPaintings.mockResolvedValueOnce([
      {
        title: 'The Starry Night',
        contentId: 207190,
        artistContentId: 204915,
        artistName: 'Vincent van Gogh',
        competitionYear: 1889,
        yearAsString: '1889',
        width: 5000,
        image: 'https://uploads4.wikiart.org/00142/images/vincent-van-gogh/the-starry-night.jpg!Large.jpg',
        height: 3959
      }
    ])
    const { getByRole } = render(userGalleryElement2)

    // const gallery  = render(galleryElement)

    await waitFor(() => {
      const mona = getByRole('img', { name: 'Mona Lisa' })
      const starry = getByRole('img', { name: 'The Starry Night' })
      const son = getByRole('img', { name: 'The Son of Man' })
      expect(mona).toBeInTheDocument()
      expect(starry).toBeInTheDocument()
      expect(son).toBeInTheDocument()
    })
  })

  it.skip('should load the painting info page when a painting is clicked', () => {
    const { getByRole, getByText } = render(userGalleryElement2)
    const gallery = render(galleryElement)

    const mona = getByRole('img', { name: 'Mona Lisa' })
    expect(mona).toBeInTheDocument()

    fireEvent.click(mona)
    const title = getByText('Mona Lisa')
    expect(title).toBeInTheDocument()
  })
})
