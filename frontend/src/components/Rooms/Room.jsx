import React,{useEffect} from 'react'
import './Room.css'
import assets from '../../assets/assets'
import 'aos/dist/aos.css';
import AOS from 'aos';

const Room = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1 second
    }, []);
    return (
        <div className='room'>
            <div className="room-back">
                <div className="caption" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                    <h1>Accommodation</h1>
                </div>
                <div className="content-area-room">
                    <div className="card-room" data-aos="zoom-out-up" data-aos-duration="3000">
                        <img src={assets.room1} alt="card-room Image" data-aos="zoom-out-up"  />
                        <div className="card-room-content">
                            <h2 className="card-room-title">Single Room</h2>
                            <p className="card-room-description">Single room equipped with modern amenities, including <b>free Wi-Fi, air conditioning, a flat-screen TV, a mini fridge bar, and a bathroom</b> for your comfort and convenience.</p>
                            
                        </div>
                    </div>
                    <div className="card-room" data-aos="zoom-out-up" data-aos-duration="3000">
                        <img src={assets.room2} alt="card-room Image" data-aos="zoom-out-up" />
                        <div className="card-room-content">
                            <h2 className="card-room-title">Double Room</h2>
                            <p className="card-room-description">Double room ideal for <b>two adults, with accommodation available for children under 12</b>. Features a <b><span>king-sized bed</span>, Wi-Fi, air conditioning, a flat-screen TV, a mini fridge bar, bathroom</b> and all the comforts needed for a relaxing stay.</p>
                            
                        </div>
                    </div>
                    <div className="card-room" data-aos="zoom-out-up" data-aos-duration="3000">
                        <img src={assets.room3} alt="card-room Image" data-aos="zoom-out-up" />
                        <div className="card-room-content">
                            <h2 className="card-room-title">Triple Room</h2>
                            <p className="card-room-description">Triple room ideal for <b>three adults, with accommodation available for children under 12.</b> Features a <b><span>king-sized bed, a queen-sized bed,</span> Wi-Fi, air conditioning, a flat-screen TV, a mini fridge bar, bathroom</b> and all the comforts needed for a relaxing stay.</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Room