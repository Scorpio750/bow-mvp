import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import styles from '../../common/Form.module.css';
import { signUp } from '../../store/actions/user';
import { connect } from 'react-redux';

Modal.setAppElement('#root');

export const Signup = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async data => {
   props.signUp(data)
  };

  const [modalIsOpen,setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  console.log(watch("example")); // watch input value by passing the name of it
  if( Object.keys(props.user).length > 0) return <Redirect to='/feed' />
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

          <input
            name="pronouns"
            className={styles.input}
            placeholder="Pronouns"
            ref={register({ required: true })}
          />
          {errors.pronouns && <span className={styles.error}>This field is required</span>}
        </section>
        <section className={styles.formSection}>
          <input
            name="city"
            className={styles.input}
            placeholder="City"
            ref={register()}
          />

          <input
            name="region"
            className={styles.input}
            placeholder="State/Region/Province"
            ref={register()}
          />

          <input
            name="country"
            className={styles.input}
            placeholder="Country"
            ref={register()}
          />
        </section>
      </div>

      <input className={styles.submit} type="submit" />
    </form>
    <div className={styles.additionalActionsContainer}>
      <span>Are you an artist? </span>
      <a href="https://airtable.com/shrrBn8znt6ir1kdF">Sign up with our Artist Intake form</a>
      <div className={styles.promptContainer}>
        <span>Already have an account? </span>
        <Link to="/login">Log in here</Link>
      </div>
    </div>
  </div>
  );
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  signUp: (userObj) => dispatch(signUp(userObj))
});

export default connect(mapState, mapDispatch)(Signup);
