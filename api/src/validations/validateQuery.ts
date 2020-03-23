/*
 * Id validation rules
 */
import Validator from 'validator';
import isEmpty from './isEmpty';


export default (id: any) => {
  let error = '';
  id = !isEmpty(id) ? id : '';

  // Convert to string for validation
  id = `${id}`;

  if (Validator.isEmpty(id)) {
    error = 'Id is required!';
  } else if (!Validator.isFloat(id)) {
    error = 'Id not in valid form';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
