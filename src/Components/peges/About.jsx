import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Items from './Items';
import Categoris from './Categories';
import ShowFullItem from './ShowFullItem';
import About from './About';
import Navbar from '../Navbar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        // ... (ваш существующий список товаров)
      ],
      showFullItem: false,
      fullItem: {},
      sliderSettings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
      },
      topProductsSettings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      },
      heroImages: [
        { id: 1, img: 'четвертое.jpg', title: 'Эксклюзивные шоколадные коллекции', subtitle: 'Только натуральные ингредиенты' },
        { id: 2, img: 'первое.jpg', title: 'Ручная работа', subtitle: 'Каждый продукт создается с любовью' },
        { id: 3, img: 'второе.jpg', title: 'Идеальные подарки', subtitle: 'Удивите своих близких' }
      ],
      topProducts: [1, 4, 7, 10] // ID топовых продуктов
    };
    this.state.currentItems = this.state.items;
  }

  // ... (остальные методы класса остаются без изменений)

  renderTopProducts() {
    const { items, topProducts } = this.state;
    const topItems = items.filter(item => topProducts.includes(item.id));
    
    return topItems.map(item => (
      <div key={item.id} className="top-product-slide">
        <Link to={`/products#${item.id}`}>
          <img src={`./img/${item.img}`} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.price}</p>
        </Link>
      </div>
    ));
  }

  renderHeroSlider() {
    return this.state.heroImages.map(slide => (
      <div key={slide.id} className="hero-slide">
        <img src={`./img/${slide.img}`} alt={slide.title} />
        <div className="hero-content">
          <h2>{slide.title}</h2>
          <p>{slide.subtitle}</p>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="home-wrapper">
        {/* Навигационное меню */}
        <Navbar orders={this.state.orders} onDelete={this.deleteOrder} />
        
        {/* Слайдер с изображениями */}
        <section className="hero-slider">
          <Slider {...this.state.sliderSettings}>
            {this.renderHeroSlider()}
          </Slider>
        </section>

        {/* Слайдер топ-шоколада */}
        <section className="top-products">
          <h2>Наши бестселлеры</h2>
          <Slider {...this.state.topProductsSettings}>
            {this.renderTopProducts()}
          </Slider>
        </section>

        {/* Каталог (оставшаяся часть) */}
        <div className="catalog-section">
          <h1>Каталог</h1>
          <Categoris chooseCategory={this.chooseCategory} />
          <Items 
            onShowItem={this.onShowItem} 
            items={this.state.currentItems} 
            onAdd={this.addToOrder}
          />
          
          {this.state.showFullItem && (
            <ShowFullItem 
              onAdd={this.addToOrder}  
              onShowItem={this.onShowItem} 
              item={this.state.fullItem}
            />
          )}
        </div>

        {/* Добавленный раздел About */}
        <section className="home-about-section">
          <About />
        </section>
        
        <Footer />
      </div>
    );
  }
}

// Обертка Redux (остается без изменений)
const HomeWithRedux = (props) => {
  const isAuth = useSelector(state => state.profile.isAuth);
  const dispatch = useDispatch();
  
  return (
    <Home 
      {...props} 
      isAuth={isAuth} 
      dispatch={dispatch} 
    />
  );
};

export default HomeWithRedux;