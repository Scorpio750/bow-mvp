import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import p from 'prop-types';
import { useForm } from 'react-hook-form';

import {
  fetchPost,
  reverseAlpha,
  newestYear,
  oldestYear,
  titleSort,
  sortByArtist,
  reverseArtist,
  setPosts,
} from '../../store/actions/posts';

import Post from '../Post/Post';

import styles from './Feed.module.css';
import { alphaSort, artistSort, newestYearSort, oldestYearSort, reverseAlphaSort, reverseArtistSort } from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

const Feed = props => {
  const feedPosts = useSelector(state => state.feedPosts);
  const [searchResults, setSearchResults] = useState([]);

  const { register, handleSubmit } = useForm();

  // Fetches all posts, once
  // Runs getAllPosts to add an array of 'searchableData' to each post
  // Runs setsPosts to update redux state
  useEffect(() => {
    props.getAllPosts();
  }, []);

  const handleSort = e => {
    let sortType = e.target.value
    switch (sortType) {
      case "artist-alpha":
        { searchResults.length > 0 && searchResults.sort(artistSort) }
        props.artistSort();
        break;
      case "artist-revese":
        { searchResults.length > 0 && searchResults.sort(reverseArtistSort) }
        props.reverseArtist();
        break;
      case "title-alpha":
        { searchResults.length > 0 && searchResults.sort(alphaSort) }
        props.titleSort();
        break;
      case "title-reverse":
        { searchResults.length > 0 && searchResults.sort(reverseAlphaSort) }
        props.reverseTitleSort()
        break;
      case "newest":
        { searchResults.length > 0 && searchResults.sort(newestYearSort) }
        props.newestYear()
        break;
      case "oldest":
        { searchResults.length > 0 && searchResults.sort(oldestYearSort) }
        props.oldestYear()
        break;
      default:
        return props.feedPosts
    }
  }

  let results = [];
  const handleSearch = data => {
    const query = data.searchString;
    const lowercaseQuery = query.replace(' ', '').toLowerCase();

    if (feedPosts) {
      results = feedPosts.filter(post => post.searchableData &&
        post.searchableData.some(postData => {
          return (
            postData.replace(' ', '').toLowerCase().includes(lowercaseQuery) ||
            lowercaseQuery.includes(postData.replace(' ', '').toLowerCase())
          );
        })
      );
    }
    setSearchResults(results);
  }

  const clearSearchResults = () => {
    setSearchResults([]);
    document.getElementById('searchInput').value = '';
  }


  return (
    <>
      <div className={styles.navOverlayContainer}>
        <div className={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px' }} />

          <form onSubmit={handleSubmit(handleSearch)}>
            <input
              id="searchInput"
              name="searchString"
              autocomplete="off"
              className={styles.searchInput}
              placeholder="Search"
              ref={register}
            />
            <input type="submit" value="SUBMIT" style={{ visibility: 'hidden' }} />
          </form>

          <div onClick={() => clearSearchResults()} style={{ visibility: searchResults.length > 0 ? 'visible' : 'hidden' }}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>

        <div className={styles.selectContainer}>
          <label for="sort">Sort by:</label>

          <select name="sort" id="sort" onChange={(e) => handleSort(e)} className={styles.selector}>
            <option>Select</option>
            <option value="artist-alpha">Artist: A-Z</option>
            <option value="artist-revese">Artist: Z-A</option>
            <option value="title-alpha">Title: A-Z</option>
            <option value="title-reverse">Title: Z-A</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className={styles.feedContainer}>
        <div className={styles.feedColumn1}>
          <ul className={styles.postsList}>
            {searchResults && searchResults.length > 0
              ? searchResults.map(searchResult => <Post artwork={searchResult} title={searchResult.title} />)
              : (feedPosts.map(feedPost => <Post artwork={feedPost} title={feedPost.title} />))
            }
          </ul>
        </div>
      </div>
    </>
  );
};

Feed.propTypes = {
  getAllPosts: p.func,
  // posts: p.array,
  // dummyNumber: p.number,
};

const mapDispatchToProps = (dispatch) => ({
  getAllPosts: () => dispatch(fetchPost()),
  // updateFeed: () => dispatch(setPosts()),
  artistSort: () => dispatch(sortByArtist()),
  reverseArtist: () => dispatch(reverseArtist()),
  titleSort: () => dispatch(titleSort()),
  reverseTitleSort: () => dispatch(reverseAlpha()),
  newestYear: () => dispatch(newestYear()),
  oldestYear: () => dispatch(oldestYear()),
});

export default connect(null, mapDispatchToProps)(Feed);