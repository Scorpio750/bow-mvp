import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import p from 'prop-types'

import { getUser } from '../../store/actions/user'

import personPlaceholder from '../../assets/person-placeholder.png'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import LocationIcon from '@material-ui/icons/LocationOn'
import facebook from '../../assets/facebook.png'
import twitter from '../../assets/twitter.png'
import styles from './ArtistPage.module.css'

import ArtistGallery from './ArtistGallery'
import ArtistBio from './ArtistBio'


import { parseSocialMediaLinks } from '../../utils'

export const ArtistPage = props => {
  const { location: { state: { user } } } = props
  return (
    <div className={styles.artistProfileContainer}>
      <ArtistProfile {...props} />
      <section className={styles.rightSection}>
        <ArtistBio user={user} />
        <ArtistGallery user={user} />
      </section>
    </div>
  )
}

export const ArtistProfile = props => {
  const { location: { state: { user } } } = props

  return (
    <div className={styles.artistProfile}>
      <h1 className={styles.artistName}>{user.publicName}</h1>
      <section className={styles.artistPicMedia}>
        <img
          className={styles.artistPic}
          src={personPlaceholder}
          alt='an incredibly flattering portrait'
        />
        <section className={styles.mediaLinksSection}>
          {user.instagram &&
            <div className={styles.mediaContainer}>
              <InstagramIcon className={styles.mediaThumbnail} />
              <a href={user.instagram}>{parseSocialMediaLinks(user.instagram)}</a>
            </div>
          }
          {user.twitter &&
            <div className={styles.mediaContainer}>
              <TwitterIcon className={styles.mediaThumbnail} />
              <a href={user.twitter}>{parseSocialMediaLinks(user.twitter)}</a>
            </div>
          }
          {user.city &&
            <div className={styles.mediaContainer}>
              <LocationIcon className={styles.mediaThumbnail} />
              <span className={styles.artistLocation}>
                {user.city}
                {user.country && `, ${user.country}`}
              </span>
            </div>
          }
        </section>
      </section>
    </div>
  )
}


ArtistPage.defaultProps = {
  location: {
    state: {
      artwork: {
        user: {
          id: 0,
        },
      },
    },
  },
}

ArtistPage.propTypes = {
  location: p.object,
  getUser: p.func,
}

ArtistPage.defaultProps = {
  location: {
    state: {
      artwork: {
        user: {
          id: 0,
        },
      },
    },
  },
}


const mapStateToProps = state => ({
  artist: state.artist,
})

const mapDispatchToProps = {
  getUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage)
