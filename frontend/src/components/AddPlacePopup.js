import { PopupWithForm } from './PopupWithForm';
import { FormInput } from './FormInput';
import { useEffect } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { Loader } from './Loader';

export const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormAndValidation();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? <Loader /> : 'Создать'}
      isValid={isValid}
    >
      <FormInput
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required="required"
        onChange={handleChange}
        value={values.name || ''}
        error={errors.name}
      />
      <FormInput
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required="required"
        onChange={handleChange}
        value={values.link || ''}
        error={errors.link}
      />
    </PopupWithForm>
  );
};
