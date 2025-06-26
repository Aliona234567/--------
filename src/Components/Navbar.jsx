import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { PiShoppingCart } from "react-icons/pi";
import { useSelector, useDispatch } from 'react-redux';
import { 
  toggleCart,
  removeFromCart,
  clearCart,
  updateQuantity
} from './peges/cartSlice';
// import Order from './pages/Order';
import './Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuth, loggedInUser } = useSelector(state => state.profile);
  const { items, isCartOpen } = useSelector(state => state.cart);

  // Подсчет общего количества товаров
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Подсчет общей суммы (с защитой от некорректных цен)
  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      // Если price уже число (новый формат)
      if (typeof item.price === 'number') {
        return sum + (item.price * item.quantity);
      }
      // Если price строка (старый формат "Цена:200$")
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return sum + (isNaN(price) ? 0 : price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (!isAuth) {
      alert("Для оформления заказа необходимо войти в систему");
      return;
    }
    if (items.length === 0) {
      alert("Ваша корзина пуста");
      return;
    }
    alert(`Заказ на сумму ${calculateTotal()}₽ оформлен!`);
    dispatch(clearCart());
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const renderCartContent = () => {
    if (items.length === 0) {
      return (
        <div className='empty-cart'>
          <h2>Корзина пуста</h2>
          <p>Добавьте товары из каталога</p>
          <NavLink to="/products" onClick={() => dispatch(toggleCart())}>
            Перейти в каталог
          </NavLink>
        </div>
      );
    }

    return (
      <>
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={`./img/${item.img}`} alt={item.title} />
              <div className="item-info">
                <h4>{item.title}</h4>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <p>{item.price}₽ × {item.quantity} = {(item.price * item.quantity).toFixed(2)}₽</p>
              </div>
              <button 
                className="remove-btn"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="total">
            Итого: <span>{calculateTotal()}₽</span>
          </div>
          <button 
            className='checkout-btn'
            onClick={handleCheckout}
          >
            Оформить заказ
          </button>
        </div>
      </>
    );
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <nav>
          <Link to="/" className='logo'>
            Оазис
          </Link>

          <ul className='nav-links'>
            {isAuth ? (
              <>
                <li className="user-greeting">
                  <NavLink to="/profile">
                    {loggedInUser?.name || 'Профиль'}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about">О нас</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Продукты</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Контакты</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Войти</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Регистрация</NavLink>
                </li>
                <li>
                  <NavLink to="/about">О нас</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Продукты</NavLink>
                </li>
              </>
            )}

            <li className="cart-icon">
              <PiShoppingCart 
                onClick={() => dispatch(toggleCart())} 
                className={`shop-cart-button ${isCartOpen ? 'active' : ''}`} 
              />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </li>
          </ul>
        </nav>

        {isCartOpen && (
          <div className="cart-popup-overlay" onClick={() => dispatch(toggleCart())}>
            <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
              <div className="cart-header">
                <h3>Ваша корзина</h3>
                <button 
                  className="close-btn"
                  onClick={() => dispatch(toggleCart())}
                >
                  ×
                </button>
              </div>
              {renderCartContent()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;