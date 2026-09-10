import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import PublicLayouts from '../Layouts/PublicLayouts';
import AboutPages from '../pages/AboutPages';
import AcademicsPages from '../pages/AcademicsPages';
import FacilitiesPages from '../pages/FacilitiesPages';
import GalleryPages from '../pages/GalleryPages';
import CBSECornerPages from '../pages/CBSECornerPages';
import ContactPages from '../pages/ContactPages';
import NoticesPages from '../pages/NoticesPages';
import FeesStructure from '../pages/FeesStructure';
import LoginPage from '../pages/LoginPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayouts />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/About',
        element: <AboutPages />,
      },
      {
        path: '/Academics',
        element: <AcademicsPages />,
      },
      {
        path: '/FeesStructure',
        element: <FeesStructure />,
      },
      {
        path: '/Facilities',
        element: <FacilitiesPages />,
      },
      {
        path: '/Gallery',
        element: <GalleryPages />,
      },
      {
        path: '/CBSE_Corner',
        element: <CBSECornerPages />,
      },
      {
        path: '/Contact',
        element: <ContactPages />,
      },
      {
        path: '/Notices',
        element: <NoticesPages />,
      },
      {
        path: '/portal',
        element: <LoginPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default routes;