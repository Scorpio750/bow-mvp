import React from 'react';
import { PropTypes as p } from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import placeholder from '../../assets/sexy_placeholder.jpg';
import styles from './Post.module.css';

import { ArtistProfile } from '../ArtistProfile/ArtistProfile';
import { fetchSinglePost } from '../../store/actions/singlePost';
import { connect } from 'react-redux'
Modal.setAppElement('#root');

class Artwork extends React.Component {
  constructor(props){
    super(props)
  this.getDummyTags = this.getDummyTags.bind(this)
  this.getTags = this.getTags.bind(this)
  }

  componentDidMount() {
    let id = this.props.match.params.postId
    this.props.getPost(id)
  }
  getTags() {
    const tags = this.props.artwork.tags

    return tags.map(tag => tag+' ')
  }
  getDummyTags() {
    const dummyTags = Array(3).fill('tags')

    return dummyTags.map(tag => tag+' ' )
  }

  render() {
    const { singlePost } = this.props;

    if(!singlePost.id) return <div>Loading</div>

    return (
      <div className={styles.artistProfileContainer}>
        <ArtistProfile {...this.props} />
        <section className={styles.mediaContainer}>
          <img
            className={styles.artwork}
            style={{ cursor: 'default' }}
            src={`https://bodyofworkers.nyc3.digitaloceanspaces.com/${singlePost.fileName}` || placeholder}
            alt='single artwork view'
          />
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
            {/* <p> {!singlePost.tags  ? this.getTags() : this.getDummyTags()} </p> */}
          </section>
        </section>
      </div>
    )
  }
}

Artwork.defaultProps = {
  artist: {
    id: 0,
    media: {
      instagram: '@ello',
      facebook: '@ello',
      twitter: '@ello',
      website: 'ellodeary.com',
    }
  },
  tags: []
}

const mapState = state => ({
  singlePost: state.singlePost
})

const mapDispatch = dispatch => ({
  getPost: (id) => dispatch(fetchSinglePost(id))
})


export default connect(mapState, mapDispatch)(Artwork);
