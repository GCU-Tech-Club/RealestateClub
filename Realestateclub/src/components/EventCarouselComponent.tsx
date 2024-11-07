const EventCarouselComponent = () => {
    return(
        // Wrapper
        <div id="event-carousel" className="relative w-full  h-72 bg-gray-500" data-carousel="static">
            {/* Items */}
            <div className="overflow-hidden h-full">
                {/* Item 1 */}
                <div className="rounded-lg bg-red-200 h-full w-1/5" data-carousel-item>
                    <div className="bg-black text-white text-center">Item</div>
                </div>
                {/* Item 2 */}
                <div className="rounded-lg bg-red-200 h-full w-1/5" data-carousel-item>
                    <div className="bg-black text-white text-center">Item</div>
                </div>
                {/* Item 3 */}
                <div className="rounded-lg bg-red-200 h-full w-1/5" data-carousel-item>
                    <div className="bg-black text-white text-center">Item</div>
                </div>
                {/* Item 4 */}
                <div className="rounded-lg bg-red-200 h-full w-1/5" data-carousel-item>
                    <div className="bg-black text-white text-center">Item</div>
                </div>
                {/* Item 5 */}
                <div className="rounded-lg bg-red-200 h-full w-1/5" data-carousel-item>
                    <div className="bg-black text-white text-center">Item</div>
                </div>
                {/* Item 6 */}
                <div className="rounded-lg bg-red-200 h-full w-1/5" data-carousel-item>
                    <div className="bg-black text-white text-center">Item</div>
                </div>
            </div>
            {/* Controls */}
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    )
}

export default EventCarouselComponent