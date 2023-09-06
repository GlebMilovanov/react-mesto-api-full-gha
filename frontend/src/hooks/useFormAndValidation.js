import { useState, useEffect, useCallback } from 'react';

export const useFormAndValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  /* set input and error changes */
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
  };

  /* reset form */
  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
}, []);

  /* check for changes in input and error */
  useEffect(() => {
    const isErrorsEmpty = Object.values(errors).every((error) => error === '');
    const isValuesNotEmpty = Object.keys(values).length > 0;

    setIsValid(isErrorsEmpty && isValuesNotEmpty);
  }, [errors, values]);

  return { values, handleChange, resetForm, errors, isValid };
};
