import React, { useEffect } from 'react';
import { PropTypes as p } from 'prop-types';
import { connect } from 'react-redux';

import { fetchPost } from '../../store/actions/posts';

import Post from '../Post/Post';

import styles from './Feed.module.css';

class Feed extends React.Component {

  componentDidMount() {
    this.props.getAllPosts()
  }

  render() {

  if(!this.props.posts.length) {
  const renderPostPreviews = (posts, colIndex, number = 200) => {
    posts = Array(this.props.dummyNumber || number).fill({ title: 'hello i am a sexy art' });
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
      {renderPostPreviews(this.props.posts)}
    </div>
  )
  }
  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedColumn1}>
        <ul className={styles.postsList}>
          {this.props.posts.map(
            post => (
              <Post key={post.id}
                title={post.title}
                image={post.image}
                artwork={post}
              />
            )
          )}
        </ul>
      </div>
    </div>
  )

}

}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(fetchPost())
});

Feed.propTypes = {
  getAllPosts: p.func,
  posts: p.array,
  dummyNumber: p.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
