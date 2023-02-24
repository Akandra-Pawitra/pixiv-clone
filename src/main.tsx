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
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAsUCMGNxdEZVibfTfoLP-0f5cO0P3ssA0",
  authDomain: "pixiv-clone-3455d.firebaseapp.com",
  projectId: "pixiv-clone-3455d",
  storageBucket: "pixiv-clone-3455d.appspot.com",
  messagingSenderId: "467823414396",
  appId: "1:467823414396:web:49e2dcec31e22257b3cdf9"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage()


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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
