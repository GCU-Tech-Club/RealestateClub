  import React, { useEffect, useState, useContext, useRef } from 'react';
  import { Event as GCUEvent } from '../../types/eventTypes';
  import AppContext from '../../AppContext';
  import EventComponent from '../../components/events/event';
  import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

  const Events: React.FC = () => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [events, setEvents] = useState<GCUEvent[]>([]);
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

    const nextPage = () => {
      if (scrollContainerRef.current) {
        const scrollAmount = scrollContainerRef.current.clientWidth;
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }

    const lastPage = () => {
      if (scrollContainerRef.current) {
        const scrollAmount = scrollContainerRef.current.clientWidth;
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      }
    }

    return (
      <div className="flex flex-col justify-center items-center">
        {/* The Fold */}
        <div className="h-96 pt-10 bg-blue-300 w-full flex items-center justify-center">
          <h1 className='text-5xl mb-5'>Upcoming Events</h1>
        </div>

        {/* Events */}

        <div className="flex w-full items-center my-10">
          <button onClick={lastPage}>
            <FaArrowLeft className='cursor-pointer text-6xl mr-10' />
          </button>
          <div className="w-full noScrollbar h-96 relative overflow-x-auto" ref={scrollContainerRef}>
            <div className='flex w-full h-full flex-nowrap gap-5'>
              {
                events.map((event, index) => (
                  <EventComponent key={index} event={event} />
                ))
              }
            </div>
          </div>
          <button onClick={nextPage}>
            <FaArrowRight className='cursor-pointer text-6xl ml-10' />
          </button>
        </div>
      </div>
    );
  };

  export default Events;