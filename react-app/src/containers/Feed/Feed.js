import React, { useEffect } from 'react';
import { PropTypes as p } from 'prop-types';
import { connect } from 'react-redux';

import { getAllPosts } from '../../store/actions/posts';

import styles from './Feed.module.css';

export const renderPostPreviews = (posts, colIndex) => {
  posts = ['hi', 'hi', 'hi', 'hi', 'kinky'];
  const moddedPosts = posts.reduce((modList, post, index) => {
    if (index % 3 === colIndex) modList.push(post);
    return modList;
  }, []);
  const renderedPosts = moddedPosts.map(post => <li key={Math.random()}>{post}</li>);
  return renderedPosts;
};

export const Feed = props => {
  useEffect(() => {
    console.log({ props });
    props.getAllPosts();
  });

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
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
