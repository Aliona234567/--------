import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';

const Item = ({ item, onShowItem }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: item.id,
      title: item.title,
      price: parseFloat(item.price.replace('Цена:', '').replace('$', '')),
      img: item.img
    }));
  };

  return (
    <div className='item'>
      <img 
        src={'./img/' + item.img} 
        onClick={() => onShowItem(item)} 
        alt={item.title} 
      />
      <h2>{item.title}</h2>
      <p>{item.desc}</p>
      <b>{item.price}</b>
      <button 
        className='add-to-cart' 
        onClick={handleAddToCart}
      >
        Добавить в корзину
      </button>
    </div>
  );
};

export default Item;