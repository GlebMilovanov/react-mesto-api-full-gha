import logo from '../images/logo-header.svg';
import { useContext, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useIsMobile } from '../hooks/useIsMobile';
import { BurgerMenu } from './BurgerMenu';

export const Header = ({ paths, onHandleSignOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const { pathname } = useLocation();
  const { login, register, main } = paths;
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <header className="header">
      {isMobile && currentUser?.email && (
        <div
          className={`header__auth-container_mobile ${
            isOpen ? 'header__auth-container_mobile_open' : ''
          }`}
        >
          <p className="header__email">{currentUser.email}</p>
          <button className="header__sign-out-btn" onClick={onHandleSignOut}>
            Выйти
          </button>
        </div>
      )}
      <div className="header__container">
        <Link className="header__link" to={main}>
          <img src={logo} alt="логотип" className="header__logo" />
        </Link>
        <div className="header__auth">
          {currentUser?.email && (
            <div className="header__auth-container">
              <p className="header__email">{currentUser.email}</p>
              <button
                className="header__sign-out-btn"
                onClick={onHandleSignOut}
              >
                Выйти
              </button>
            </div>
          )}
          {isMobile && currentUser?.email &&(
            <BurgerMenu onClick={toggleBurgerMenu} isOpen={isOpen} />
          )}
          {pathname === login && (
            <Link className="header__auth-link" to={register}>
              Регистрация
            </Link>
          )}
          {pathname === register && (
            <Link className="header__auth-link" to={login}>
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
