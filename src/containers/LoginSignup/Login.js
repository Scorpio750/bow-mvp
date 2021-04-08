import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import styles from '../../common/Form.module.css';
import { authUser } from '../../store/actions/user';
import { connect } from 'react-redux'

Modal.setAppElement('#root');

export const Login = props => {
  const { register, handleSubmit, watch, errors } = useForm();
  const isLoggedIn = Object.keys(props.user).length > 0;
  const onSubmit = async data => {
    props.login(data);
  };

  const [modalIsOpen,setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  console.log(watch("example")); // watch input value by passing the name of it

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
          ref={register({ required: true })}
        />
        {errors.username && <span className={styles.error}>This field is required</span>}

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

const mapDispatch = dispatch => ({
  login: credentials => dispatch(authUser(credentials))
})

const mapState = state => ({
  user: state.user
})

export default connect(mapState, mapDispatch)(Login);
