import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import formStyles from '../../common/Form.module.css';
import aiStyles from './ArtworkIntake.module.css';
import placeholder from '../../assets/sexy_placeholder.jpg';

import { createPost } from '../../store/actions/posts';

export const ArtworkIntake = props => {
  const [imagePreview, setImagePreview] = useState(null);
  const [showWrittenWork, setShowWrittenWork] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm();

  const fileChangedHandler = e => {
    e.preventDefault();

    let reader = new FileReader();

    reader.onloadend = () => setImagePreview(reader.result);

    e.target.files[0] && reader.readAsDataURL(e.target.files[0])
  };

  const showWrittenWorkBodyHandler = e => {
    const result = e.target.value === "yes" ? true : false;
    setShowWrittenWork(result);
  }

  const renderWrittenWorkBody = () => (
    <div class={aiStyles.writtenWorkBodyContainer}>
      <textarea
        className={`${aiStyles.writtenWorkBody} ${formStyles.textarea}`}
        name="written-work-body"
        rows="8"
        cols="90"
        placeholder="paste your work here..."
      />
    </div>
  );

  const onSubmit = async data => {
    await axios.post('/api/user/create-post', data)
  };

  return (
    <div className={formStyles.formContainer}>
      <h1 className={formStyles.header}>Artwork Intake</h1>
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className={formStyles.filepicker}>
          <label htmlFor="file">Upload your work here.</label>
          <input
            className={formStyles.upload}
            id="file"
            name="file"
            type="file"
            onChange={fileChangedHandler}
          />
          <div className={formStyles.previewContainer}>
            <img
              src={imagePreview || placeholder}
              alt="waiting for your beautiful art here <3"
            />
          </div>

          <textarea
            name="caption"
            className={formStyles.textarea}
            placeholder="caption"
            ref={register()}
          />
        </div>

        <div className={formStyles.formSectionWrapper}>
          <section className={formStyles.formSection}>
            <input
              name="title"
              className={formStyles.input}
              placeholder="title"
              ref={register({ required: true })}
            />
            {errors.title && <span className={formStyles.error}>This field is required</span>}

            <input
              name="year"
              className={formStyles.input}
              placeholder="year"
              ref={register()}
            />

            <input
              name="medium"
              className={formStyles.input}
              placeholder="medium"
              ref={register()}
            />

            <input
              name="genre"
              className={formStyles.input}
              placeholder="genre"
              ref={register()}
            />

            <input
              name="tags"
              className={formStyles.input}
              placeholder="#tag1 #tag2 #tag3 ..."
              ref={register()}
            />
          </section>
          <section className={formStyles.formSection}>
            <input
              name="languages"
              className={formStyles.input}
              placeholder="language 1, language 2 ..."
              ref={register()}
            />

            <input
              name="credits"
              className={formStyles.input}
              placeholder="credits"
              ref={register()}
            />

            <input
              name="distributor"
              className={formStyles.input}
              placeholder="distributor"
              ref={register()}
            />

            <input
              name="press"
              className={formStyles.input}
              placeholder="press"
              ref={register()}
            />
          </section>
        </div>

        <div className={formStyles.formSectionWrapper}>
          <section className={formStyles.formSection}>
            <div className={formStyles.radioContainer}>
              <h4>Is this content safe for work?</h4>
              <input
                name="sfw"
                type="radio"
                className={formStyles.radio}
                id="sfw"
                value="sfw"
                ref={register({ required: true })}
              />
              <label htmlFor="sfw">Yes</label>
              <input
                name="sfw"
                type="radio"
                className={formStyles.radio}
                id="nsfw"
                value="nsfw"
                ref={register({ required: true })}
              />
              <label htmlFor="nsfw">No</label>
            </div>
          </section>
          <section className={formStyles.formSection}>
            <div className={formStyles.radioContainer}>
              <h4>Is this a written work?</h4>
              <input
                name="written"
                type="radio"
                className={formStyles.radio}
                id="written"
                value="yes"
                ref={register({ required: true })}
                onChange={showWrittenWorkBodyHandler}
              />
              <label htmlFor="written">Yes</label>
              <input
                name="written"
                type="radio"
                className={formStyles.radio}
                id="nonwritten"
                value="no"
                defaultChecked
                ref={register({ required: true })}
                onChange={showWrittenWorkBodyHandler}
              />
              <label htmlFor="nsfw">No</label>
            </div>
          </section>
        </div>

        {showWrittenWork && renderWrittenWorkBody()}

        <input className={formStyles.submit} type="submit" />
      </form>
      <div className={formStyles.additionalActionsContainer}>
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
