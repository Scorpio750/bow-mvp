import React, { useEffect } from 'react';
import { PropTypes as p } from 'prop-types';
import { connect } from 'react-redux';

import { getAllPosts } from '../../store/actions/posts';

import styles from './Feed.module.css';

export const renderPostPreviews = posts => {
  posts = ['hi', 'hi', 'hi', 'hi', 'kinky'];
  return (posts.map(post => {
    <li>hello</li>
  }));
};

export const Feed = props => {
  useEffect(() => {
    console.log(props);
    props.getAllPosts();
  });

  return (
    <div className={styles.feedContainer}>
      <ul className={styles.postsList}>
        {renderPostPreviews(props.posts)}
      </ul>
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
