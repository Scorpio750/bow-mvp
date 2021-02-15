import React, { useEffect } from 'react';
import { PropTypes as p } from 'prop-types';
import { connect } from 'react-redux';

import { getAllPosts } from '../../store/actions/posts';

import Post from '../Post/Post';

import styles from './Feed.module.css';

export const Feed = props => {
  const renderPostPreviews = (posts, colIndex, number = 200) => {
    posts = Array(props.dummyNumber || number).fill({ title: 'hello i am a sexy art' });
    const moddedPosts = posts.reduce((modList, post, index) => {
      if (index % 3 === colIndex) modList.push(post);
      return modList;
    }, []);
    const renderedPosts = moddedPosts.map(
      post =>
        <Post
          title={post.title}
          image={post.image}
        />
    );
    return renderedPosts;
  };

  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedColumn1}>
        <ul className={styles.postsList}>
          {renderPostPreviews(props.posts, 0)}
        </ul>
      </div>
      <div className={styles.feedColumn2}>
        <ul className={styles.postsList}>
          {renderPostPreviews(props.posts, 1)}
        </ul>
      </div>
      <div className={styles.feedColumn3}>
        <ul className={styles.postsList}>
          {renderPostPreviews(props.posts, 2)}
        </ul>
      </div>
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
  dummyNumber: p.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
