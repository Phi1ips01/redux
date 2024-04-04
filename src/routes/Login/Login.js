import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { signIn } from '../../features/login/loginSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ROUTES } from '../../Routes.constants';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const formik = useFormik({
    initialValues: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await dispatch(signIn({ email: values.email, password: values.password }));
        navigate(ROUTES.HOME); // Redirect to home page on successful login using navigate
      } catch (error) {
        setFieldError('password', 'Invalid email or password');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
        <button type="submit" disabled={formik.isSubmitting}>Login</button>
      </form>
    </section>
  );
};

export default LoginPage;
