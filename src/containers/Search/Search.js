import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../Feed/Feed.module.css';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'


export default function Search(props) {
  return (
    <div className={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px' }} />
          <form onSubmit={props.handleSubmit(props.handleSearch)}>
            <input
              id="searchInput"
              name="searchString"
              autocomplete="off"
              className={styles.searchInput}
              placeholder="Search"
              ref={props.register}
            />
            <input type="submit" value="SUBMIT" style={{ visibility: 'hidden' }} />
          </form>

          <div onClick={() => props.clearSearchResults()} style={{ visibility: (props.searchResults.length > 0 || props.error) ? 'visible' : 'hidden' }}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
  )

}
