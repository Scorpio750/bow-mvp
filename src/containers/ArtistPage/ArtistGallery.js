import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import p from 'prop-types'

import GalleryPost from './GalleryPost'
import styles from './ArtistGallery.module.css'

import { fetchArtistPosts } from '../../store/actions/posts'

export const renderArtistPosts = posts => (
  posts.map(post => (
    <GalleryPost
      key={post.id}
      title={post.title}
      id={post.id}
      artwork={post}
    />
  ))
)

export const ArtistGallery = props => {
  useEffect(() => {
    props.getArtistPosts(props.user.id)
  }, [])

  return (
    <div className={styles.artistWorks}>
      {renderArtistPosts(props.posts)}
    </div>
  )
}

ArtistGallery.propTypes = {
  getAristPosts: p.func,
  posts: p.array,
  dummyNumber: p.number,
}

ArtistGallery.defaultProps = {
  getArtistPosts: () => {},
  posts: [],
  dummyNumber: 20,
}

const mapStateToProps = state => ({
  posts: state.artistPosts
})

const mapDispatchToProps = dispatch => ({
  getArtistPosts: artistId => dispatch(fetchArtistPosts(artistId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistGallery)
