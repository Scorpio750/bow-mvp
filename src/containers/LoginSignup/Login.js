import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import styles from '../../common/Form.module.css';
import { authUser, resetResponse } from '../../store/actions/user';
import { connect } from 'react-redux'
console.log(process.env)
Modal.setAppElement('#root');

export const Login = props => {
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const isLoggedIn = Object.keys(props.user).length > 0;
  const onSubmit = async data => {
    props.login(data);
  };

  const [modalIsOpen, setIsOpen] = useState(false)
  useEffect(() => {
    reset()
    props.resetResponse()
  }, [reset, resetResponse])

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const logOutFlag = localStorage.getItem('bowLogin')

  return (
    isLoggedIn ? <Redirect to='/feed' /> :
    <div className={styles.formContainer}>
      <h1 className={styles.header}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          name="username"
          className={styles.input}
          placeholder="Username"
          ref={register({ required: 'This field is required' })}
        />
        {errors.username && <span className={styles.error}>{errors.username.message}</span>}
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
        {props.response.status >= 400 &&
          <span role="alert" className={styles.error}>
            {`${props.response.statusText}: ${props.response.data}`}
          </span>}

        <input className={styles.submit} type="submit" />
      </form>
      <div className={styles.additionalActionsContainer}>
        <span className={styles.actionPrompt}>Forgot password?</span>
        <div className={styles.promptContainer}>
          <span>Don't have an account? </span>
          <Link to="/signup">Sign up here</Link>
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
  login: credentials => dispatch(authUser(credentials)),
  resetResponse: () => dispatch(resetResponse()),
})

export default connect(mapState, mapDispatch)(Login);
