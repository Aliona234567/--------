import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import defaultImage from '../assets/default-product.jpg';

const ProductItem = memo(({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.img || defaultImage
    }));
  };

  return (
    <div className="product-card">
      <img 
        src={product.img || defaultImage} 
        alt={product.title}
        onError={(e) => e.target.src = defaultImage}
      />
      <h3>{product.title}</h3>
      <p>{product.price}$</p>
      <button onClick={handleAddToCart}>В корзину</button>
    </div>
  );
});

export default ProductItem;