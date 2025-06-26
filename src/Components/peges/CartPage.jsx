import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../features/cartSlice';
import { Link } from 'react-router-dom';
// import './CartPage.module.css';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    // Здесь логика оформления заказа
    alert('Заказ оформлен!');
    dispatch(clearCart());
  };

  return (
    <div className="cart-page">
      <h1>Ваша корзина</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Ваша корзина пуста</p>
          <Link to="/products">Вернуться к покупкам</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.title} />
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p>{item.price} руб.</p>
                </div>
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >-</button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >+</button>
                </div>
                <div className="item-total">
                  {item.price * item.quantity} руб.
                </div>
                <button 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="remove-btn"
                >×</button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Итого: {calculateTotal()} руб.</h3>
            <button onClick={handleCheckout} className="checkout-btn">
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;