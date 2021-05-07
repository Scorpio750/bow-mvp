import React, { useEffect } from 'react';
import p from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import placeholder from '../../assets/sexy_placeholder.jpg';
import styles from './Post.module.css';

import { ArtistProfile } from '../ArtistPage/ArtistPage';
import {
  fetchSinglePost,
  removeSinglePost,
} from '../../store/actions/singlePost';
import { connect } from 'react-redux';
Modal.setAppElement('#root');

export const Artwork = (props) => {
  useEffect(() => {
    const { postId } = get(props, 'match.params');
    const artistId = get(props, 'location.state.user.id');
    props.getPost(postId, artistId);

    return props.removePost(postId);
  }, []);

  const getTags = () => {
    const tags = props.artwork.tags;

    return tags.map((tag) => tag + ' ');
  };
  const getDummyTags = () => {
    const dummyTags = Array(3).fill('tags');

    return dummyTags.map((tag) => tag + ' ');
  };

  const { singlePost } = props;
  const renderPostType = () => {
    if (singlePost.fileType === 'Video' && singlePost.path) {
      return (
        <video
          className={styles.artwork}
          src={singlePost.path || placeholder}
          title={singlePost.title}
          controls
        ></video>
      );
    } else if (singlePost.fileType === 'Document' && singlePost.path) {
      return (
        <embed
          className={styles.artwork}
          src={singlePost.path || placeholder}
          type="application/pdf"
          title={singlePost.title}
        />
      );
    } else {
      return (
        <img
          className={styles.artwork}
          src={singlePost.path || placeholder}
          alt={singlePost.title}
        />
      );
    }
  };

  if (!singlePost.id) return <div>Loading</div>;

  return (
    <div className={styles.artistProfileContainer}>
      <ArtistProfile {...props} />
      <section className={styles.mediaContainer}>
        {renderPostType()}
        <Link
          className={styles.artworkCloseBtn}
          to={{
            pathname: `/artist-page/${get(props, 'singlePost.user.id')}`,
            state: { user: get(props, 'singlePost.user') },
          }}
        >
          x
        </Link>
        <section className={styles.artworkDescription}>
          <h3 className={styles.mediaTitle}>
            {singlePost.title || 'Body of Workers'}
          </h3>
          <h4>
            {singlePost.medium || 'Digital'}, {singlePost.date || 'Feb 18 2021'}
          </h4>
          <p>{singlePost.caption || 'CAPTION - N/A'}</p>
          <p>{singlePost.credits || 'CREDITS - N/A'}</p>
          <p>
            {singlePost.distributor || 'No current distributor'}
            {singlePost.language}
          </p>
          {/* <p> {!singlePost.tags  ? getTags() : getDummyTags()} </p> */}
        </section>
      </section>
    </div>
  );
};

Artwork.propTypes = {
  match: p.object,
  location: p.object,
  tags: p.array,
};

Artwork.defaultProps = {
  match: { params: { postId: 0 } },
  location: { state: { user: { id: 0 } } },
  tags: [],
};

const mapState = (state) => ({
  singlePost: state.singlePost,
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  getPost: (id) => dispatch(fetchSinglePost(id)),
  removePost: (id) => dispatch(removeSinglePost(id)),
});

export default connect(mapState, mapDispatch)(Artwork);
