
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Navbar from './Navbar';
import Accounts from '../pages/accounts';
import Events from '../pages/events';
import Register from '../pages/register';
import SampleComponent from '../components/SampleComponent';
import EventComponent from '../components/EventComponent';
import EventCarouselComponent from '../components/EventCarouselComponent';
import Footer from '../components/Footer';
import eventsService from '../util/eventsService';
import { Event } from '../types/eventTypes';

const Router: React.FC = () => {

  

  return ( // get jiggy with it
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event" element={<Events />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/john" element={<EventComponent event={{
          icon: 'https://i.ytimg.com/vi/PaprAoCWe2M/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHBACGAYgATgBQAE=&rs=AOn4CLDCnuwwV7sV3dgj3e_WUh1IB59Jag',
          id: 0,
          location: "Student Union",
          title: "Welcome Week",
          type: "VIRTUAL",
          date: new Date(), 
          description: `Take part in the greatest event yet! These are some random words that will be filling up the event description. It shouldn't be too long.\n\nIf the world was ending, I wanna be next to youuuUUuuu. If the party was over and our time on earth was throughhhh. ` }} />} />
        <Route path="/jake" element={<JakeWrapper />}/>
        <Route path="/gia" element={<SampleComponent />} />
        <Route path="/hov" element={<SampleComponent />} />
        <Route path="/jon" element={<SampleComponent />} />
      </Routes>
      <Footer/>
      
    </BrowserRouter>
  );
};
export default Router;


const JakeWrapper = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const events = await eventsService.getEvents();
      setEvents(events);
    }

    getEvents()
  }, [])

  return (
    <div className="mt-64">
      <EventCarouselComponent events={events} />
    </div>
  )
}