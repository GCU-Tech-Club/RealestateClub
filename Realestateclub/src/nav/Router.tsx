
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Navbar from './Navbar';
import Accounts from '../pages/accounts';
import Events from '../pages/events';
import Register from '../pages/register';
import SampleComponent from '../components/SampleComponent';
import EventComponent from '../components/EventComponent';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event" element={<Events />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/john" element={<EventComponent />} />
        <Route path="/gia" element={<SampleComponent />} />
        <Route path="/hov" element={<SampleComponent />} />
        <Route path="/jon" element={<SampleComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
