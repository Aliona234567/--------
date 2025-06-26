import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeFromCart, 
  updateQuantity, 
  toggleCart,
  clearCart 
} from './cartSlice';

const CartPopup = () => {
  const dispatch = useDispatch();
  const { items, isCartOpen } = useSelector(state => state.cart);

  const total = items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0);

  if (!isCartOpen) return null;

  return (
    <div className="shop-cart" style={{ 
      position: 'absolute',
      top: '40px',
      right: '39%',
      width: '500px',
      backgroundColor: 'aliceblue',
      boxShadow: '9px 10px 24px 3px rgba(39, 48, 56, 0.2)',
      zIndex: '1000',
      borderRadius: '9%',
      padding: '20px',
      paddingBottom: '0'
    }}>
      <div className="cart-header" style={{
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>
          {items.length === 0 ? 'Корзина пуста' : 'Ваша корзина'}
        </h2>
        <button 
          className="delete-icon" 
          onClick={() => dispatch(toggleCart())}
          style={{
            color: 'black',
            float: 'right',
            position: 'relative',
            top: '-30px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            transition: 'color, transform 500ms ease'
          }}
        >
          ×
        </button>
      </div>
      
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Добавьте товары из каталога</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div className="item" key={item.id} style={{
                width: '100%',
                float: 'left',
                marginBottom: '20px'
              }}>
                <img 
                  src={item.img || item.image} 
                  alt={item.title || item.name} 
                  style={{
                    width: '70px',
                    float: 'left',
                    marginRight: '20px'
                  }}
                />
                <div className="item-info">
                  <h2 style={{
                    fontSize: '15px',
                    marginBottom: '1px'
                  }}>
                    {item.title || item.name}
                  </h2>
                  <p style={{
                    color: '#797979',
                    fontWeight: '600'
                  }}>
                    {item.price} ₽ × {item.quantity} = {item.price * item.quantity} ₽
                  </p>
                </div>
                <div className="quantity-controls" style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px'
                }}>
                  <button
                    onClick={() => 
                      dispatch(updateQuantity({ 
                        id: item.id, 
                        quantity: Math.max(1, item.quantity - 1) 
                      }))
                    }
                    style={{
                      background: 'none',
                      border: '1px solid #797979',
                      borderRadius: '4px',
                      width: '25px',
                      height: '25px',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <button
                    onClick={() => 
                      dispatch(updateQuantity({ 
                        id: item.id, 
                        quantity: item.quantity + 1 
                      }))
                    }
                    style={{
                      background: 'none',
                      border: '1px solid #797979',
                      borderRadius: '4px',
                      width: '25px',
                      height: '25px',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="delete-icon"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  style={{
                    color: 'black',
                    float: 'right',
                    position: 'relative',
                    top: '-30px',
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    transition: 'color, transform 500ms ease'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="summa" style={{
            float: 'left',
            width: '100%',
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            Итого: {total.toFixed(2)} ₽
          </div>

          <button 
            className="checkout-btn"
            onClick={() => {
              alert('Заказ оформлен!');
              dispatch(clearCart());
            }}
            style={{
              width: '100%',
              padding: '10px',
              background: '#000000',
              color: '#1a936f',
              border: '2px solid #1a936f',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '20px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            Оформить заказ
          </button>
        </>
      )}
    </div>
  );
};

export default CartPopup;