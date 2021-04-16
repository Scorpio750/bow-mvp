import React, { useEffect } from 'react'
import p from 'prop-types'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { get } from 'lodash'

import placeholder from '../../assets/sexy_placeholder.jpg'
import styles from './Post.module.css'

import { ArtistProfile } from '../ArtistPage/ArtistPage'
import { fetchSinglePost } from '../../store/actions/singlePost'
import { connect } from 'react-redux'
Modal.setAppElement('#root')

export const Artwork = props => {
  useEffect(() => {
    const { postId } = get(props, 'match.params');
    const artistId = get(props, 'location.state.user.id')
    props.getPost(postId, artistId)
  }, [])

  const getTags = () => {
    const tags = props.artwork.tags

    return tags.map(tag => tag+' ')
  }
  const getDummyTags = () => {
    const dummyTags = Array(3).fill('tags')

    return dummyTags.map(tag => tag+' ' )
  }

  const { singlePost } = props

  if(!singlePost.id) return <div>Loading</div>

  return (
    <div className={styles.artistProfileContainer}>
      <ArtistProfile {...props} />
      <section className={styles.mediaContainer}>
        <img
          className={styles.artwork}
          style={{ cursor: 'default' }}
          src={`https://bodyofworkers.nyc3.digitaloceanspaces.com/${singlePost.fileName}` || placeholder}
          alt='single artwork view'
        />
        <Link className={styles.artworkCloseBtn} to={{
          pathname: `/artist-page/${get(props ,'singlePost.user.id')}`,
          state: { user: get(props, 'singlePost.user') },
          }}>x</Link>
        <section className={styles.artworkDescription}>
          <h3 className={styles.mediaTitle}>{singlePost.title || 'Body of Workers'}</h3>
          <h4>{singlePost.medium || 'Digital'}, {singlePost.date || 'Feb 18 2021'}</h4>
          <p>
            {singlePost.caption || 'CAPTION - N/A'}
          </p>
          <p>
            {singlePost.credits || 'CREDITS - N/A'}
          </p>
          <p>
            {singlePost.distributor || 'No current distributor'}
            {singlePost.language}
          </p>
          {/* <p> {!singlePost.tags  ? getTags() : getDummyTags()} </p> */}
        </section>
      </section>
    </div>
  )
}

Artwork.propTypes = {
  match: p.object,
  location: p.object,
  tags: p.array,
}

Artwork.defaultProps = {
  match: { params: { postId: 0 } },
  location: { state: { user: { id: 0 } } },
  tags: [],
}

const mapState = state => ({
  singlePost: state.singlePost
})

const mapDispatch = dispatch => ({
  getPost: (postId, artistId) => dispatch(fetchSinglePost(postId, artistId))
})


export default connect(mapState, mapDispatch)(Artwork)
