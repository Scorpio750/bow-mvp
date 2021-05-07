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
import Search from '../Search/Search';

import styles from './Feed.module.css';
import { alphaSort, artistSort, newestYearSort, oldestYearSort, reverseAlphaSort, reverseArtistSort } from '../../helpers';
import Sort from '../Sort/Sort';
import { result } from 'lodash';
import NoResult from '../Search/NoResults';

const Feed = props => {
  const feedPosts = useSelector(state => state.feedPosts);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false)

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
        searchResults.length > 0 && searchResults.sort(artistSort)
        props.artistSort();
        break;
      case "artist-revese":
        searchResults.length > 0 && searchResults.sort(reverseArtistSort)
        props.reverseArtist();
        break;
      case "title-alpha":
        searchResults.length > 0 && searchResults.sort(alphaSort)
        props.titleSort();
        break;
      case "title-reverse":
        searchResults.length > 0 && searchResults.sort(reverseAlphaSort)
        props.reverseTitleSort()
        break;
      case "newest":
        searchResults.length > 0 && searchResults.sort(newestYearSort)
        props.newestYear()
        break;
      case "oldest":
        searchResults.length > 0 && searchResults.sort(oldestYearSort)
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
    if(results.length) setSearchResults(results);
    else setError(true)
  }

  const clearSearchResults = () => {
    setError(false)
    setSearchResults([]);
    document.getElementById('searchInput').value = '';
  }


  return (
    <>
      <div className={styles.navOverlayContainer}>
        <Search handleSearch={handleSearch} handleSubmit={handleSubmit} register={register} clearSearchResults={clearSearchResults} searchResults={searchResults}
        error={error}/>

       <Sort handleSort={handleSort}/>
      </div>
      {
        error ? (
          <NoResult/>
        ) : (
          <div className={styles.feedContainer}>
        <div className={styles.feedColumn1}>
          <div className={styles.postsList}>
            {searchResults && searchResults.length > 0
              ? searchResults.map(searchResult => <Post artwork={searchResult} title={searchResult.title} />)
              : (feedPosts.map(feedPost => <Post artwork={feedPost} title={feedPost.title} />))
            }
          </div>
        </div>
      </div>

        )
      }

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
