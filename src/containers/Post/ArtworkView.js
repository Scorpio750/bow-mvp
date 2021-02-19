import React from 'react';
import { PropTypes as p } from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import placeholder from '../../assets/sexy_placeholder.jpg';
import styles from './Post.module.css';

import { ArtistProfile } from '../ArtistProfile/ArtistProfile';
Modal.setAppElement('#root');

export const Artwork = props => {
  return <div className={styles.artistProfileContainer}>
    <ArtistProfile {...props} />
    <div><h2>Ah...we made it...</h2></div>

  </div>
}

Artwork.defaultProps = {
  artist: {
    id: 0,
    media: {
      instagram: '@ello',
      facebook: '@ello',
      twitter: '@ello',
      website: 'ellodeary.com',
    }
  },
}

export default Artwork;
