import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, clearLoginError } from './profileSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, loginError } = useSelector(state => state.profile);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (email || password) {
      dispatch(clearLoginError());
      setFormError("");
    }
  }, [email, password, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError("Заполните все поля");
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <div className='login-container'>
      <h2>Вход</h2>
      {formError && <p className="error">{formError}</p>}
      {loginError && <p className="error">{loginError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
          />
        </div>
        <div>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта: <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default Login;