import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'

export default function Login() {
  const navigate = useNavigate()

  function handleLogin() {
    navigate('/home')
  }

  return React.createElement('div', { className: 'login-container' }, [
    React.createElement('div', { className: 'login-box', key: 'box' }, [
      React.createElement('h1', { key: 'title' }, 'Apucaticaits - Login'),

      React.createElement('input', {
        key: 'user',
        type: 'text',
        placeholder: 'Usuário',
        className: 'login-input'
      }),

      React.createElement('input', {
        key: 'pass',
        type: 'password',
        placeholder: 'Senha',
        className: 'login-input'
      }),

      React.createElement('button', {
        key: 'btn',
        className: 'login-button',
        onClick: handleLogin
      }, 'Entrar')
    ])
  ])
}
