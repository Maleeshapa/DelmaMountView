import SideBar from '../../components/SideBar/SideBar'
import Panel from '../../components/Panel'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {

  const [rooms, setRooms] = useState(0);
  const [booking, setBooking] = useState(0);
  const [customers, setCustomer] = useState(0)
  const [income, setIncome] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // customer 
        const customerRes = await axios.get('http://localhost:5000/customer');
        const customerCount = new Set(customerRes.data.map(item => item.cusNIC));
        setCustomer(customerCount.size);

        // rooms
        const roomRes = await axios.get('http://localhost:5000/rooms');
        const roomCount = new Set(roomRes.data.map(item => item.roomNumber));
        setRooms(roomCount.size);

        // booking
        const bookingRes = await axios.get('http://localhost:5000/booking')
        const bookingCount = new Set(bookingRes.data.map(item=>item.bookingId));
        setBooking(bookingCount.size)

      } catch (error){
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='d-flex'>
      <SideBar />
      <div className="flex-grow-1 p-3">
        <h2>Dashboard</h2>

        <div class="flex flex-1 p-4">

          <main class="flex-1 grid grid-cols-3 gap-4 ml-4">

            <Panel
              title={"Rooms"}
              num={rooms}
              bgColor="bg-gradient-to-r from-blue-400 to-green-500 "
            />

            <Panel
              title={"Bookings"}
              num={booking}
              bgColor="bg-gradient-to-r from-blue-400 to-cyan-500"
            />

            <Panel
              title={"Customers"}
              num={customers}
              bgColor="bg-gradient-to-r from-green-400 to-teal-500"
            />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard