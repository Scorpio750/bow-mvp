import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import styles from './Login.module.css';

Modal.setAppElement('#root');

export const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  const [modalIsOpen,setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
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
          className={styles.input}
          placeholder="Password"
          ref={register({ required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.password && <span className={styles.error}>This field is required</span>}

        <input className={styles.submit} type="submit" />
        <span className={styles.forgotEmail}>Forgot password?</span>
      </form>
    </div>
  );
}

export default Login;
