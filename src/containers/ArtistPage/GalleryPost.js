import React from 'react'
import p from 'prop-types'
import { Link } from 'react-router-dom';

import placeholder from '../../assets/sexy_placeholder.jpg';
import styles from './GalleryPost.module.css'

export const GalleryPost = props => {
  const { artwork } = props;
  return (
    <div className={styles.postContainer}>
      <Link
        className={styles.artworkContainer}
        style={{color: 'black'}}
        to={{
          pathname: `/artwork/${artwork.id}`,
          state: { user: artwork.user }
        }}
      >
        <img
          className={styles.artwork}
          src={artwork.path || placeholder}
          alt={artwork.title}
        />
      </Link>
      <div style={{ marginBottom: '2.5rem' }}></div>
    </div>
  )
}

GalleryPost.propTypes = {
  title: p.string,
  image: p.object,
  status: p.string,
  sequence: p.number,
  artist: p.string,
  privacy: p.number,
  canMarket: p.bool,
  sfw: p.bool,
  caption: p.string,
  price: p.number,
  year: p.number,
  medium: p.string,
  materials: p.string,
  dimensions: p.string,
  location: p.string,
  geo: p.string,
  genre: p.string,
  subset: p.string,
  language: p.string,
  credits: p.string,
  press: p.string,
  distributor: p.string,
  tags: p.array,
  onClick: p.func,
}

GalleryPost.defaultProps = {
  artwork: {
    id: 0,
  },
}

export default GalleryPost