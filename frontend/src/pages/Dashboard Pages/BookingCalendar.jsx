import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/SideBar/SideBar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import config from '../../config';

// List of colors
const colors = ['purple', 'blue', 'green', 'orange', 'yellow'];

function BookingCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.post(`${config.BASE_URL}/booking/calendar`);
        if (response.status === 200) {
          const eventsWithColors = response.data.events.map((event, index) => {
            const color = colors[index % colors.length];
            return { ...event, backgroundColor: color };
          });
          setEvents(eventsWithColors);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Booking Calendar</h2>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div style={{ width: '175vh', height: '85vh', overflow: 'auto' }}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              events={events}
              editable={true}
              dayMaxEvents={true}
              height="100%"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCalendar;
