import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Artwork from './pages/Artwork'
import Homepage from './pages/Homepage'
import Redirect from './pages/Redirect'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />
  },
  {
    path: "artwork/:id",
    element: <Artwork />
  },
  {
    path: "redirect",
    element: <Redirect />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
