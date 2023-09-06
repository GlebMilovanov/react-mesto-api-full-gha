import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { Loader } from './Loader';

export const Login = ({ onLogin, isLoading }) => {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values.email, values.password);
    resetForm();
  };

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form
        className="login__form"
        name="sign-in-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          name="email"
          className="login__input"
          type="email"
          required
          placeholder="Email"
          autoComplete="username"
          onChange={handleChange}
          value={values.email || ''}
        ></input>
        <span
          className={`login__error ${
            errors.email ? 'login__error_visible' : ''
          }`}
        >
          {errors.email}
        </span>
        <input
          name="password"
          className="login__input"
          type="password"
          required
          placeholder="Пароль"
          autoComplete="current-password"
          onChange={handleChange}
          value={values.password || ''}
        ></input>
        <span
          className={`login__error ${
            errors.password ? 'login__error_visible' : ''
          }`}
        >
          {errors.password}
        </span>
        <button
          className={`login__submit-btn ${
            isValid ? '' : 'login__submit-btn_disabled'
          }`}
          type="submit"
          disabled={!isValid}
        >
          {isLoading ? <Loader /> : 'Войти'}
        </button>
      </form>
    </section>
  );
};
