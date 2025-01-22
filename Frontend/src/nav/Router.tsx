
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Navbar from './Navbar';
import Accounts from '../pages/accounts';
import Events from '../pages/events';
import Register from '../pages/register';
import Footer from '../components/Footer';
import AppContext from '../AppContext';
import APIWrapper from '../util/api';

const Router: React.FC = () => {
  return (
    <BrowserRouter >
      <AppContext.Provider value={{ api: APIWrapper }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event" element={<Events />} />
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
        <Footer />
      </AppContext.Provider>
    </BrowserRouter>
  );
};
export default Router;