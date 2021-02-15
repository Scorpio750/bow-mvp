import React from 'react';
import { PropTypes as p } from 'prop-types';

import placeholder from '../../assets/image_placeholder.png';
import styles from './Post.module.css';

export const Post = props => {
  return (
    <div className={styles.postContainer}>
      <img
        className={styles.artwork}
        src={props.image && placeholder}
        alt='pretend there is some art here'
      />
      <h1>{props.title && 'GENERIC TITLE LOL'}</h1>
    </div>
  )
}

Post.propTypes = {
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
}

export default Post;