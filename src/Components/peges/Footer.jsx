import React from 'react'
import { NavLink, Link } from "react-router-dom";
import './Footer.module.css';

export default function Footer() {
  return (
  <footer>
        <div className="footer-content1">
        <div className='pervii-block'>
        <Link to="/" className='logo'>
        Оазис</Link>
<h3>© 2025 Оазис</h3>
<li>
                {/* <NavLink to="#" ><img src='./Components/img/tg.jpg'/></NavLink> */}
            </li>
            <li>
                <NavLink to="#"></NavLink>
            </li>
            <li>
                <NavLink to="#"></NavLink>  

            </li>
        </div>
        <div className='vtoroi-block'>
        <ul className='nav'>
            <li>
                <NavLink to="/about">О нас</NavLink>
            </li>
            <li>
                <NavLink to="/">Католог</NavLink>
            </li>
            <li>
                <NavLink to="/contsct">Контакты</NavLink>  

            </li>
        </ul>
        </div>
        <div className='tretii-block'>
        <h2>Москва, Кутузовский проспект, 48м.<br></br> Славяновский бульварТЦ <br></br>"Времена года"</h2>
        <h2>8 (495) 419-30-15</h2>

        </div>
    </div>
    </footer>

)}
document.querySelectorAll('.social-icon').forEach(icon => {
  icon.addEventListener('click', (event) => {
      console.log('Переход на:', event.target.innerText);
  });
});
