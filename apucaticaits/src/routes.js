import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import ProdutosEmAlta from './pages/ProdutosEmAlta'
import QueimaDeEstoque from './pages/QueimaDeEstoque'
import lancamentos from './pages/Lancamentos'

const router = createBrowserRouter([
  { path: '/', element: React.createElement(Login) },
  { path: '/home', element: React.createElement(Home) },
  { path: '/produtos-em-alta', element: React.createElement(ProdutosEmAlta) },
  { path: '/queima-de-estoque', element: React.createElement(QueimaDeEstoque) },
  { path: '/lancamentos', element: React.createElement(lancamentos) },
])

export default router
