import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(RouterProvider, { router })
  )
)
