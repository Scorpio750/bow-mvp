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

  const renderPost = () => (
    <div className={styles.postContainer}>
      <img
        className={styles.artwork}
        src={props.image || placeholder}
        alt='pretend there is some art here'
        onClick={() => handleClick(openModal)}
      />
      <h3 className={styles.title}>{props.title || 'hello i am sascha and this website is my art piece'}</h3>
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
        {renderPost()}
        <Link className={styles.artistLink} to="/artist-profile">View Profile</Link>
        <Link to="/artwork">View More Info</Link>
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