import React from 'react';
import styles from './Sort.module.css';

const Sort = ({ handleSort }) => {
  return (
    <div className={styles.selectContainer}>
      <label for="sort">Sort by:</label>

      <select
        name="sort"
        id="sort"
        onChange={(e) => handleSort(e)}
        className={styles.selector}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="artist-alpha">Artist: A-Z</option>
        <option value="artist-revese">Artist: Z-A</option>
        <option value="title-alpha">Title: A-Z</option>
        <option value="title-reverse">Title: Z-A</option>
      </select>
    </div>
  );
};

export default Sort;
