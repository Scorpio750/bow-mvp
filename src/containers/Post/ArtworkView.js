import React from 'react';
import { PropTypes as p } from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import placeholder from '../../assets/sexy_placeholder.jpg';
import styles from './Post.module.css';

import { ArtistProfile } from '../ArtistProfile/ArtistProfile';
Modal.setAppElement('#root');

export const Artwork = props => {
  const tags = props.tags
  const dummyTags = Array(3).fill('tags')
  const getTags = () => {
    return tags.map(tag => tag+' ')
  }
  const getDummyTags = () => {
    return dummyTags.map(tag => tag+' ' )
  }
  return <div className={styles.artistProfileContainer}>
    <ArtistProfile {...props} />
    <section className={styles.mediaContainer}>
    <img
        className={styles.artwork}
        src={props.image || placeholder}
        alt='pretend there is some art here'
      />
     <h3 className={styles.mediaTitle}>{props.title || 'hello i am sascha and this website is my art piece'}, {props.medium || 'Digital'}, {props.date || 'Feb 18 2021'}</h3>
     <p>
     {props.caption || 'CAPTION - media description'}
     </p>
     <p>
     {props.credits || 'CREDITS - Me, Kiana'}
     </p>
     <p>
     {props.distributor || 'distribution.com '}
     {props.language || ' Language Here'}
     </p>

     <p>
     {tags.length > 0  ? getTags() : getDummyTags()}
     </p>
    </section>

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
  tags: []
}

export default Artwork;
