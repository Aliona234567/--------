import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './profileSlice';
import Navbar from '../Navbar';
import Footer from './Footer';
import './Profile.module.css';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser, isAuth } = useSelector(state => state.profile);
  const orders = useSelector(state => state.cart.orders || []);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!loggedInUser || !isAuth) {
    return (
      <div className="profile-loading">
        <Navbar orders={orders} />
        <div className="loading-content">
          <h3>Загрузка профиля...</h3>
          <Link to="/" className="loading-link">В коталог</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar orders={orders} />
      
      <div className="profile-container">
        <div className='profile-header'>
          <h1>Мой профиль</h1>
          <button className='logout-btn' onClick={handleLogout}>
            Выйти
          </button>
        </div>
        
        <div className='user-profile-card'>
          <div className='avatar-section'>
            <div className='profile-avatar'>
              {loggedInUser.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            {/* <button className='edit-avatar-btn'>
              Изменить фото
            </button> */}
          </div>
          
          <div className='profile-details'>
            <div className="detail-row">
              <span className="detail-label">Имя:</span>
              <span className="detail-value">{loggedInUser.name || 'Не указано'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{loggedInUser.email || 'Не указан'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Телефон:</span>
              <span className="detail-value">{loggedInUser.phone || 'Не указан'}</span>
            </div>
            
            {/* <Link to="/profile/edit" className="edit-profile-btn">
              Редактировать профиль
            </Link> */}
          </div>
        </div>

        <div className='orders-history'>
          {/* <h2>История заказов</h2> */}
          {loggedInUser.paidItems?.length > 0 ? (
            <div className='orders-list'>
              {loggedInUser.paidItems.map((order, index) => (
                <div key={`order-${index}`} className="order-card">
                  {/* <div className="order-header">
                    <span className="order-date">{order.date || 'Дата не указана'}</span>
                    <span className="order-total">{order.total || 0} руб.</span>
                  </div> */}
                  {/* <div className="order-items">
                    {order.items.map(item => (
                      <div key={item.id} className="order-item">
                        <img 
                          src={`/img/${item.img}`} 
                          alt={item.title} 
                          className="item-image"
                        />
                        <div className="item-info">
                          <h4>{item.title}</h4>
                          <p>{item.quantity} × {item.price} руб.</p>
                        </div>
                      </div>
                    ))}
                  </div> */}
                  {/* <button className="repeat-order-btn">
                    Повторить заказ
                  </button> */}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-orders">
              {/* <p>Вы еще не совершали заказов</p> */}
              <Link to="/products" className="shop-link">
                Перейти к покупкам
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;