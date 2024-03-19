import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Catalog from './components/Catalog/Catalog.jsx';
import Blog from './components/Blog/Blog.jsx';
import Contact from './components/Contact/Contact.jsx';
import Model from './components/Model/Model.jsx';
import ModelViewer from "./components/ModelViewer/ModelViewer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/Catalog",
    element: <Catalog />
  },
  {
    path:"/Blog",
    element: <Blog />
  },
  {
    path: "/Contact",
    element: <Contact />
  },
  {
    path: "/Model",
    element: <Model />
  },
  {
    path: "/ModelViewer/:fileId",
    element: <ModelViewer />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
