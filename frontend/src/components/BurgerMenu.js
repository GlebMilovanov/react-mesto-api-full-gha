export function BurgerMenu({ isOpen, onClick }) {
  return (
    <div
      className={`burger-menu ${isOpen ? 'burger-menu_open' : ''}`}
      onClick={onClick}
    ></div>
  );
}
