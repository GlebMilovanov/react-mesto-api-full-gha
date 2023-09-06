import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';

export const Register = ({ onRegister, isLoading }) => {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values.email, values.password);
    resetForm();
  };

  return (
    <section className="register">
      <h2 className="register__title">Регистрация</h2>
      <form
        className="register__form"
        name="sign-up-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          name="email"
          className="register__input"
          type="email"
          required
          placeholder="Email"
          autoComplete="username"
          value={values.email || ''}
          onChange={handleChange}
        />
        <span
          className={`register__error ${
            errors.email ? 'register__error_visible' : ''
          }`}
        >
          {errors.email}
        </span>
        <input
          name="password"
          className="register__input"
          type="password"
          required
          placeholder="Пароль"
          autoComplete="current-password"
          value={values.password || ''}
          onChange={handleChange}
        />
        <span
          className={`register__error ${
            errors.password ? 'register__error_visible' : ''
          }`}
        >
          {errors.password}
        </span>
        <button
          className={`register__submit-btn ${
            isValid ? '' : 'register__submit-btn_disabled'
          }`}
          type="submit"
        >
          {isLoading ? <Loader /> : 'Зарегистрироваться'}
        </button>
      </form>
      <p className="register__reminder">
        Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="register__link">
          Войти
        </Link>
      </p>
    </section>
  );
};
