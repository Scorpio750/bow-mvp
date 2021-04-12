import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import p from 'prop-types';
import { LoremIpsum } from 'lorem-ipsum';

import { getUser } from '../../store/actions/user';

import personPlaceholder from '../../assets/person-placeholder.png';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LocationIcon from '@material-ui/icons/LocationOn';
import facebook from '../../assets/facebook.png';
import twitter from '../../assets/twitter.png';
import styles from './ArtistPage.module.css';
import Feed from '../Feed/Feed';

import { parseSocialMediaLinks } from '../../utils';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

export const ArtistGallery = () => {
  return ( <div>
    <section className={styles.artistBio}>
    <p>{lorem.generateParagraphs(4)}</p>
  </section>
  <section className={styles.artistWorks}>
    <Feed dummyNumber={20} />
  </section>
  </div>
  )
}

export const ArtistPage = props => {
  useEffect(() => {
    props.getUser(props.artist.id);
  });
    return (
      <div className={styles.artistProfileContainer}>
        <ArtistProfile {...props}/>
        <ArtistGallery />
      </div>
    )
}

export const ArtistProfile = props => {
  const { singlePost: { user } } = props;

  return (
    <div className={styles.artistProfile}>
      <h1 className={styles.artistName}>{user.publicName}</h1>
      <section className={styles.artistPicMedia}>
        <img
          className={styles.artistPic}
          src={props.artist.img || personPlaceholder}
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
};


ArtistPage.defaultProps = {
  artist: {
    id: 0,
    media: {
      instagram: '@instagram',
      facebook: '@facebook',
      twitter: '@twitter',
      website: 'bodyofworkers.com',
    }
  },
}


ArtistPage.propTypes = {
  artist: p.object,
  getUser: p.func,
}

const mapStateToProps = state => ({
  artist: state.artist,
});

const mapDispatchToProps = {
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
