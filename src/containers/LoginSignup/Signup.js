import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm, reset } from 'react-hook-form';
import Modal from 'react-modal';

import styles from '../../common/Form.module.css';
import { signUp, resetResponse } from '../../store/actions/user';
import { connect } from 'react-redux';

Modal.setAppElement('#root');

export const Signup = (props) => {
  const { register, handleSubmit, watch, errors, reset } = useForm();

  const onSubmit = async data => {
     props.signUp(data)
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    reset()
    props.resetResponse()
  }, [reset])

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }


  if (Object.keys(props.user).length > 0) return <Redirect to='/feed' />
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.header}>Signup</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className={styles.formSectionWrapper}>
          <section className={styles.formSection}>
            <input
              name="username"
              className={styles.input}
              placeholder="Username"
              ref={register({ required: true })}
            />
            {errors.username && <span className={styles.error}>This field is required</span>}

            <input
              name="email"
              type="email"
              className={styles.input}
              placeholder="Email"
              ref={register({ required: true })}
            />
            {errors.email && <span className={styles.error}>This field is required</span>}

            {/* include validation with required or other standard HTML validation rules */}
            <input
              name="password"
              type="password"
              className={styles.input}
              placeholder="Password"
              ref={register({ required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.password && <span className={styles.error}>This field is required</span>}
              <div>
                <label for="tos" style={{ backgroundColor: "none", margin: "0" }}>I agree to the </label>
                <Link
                  to="/legals"
                  style={{
                    fontWeight: "700",
                    color: "Maroon",
                    marginRight: "5px",
                    textDecoration: "underline",
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }}
                >
                  Terms of Service
                </Link>
                <input
                  name="tos"
                  type="checkbox"
                  ref={register({ required: true })}
              />
            </div>
            {errors.tos && <span className={styles.error}>This field is required</span>}
            {props.response.status >= 400 &&
              <span role="alert" className={styles.error}>
                {`${props.response.statusText}: ${props.response.data}`}
              </span>}
          </section>
        </div>

        <input className={styles.submit} type="submit" value="Submit" />
      </form>
      <div className={styles.additionalActionsContainer}>
        <span>Are you an artist? </span>
        <a href="https://airtable.com/shrrBn8znt6ir1kdF" target="_blank" rel="noopener noreferrer">Sign up with our Artist Intake form</a>
        <div className={styles.promptContainer}>
          <span>Already have an account? </span>
          <Link to="/login">Log in here</Link>
        </div>
      </div>
    </div>
  );
}

const mapState = state => ({
  user: state.user,
  response: state.response,
})

const mapDispatch = dispatch => ({
  signUp: (userObj) => dispatch(signUp(userObj)),
  resetResponse: () => dispatch(resetResponse()),
});

export default connect(mapState, mapDispatch)(Signup);
