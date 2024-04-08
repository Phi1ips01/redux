import React from 'react';
import { useDispatch, } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { signIn } from '../../features/login/loginSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ROUTES } from '../../Routes.constants';
import './login.css'
import { KEYS } from '../../dataKeys';
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await dispatch(signIn({ email: values.email, password: values.password }));
        navigate(ROUTES.HOME);
      } catch (error) {
        setFieldError('password', 'Invalid email or password');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="login-wrapper">
      <div className="login">
        <div className="login__header">
          <h2>Login</h2>
        </div>
        <div className="login__forms">
          <form onSubmit={formik.handleSubmit} className="login__form">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="login__input"
            />
            {formik.touched.email && formik.errors.email && <div className="login__error">{formik.errors.email}</div>}
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="login__input"
            />
            {formik.touched.password && formik.errors.password && <div className="login__error">{formik.errors.password}</div>}
            <button type="submit" disabled={formik.isSubmitting} className="login__button">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
