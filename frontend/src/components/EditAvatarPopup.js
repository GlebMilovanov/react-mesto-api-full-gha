import { PopupWithForm } from './PopupWithForm';
import { FormInput } from './FormInput';
import { useEffect } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { Loader } from './Loader';

export const EditAvatarPopup = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) => {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormAndValidation();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar,
    });
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? <Loader /> : 'Сохранить'}
      isValid={isValid}
    >
      <FormInput
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required="required"
        value={values.avatar || ''}
        onChange={handleChange}
        error={errors.avatar}
      />
    </PopupWithForm>
  );
};
