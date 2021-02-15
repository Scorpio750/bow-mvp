import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import p from 'prop-types';
import { LoremIpsum } from 'lorem-ipsum';

import { getUser } from '../../store/actions/user';

import personPlaceholder from '../../assets/person-placeholder.png';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import twitter from '../../assets/twitter.png';
import styles from './ArtistProfile.module.css';

import Feed from '../Feed/Feed';

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

export const ArtistProfile = props => {
  useEffect(() => {
    props.getUser(props.artist.id);
  });

  return (
    <div className={styles.artistProfileContainer}>
      <section className={styles.artistPicMedia}>
        <img
          className={styles.artistPic}
          src={props.artist.img || personPlaceholder}
          alt='pretend there is an incredibly flattering portrait here'
        />
        {props.artist.media.instagram &&
          <div className={styles.mediaContainer}>
            <img className={styles.mediaThumbnail} src={instagram} />
            <p>{props.artist.media.instagram}</p>
          </div>
        }
        {props.artist.media.facebook &&
          <div className={styles.mediaContainer}>
            <img className={styles.mediaThumbnail} src={facebook} />
            <p>{props.artist.media.facebook}</p>
          </div>
        }
        {props.artist.media.twitter &&
          <div className={styles.mediaContainer}>
            <img className={styles.mediaThumbnail} src={twitter} />
            <p>{props.artist.media.twitter}</p>
          </div>
        }
        {props.artist.media.website &&
          <div className={styles.mediaContainer}>
            <p >website:</p>
            <p>{props.artist.media.website}</p>
          </div>
        }
      </section>
      <section className={styles.artistBio}>
        <p>{lorem.generateParagraphs(4)}</p>
      </section>
      <section className={styles.artistWorks}>
        <Feed dummyNumber={20} />
      </section>
    </div>
  )
};

ArtistProfile.defaultProps = {
  artist: {
    id: 0,
    media: {
      instagram: '@ello',
      facebook: '@ello',
      twitter: '@ello',
      website: 'ellodeary.com',
    }
  },
}

ArtistProfile.propTypes = {
  artist: p.object,
  getUser: p.func,
}

const mapStateToProps = state => ({
  artist: state.artist,
});

const mapDispatchToProps = {
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfile);
