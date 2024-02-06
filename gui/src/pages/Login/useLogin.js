import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../context/UserStore';
import API from '../../services/connection';

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorInLogin, setErrorInLogin] = useState('');

  const { changeLoggedInUser } = useUser();

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginStatus = (flag) => {
    setLoginStatus(flag);
  };

  const checkPassword = (event) => {
    if (event.target.value !== password) {
      return setErrorInLogin('Senhas não são iguais');
    }
    return setErrorInLogin('');
  };

  const login = async () => {
    if (!username.length || !password.length) return null;

    const payload = {
      username,
      password,
    };

    try {
      const { data } = await API.post('/login/', payload);
      setErrorInLogin('');

      const user = {
        username,
        apiKey: data.token,
        loggedIn: true,
      };
      changeLoggedInUser(user);
      return navigate('/tarefas');
    } catch (error) {
      return setErrorInLogin('Usuário/senha inválidos');
    }
  };

  const signup = async () => {
    if (!username.length || !password.length) return null;

    const payload = {
      username,
      password,
    };

    try {
      const { data } = await API.post('/signup/', payload);
      setLoginStatus(true);
      setUsername(data.user.username);
      setPassword('');
      return setErrorInLogin(data.msg);
    } catch (error) {
      return setErrorInLogin('Erro no cadastro');
    }
  };

  return {
    username,
    changeUsername,
    password,
    changePassword,
    checkPassword,
    errorInLogin,
    handleClickShowPassword,
    showPassword,
    loginStatus,
    handleLoginStatus,
    login,
    signup,
  };
};
