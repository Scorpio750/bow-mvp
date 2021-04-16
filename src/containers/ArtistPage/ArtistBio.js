import React from 'react'

import styles from './ArtistBio.module.css'

export const ArtistBio = ({ user }) => (
  <article className={styles.artistBio}>
    <p>{user.microBio}</p>
  </article>
)

export default ArtistBio
