import React, { useEffect } from 'react';
import { PropTypes as p } from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { getAllPosts } from '../../store/actions/posts';

import Post from '../Post/Post';

import styles from './Feed.module.css';


Modal.setAppElement('#root');



export const renderPostPreviews = (openModal, posts, colIndex) => {
  posts = Array(200).fill({ title: 'hello i am a sexy art' });
  const moddedPosts = posts.reduce((modList, post, index) => {
    if (index % 3 === colIndex) modList.push(post);
    return modList;
  }, []);
  const renderedPosts = moddedPosts.map(
    post =>
      <Post
        title={post.title}
        image={post.image}
        onClick={() => {
          alert('bruh');
          openModal();
        }}
      />
  );
  return renderedPosts;
};

export const Feed = props => {
  const [modalIsOpen,setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    console.log({ props });
    props.getAllPosts();
  });

  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedColumn1}>
        <ul className={styles.postsList}>
          {renderPostPreviews(openModal, props.posts, 0)}
        </ul>
      </div>
      <div className={styles.feedColumn2}>
        <ul className={styles.postsList}>
          {renderPostPreviews(openModal, props.posts, 1)}
        </ul>
      </div>
      <div className={styles.feedColumn3}>
        <ul className={styles.postsList}>
          {renderPostPreviews(openModal, props.posts, 2)}
        </ul>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="test"
      >
        <h1>hi</h1>
      </Modal>
    </div>

  )
}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  getAllPosts
};

Feed.propTypes = {
  getAllPosts: p.func,
  posts: p.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
