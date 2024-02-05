/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from '@mui/material/Link';

import useLogin from './useLogin';
import { Logo } from '../../assets/theme';

import * as Style from './style';

export default function Login() {
  const {
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
  } = useLogin();

  return (
    <Style.Container>
      <Style.Left>
        <Style.LeftContainer>
          <Logo height="50px" />
          <div className="text">
            <h1 className="title">Task Killer</h1>
          </div>
        </Style.LeftContainer>
      </Style.Left>
      <Style.Right>
        <div className="box">
          <h1 className="login">{loginStatus ? 'Log in' : 'Cadastro'}</h1>
          {loginStatus && <h6 className="subtitle">Informe seu usuário e senha</h6>}
          <TextField
            className="input"
            label={loginStatus ? 'Usuário' : 'Novo Usuário'}
            value={username}
            onChange={changeUsername}
          />
          <FormControl className="input" sx={{ m: 1 }}>
            <InputLabel>Senha</InputLabel>
            <OutlinedInput
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={changePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {!loginStatus && (
            <TextField
              className="input"
              label="Confirmar senha"
              type="password"
              onChange={checkPassword}
            />
          )}
          <Button onClick={loginStatus ? login : signup} variant="contained">
            {loginStatus ? 'Log in' : 'Cadastrar'}
          </Button>
          {loginStatus && (
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                handleLoginStatus(false);
              }}
              sx={{ marginTop: '10px' }}
            >
              Primeiro acesso? Clique aqui!
            </Link>
          )}
          <Style.Error>{errorInLogin}</Style.Error>
        </div>
      </Style.Right>

      {!loginStatus && (
        <Style.Top>
          <div className="back">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                handleLoginStatus(true);
              }}
              variant="contained"
              disabled={String(errorInLogin) !== ''}
            >
              Login
            </Button>
          </div>
        </Style.Top>
      )}
    </Style.Container>
  );
}
