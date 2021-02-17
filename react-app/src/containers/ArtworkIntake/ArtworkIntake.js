import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import styles from '../../common/Form.module.css';

import { createPost } from '../../store/actions/posts';

export const ArtworkIntake = props => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async data => {
    await axios.post('/api/user/login', data)
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.header}>Artwork Intake</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label for="file">Upload your work here (you may select multiple at a time)</label>
        <input
          className={styles.input}
          name="file"
          type="file"
        />
        <input
          name="title"
          className={styles.input}
          placeholder="title"
          ref={register({ required: true })}
        />
        {errors.title && <span className={styles.error}>This field is required</span>}

        <input
          name="year"
          className={styles.input}
          placeholder="Year"
          ref={register({ required: true })}
        />
        {errors.year && <span className={styles.error}>This field is required</span>}

        <input
          name="medium"
          className={styles.input}
          placeholder="medium"
          ref={register({ required: true })}
        />
        {errors.medium && <span className={styles.error}>This field is required</span>}

        <input
          name="genre"
          className={styles.input}
          placeholder="genre"
          ref={register({ required: true })}
        />
        {errors.genre && <span className={styles.error}>This field is required</span>}

        <input
          name="tags"
          className={styles.input}
          placeholder="#tag1, #tag2, #tag3..."
          ref={register({ required: true })}
        />
        {errors.tags && <span className={styles.error}>This field is required</span>}

        <textarea
          name="caption"
          className={styles.textarea}
          placeholder="caption"
          ref={register({ required: true })}
        />
        {errors.caption && <span className={styles.error}>This field is required</span>}

        <input
          name="languages"
          className={styles.input}
          placeholder="languages"
          ref={register({ required: true })}
        />
        {errors.languages && <span className={styles.error}>This field is required</span>}

        <input
          name="credits"
          className={styles.input}
          placeholder="credits"
          ref={register({ required: true })}
        />
        {errors.credits && <span className={styles.error}>This field is required</span>}

        <input
          name="distributor"
          className={styles.input}
          placeholder="distributor"
          ref={register({ required: true })}
        />
        {errors.distributor && <span className={styles.error}>This field is required</span>}

        <input
          name="press"
          className={styles.input}
          placeholder="press"
          ref={register({ required: true })}
        />
        {errors.press && <span className={styles.error}>This field is required</span>}

        <div className={styles.radioContainer}>
          <h3>Is this content safe for work?</h3>
          <input
            name="sfw"
            type="radio"
            className={styles.input}
            id="sfw"
            value="sfw"
            ref={register({ required: true })}
          />
          <label for="sfw">Yes</label>
          <input
            name="sfw"
            type="radio"
            className={styles.input}
            id="nsfw"
            value="nsfw"
            ref={register({ required: true })}
          />
          <label for="nsfw">No</label>
        </div>

        <div className={styles.radioContainer}>
          <h3>Is this a written work?</h3>
          <input
            name="written"
            type="radio"
            className={styles.input}
            id="written"
            value="yes"
            ref={register({ required: true })}
          />
          <label for="written">Yes</label>
          <input
            name="written"
            type="radio"
            className={styles.input}
            id="nonwritten"
            value="no"
            ref={register({ required: true })}
          />
          <label for="nsfw">No</label>
          <textarea
            name="writtenWorkBody"
            className={styles.textarea}
            placeholder="If so, please paste into the area below"
          />
        </div>

        <input className={styles.submit} type="submit" />
      </form>
      <div className={styles.additionalActionsContainer}>
        <p>Upload another work</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkIntake);
