import React from 'react';

export const FormInput = ({ onChange, error, ...rest }) => {
  const handleInputChange = (e) => {
    onChange(e);
  };

  return (
    <>
      <input
        onChange={handleInputChange}
        className={`popup__input popup__input_type_${rest.name}`}
        {...rest}
      />
      <span
        className={`popup__error ${rest.name}-error ${
          error ? 'popup__error_visible' : ''
        }`}
      >
        {error}
      </span>
    </>
  );
};
