import { PopupWithForm } from './PopupWithForm';
import { FormInput } from './FormInput';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { Loader } from './Loader';

export const EditProfilePopup = ({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, resetForm, errors, isValid } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm(
        {
          name: currentUser.name,
          about: currentUser.about,
        },
        {},
        false
      );
    }
  }, [currentUser, isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? <Loader /> : 'Сохранить'}
      isValid={isValid}
    >
      <FormInput
        type="text"
        name="name"
        placeholder="Иван Иванов"
        minLength="2"
        maxLength="40"
        required="required"
        onChange={handleChange}
        value={values.name || ''}
        error={errors.name}
      />
      <FormInput
        type="text"
        name="about"
        placeholder="Бездельник"
        minLength="2"
        maxLength="200"
        required="required"
        onChange={handleChange}
        value={values.about || ''}
        error={errors.about}
      />
    </PopupWithForm>
  );
};
