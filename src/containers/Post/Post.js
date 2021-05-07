import React from 'react';
import { PropTypes as p } from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import placeholder from '../../assets/sexy_placeholder.jpg';
import styles from './Post.module.css';

export const handleClick = (openModal) => {
  openModal();
};

export const Post = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const renderSubtext = () => (
    <h4 className={styles.title} onClick={() => handleClick(openModal)}>
      {props.title || ''}
    </h4>
  );

  const renderModalSubtext = () => (
    <React.Fragment>
      <h2 className={styles.modalTitle}>{props.title || ''}</h2>
      <div className={styles.infoContainer}>
        <span>{props.artwork.medium}</span>
        <span className={styles.divider}> • </span>
        <Link
          style={{ color: 'black' }}
          to={{
            pathname: `/artwork/${props.artwork.id}`,
            state: {
              user: get(props, 'artwork.user')
            },
          }}
        >
          View More Info
        </Link>
        <span className={styles.divider}> • </span>
        <Link
          style={{ color: 'black' }}
          to={{
            pathname: `/artist-page/${get(props, 'artwork.user.id')}`,
            state: {
              user: get(props, 'artwork.user'),
            },
          }}
        >
          View Artist Profile
        </Link>
      </div>
    </React.Fragment>
  );

  const renderPost = (isModal) => (

    !props.artwork.length ? (<div className={styles.postContainer}>
      <div className={styles.artworkContainer}>{renderPostType()}</div>
      {isModal ? renderModalSubtext() : renderSubtext()}
      <div style={{ marginBottom: '2.5rem' }}></div>
    </div>) : ''
  );

  function renderPostType() {
    if(Array.isArray(props.artwork)) return;
    if (props.artwork.fileType === 'Video' && props.artwork.path) {
      return (

        <video
          className={styles.artwork}
          src={props.artwork.path || placeholder}
          title={props.artwork.title}
          controls
        ></video>

      );
    } else if (props.artwork.fileType === 'Document' && props.artwork.path) {
      return (

          <embed
            className={styles.artwork}
            src={props.artwork.path || placeholder}
            type="application/pdf"
            title={props.artwork.title}
          />

      );
    } else {
      return (
        <img
          className={styles.artwork}
          src={props.artwork.path || placeholder}
          alt={props.artwork.title}
          onClick={() => handleClick(openModal)}
        />
      );
    }
  }

  // TODO: this is not scalable we should put modal at root but having trouble invoking render through higher order components
  return (
    <React.Fragment>
      {renderPost()}

      <Modal
        className={styles.modal}
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closeModal}
        contentLabel="test"
      >
        {renderPost(true)}

        <span className={styles.closeBtn} onClick={closeModal}>
          X
        </span>
      </Modal>
    </React.Fragment>
  );
};

Post.defaultProps = {
  artwork: {
    user: { id: 0 },
  },
};

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
  onClick: p.func,
};

export default Post;
