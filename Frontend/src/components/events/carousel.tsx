import EventComponent from './event'
import { Event } from '../../types/eventTypes'

interface EventCarouselComponentProps {
    events: Event[]
}

const EventCarouselComponent: React.FC<EventCarouselComponentProps> = ({ events }) => {

    const nextEvents = () => {

        // const wrapper = document.activeElement()
        //     try{
        //         let offset = wrapper.getBoundingClientRect().x;
        //         offset -= wrapper.getBoundingClientRect().width;

        //         wrapper.className+=" bg-white";
        //     }
        //     catch(error){console.log(error);}
    }

    return (
        // Wrapper {REMOVE MARGIN WHEN FINISHED}
        <div id="event-carousel" className="relative overflow-x-scroll w-full h-fit bg-gray-500">
            {/* Items */}
            <div id="item-wrapper" className="overflow-hidden w-full h-full flex space-x-7">
                {events.map((event) => (
                    <div className="h-full w-96 ease-in-out" key={event.UID}>
                        <EventComponent event={event} />
                    </div>
                ))}
            </div>
            {/* Controls */}

            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none" onClick={nextEvents}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    )
}

export default EventCarouselComponent;