import React from 'react';
import { PropTypes as p } from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import placeholder from '../../assets/sexy_placeholder.jpg';
import styles from './Post.module.css';

Modal.setAppElement('#root');

export const handleClick = openModal => {
  openModal();
}

export const Post = props => {
  const [modalIsOpen,setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const renderSubtext = () => (
    <h4 className={styles.title}>
      {props.title || 'hello i am sascha and this website is my art piece'}
    </h4>
  );

  const renderModalSubtext = () => (
    <React.Fragment>
      <h2 className={styles.modalTitle}>
        {props.title || 'hello i am sascha and this website is my art piece'}
      </h2>
      <div className={styles.infoContainer}>
        <span>{props.artwork.medium}</span>
        <span> • </span>
        <Link
          style={{color: 'black'}}
          to={{
            pathname: `/artwork/${props.artwork.id}`,
            state: props.artwork
          }}>
            View More Info
          </Link>
        </div>
      </React.Fragment>
  )

  const renderPost = isModal => (
    <div className={styles.postContainer}>
      <div className={styles.artworkContainer}>
      <img
        className={styles.artwork}
        src={props.artwork.path || placeholder}
        alt={props.artwork.title}
        onClick={() => handleClick(openModal)}
      />
      </div>
      {isModal
          ? renderModalSubtext()
          : renderSubtext()
      }
      <div style={{ marginBottom: '2.5rem' }}></div>
    </div>
  );

  //TODO: this is not scalable we should put modal at root but having trouble invoking render through higher order components
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

        <span className={styles.closeBtn} onClick={closeModal}>X</span>
      </Modal>
    </React.Fragment>
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
  onClick: p.func,
}

export default Post;
