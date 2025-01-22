
import React, { useEffect, useState, useContext } from 'react';
import { Event as GCUEvent } from '../../types/eventTypes';
import AppContext from '../../AppContext';
import EventComponent from '../../components/events/event';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Events: React.FC = () => {

  const [page, setPage] = useState(0);
  const [events, setEvents] = React.useState<GCUEvent[]>([]);
  const { api } = useContext(AppContext);

  useEffect(() => {
    const fetchEvents = async () => {
      console.log('fetching events')
      const events = await api.fetchEvents();
      console.log(events)
      setEvents(events);
    }

    fetchEvents()
  }, [api]);

  return (
    <div className="flex mt-20 m-10 flex-row justify-center items-center">
      <FaArrowLeft className='cursor-pointer text-6xl mr-10' onClick={() => setPage(p => p <= 0 ? 0 : p--)} />
      <div className='flex flex-col justify-center'>
        <h1 className='text-5xl mb-5'>Upcoming Events</h1>
        <div className='grid grid-flow-row grid-cols-3 gap-x-5'>
          {
            events.slice(page, page + 3).map((event, index) => (
              <EventComponent key={index} event={event} />
            ))
          }
        </div>
      </div>
      <FaArrowRight className='cursor-pointer text-6xl ml-10' onClick={() => setPage(p => p >= events.length ? events.length : p++)} />
    </div>
  );
};

export default Events;
