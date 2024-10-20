import React, { useState, useEffect } from 'react'
import './Book.css'
import assets from '../../assets/assets';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const Book = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/cusBooking', { state: { startDate, endDate } });
    };


    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);


    return (
        <div>
            <div className="text-foreground ">
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className="swiper-slide--two">
                        <div className="relative banner">
                            <img className="banner" src={assets.back} alt="Hotel background" loading="lazy" />
                            <div className="absolute inset-0 bg-black opacity-50">
                            </div>
                            <div className="welcome ">
                                <div className=" absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                                    <h1 className="welcome_text ">WELCOME TO</h1>
                                    <h1 className="welcome_text">Delma Mount View</h1>
                                    <p className="welcome_p">Delma Mount View Hotel Kandy is a luxurious 3-star hotel, located approximately a 15-minute drive from Ranawana Purana Rajamaha Viharaya.</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide--two">
                        <div className="relative banner">
                            <img className="banner" src={assets.dine} alt="Hotel background" loading="lazy" />
                            <div className="absolute inset-0 bg-black opacity-50">
                            </div>
                            <div className="welcome ">
                                <div className=" absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                                    <h1 className="welcome_text ">WELCOME TO</h1>
                                    <h1 className="welcome_text">Delma Mount View</h1>
                                    <p className="welcome_p">Delma Mount View Hotel Kandy offers 8 rooms approximately a 15-minute drive from Ranawana Purana Rajamaha Viharaya. </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                <div className="check ">
                    <div className="input-center">
                        <div class="card-book shadow">
                            <div className="inputs">

                                <form onSubmit={handleSubmit}>
                                    <div className="input_container" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                                        <input type="date" id="input" value={startDate} onChange={(e) => setStartDate(e.target.value)} required/>
                                        <label for="input" className="label">Check In Date</label>
                                        <div className="underline"></div>
                                    </div>

                                    <div className="input_container" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                                        <input type="date" id="input" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                                        <label for="input" className="label">Check Out Date</label>
                                        <div className="underline"></div>
                                    </div>

                                    <div className="input_container" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                                        <button type='submit' className="w-100 button ">Check Now</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book