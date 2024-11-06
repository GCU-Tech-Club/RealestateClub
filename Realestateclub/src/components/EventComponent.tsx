const EventComponent = ({ id, icon, date, location, type, title, description }) => {
  return <div key={id}>
    <h1>Upcoming Events</h1>
    <div>
        <div>
            <img src={icon} />
        </div>
        <div>
            <h3>{type}</h3>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </div>
  </div>;
};

export default EventComponent;
