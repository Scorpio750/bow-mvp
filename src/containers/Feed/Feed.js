import React, { useEffect } from 'react';
import { PropTypes as p } from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchPost,
  reverseAlpha,
  newestYear,
  oldestYear,
  titleSort,
  sortByArtist,
  reverseArtist,
} from '../../store/actions/posts';

import Post from '../Post/Post';

import styles from './Feed.module.css';

class Feed extends React.Component {
  constructor() {
    super()
    this.handleSort = this.handleSort.bind(this)

  }
  componentDidMount(){
    this.props.getAllPosts();
  }

  handleSort(e){
    let sortType = e.target.value
    switch(sortType){
      case "artist-alpha":
        this.props.artistSort();
        break;
      case "artist-revese":
        this.props.reverseArtist();
        break;
      case "title-alpha":
        this.props.titleSort();
        break;
      case "title-reverse":
        this.props.sortZToA()
        break;
      case "newest":
        this.props.newestYear()
        break;
      case "oldest":
        this.props.oldestYear()
        break;
      default:
        return this.props.feedPosts
    }
  }

  render() {
    if (!this.props.posts.length) {
      const renderPostPreviews = (posts, colIndex, number = 200) => {
        posts = Array(this.props.dummyNumber || number).fill({
          title: 'KinkOut Presents Bodies of Workers',
        });
        const moddedPosts = posts.reduce((modList, post, index) => {
          if (index % 3 === colIndex) modList.push(post);
          return modList;
        }, []);
        const renderedPosts = moddedPosts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            image={post.image}
            id={post.id}
          />
        ));
        return renderedPosts;
      };

      return (
        <div className={styles.feedContainer}>
          {renderPostPreviews(this.props.posts)}
        </div>
      );
    }
    return (
      <div className={styles.feedContainer}>
        <div className={styles.select}>
          <label for="sort">Sort by:</label>

          <select name="sort" id="sort" onChange={(e) => this.handleSort(e)}>
            <option value="artist-alpha">Artist: A-Z</option>
            <option value="artist-revese">Artist: Z-A</option>
            <option value="title-alpha">Title: A-Z</option>
            <option value="title-reverse">Title: Z-A</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div className={styles.feedColumn1}>
          <ul className={styles.postsList}>
            {this.props.posts.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                image={post.image}
                artwork={post}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  getAllPosts: p.func,
  posts: p.array,
  dummyNumber: p.number,
};

const mapStateToProps = (state) => ({
  posts: state.feedPosts,
});

const mapDispatchToProps = (dispatch) => ({
  getAllPosts: () => dispatch(fetchPost()),
  sortZToA: () => dispatch(reverseAlpha()),
  newestYear: () => dispatch(newestYear()),
  oldestYear: () => dispatch(oldestYear()),
  titleSort: () => dispatch(titleSort()),
  artistSort: () => dispatch(sortByArtist()),
  reverseArtist: () => dispatch(reverseArtist()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
