import validator from 'validator';
import isEmpty from './isEmpty';

const validateLogin = (data) => {
  const errors = {};
  /* eslint-disable no-param-reassign */
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  /* eslint-enable no-param-reassign */

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have 6 and 30 chars';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateLogin;
