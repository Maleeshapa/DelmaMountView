import React from 'react';
import './Offers.css';
import assets from '../../assets/assets';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const Offers = () => {
    return (
        <div>
            <div className="offers">
                <div className="caption" data-aos="fade-up">
                    <h1>Special Offers</h1>
                </div>

                <div className="offer_cards" data-aos="fade-up">
                    <div className="container-1">
                        <div className="card-f align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                            <div className="offer-banner-wrapper">
                                <img className="offer-banner" src={assets.offer1} alt="Hotel background" loading="lazy" />
                            </div>
                        </div>
                        <div className="card-f align-items-stretch" data-aos="fade-up" data-aos-delay="400">
                            <div className="offer-banner-wrapper">
                                <img className="offer-banner" src={assets.offer1} alt="Hotel background" loading="lazy" />
                            </div>
                        </div>
                        <div className="card-f align-items-stretch" data-aos="fade-up" data-aos-delay="600">
                            <div className="offer-banner-wrapper">
                                <img className="offer-banner" src={assets.offer1} alt="Hotel background" loading="lazy" />
                            </div>
                        </div>
                    </div>

                    <div className="container-2">
                        <Swiper
                            pagination={{ clickable: true }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide className="swiper-slide--two">
                                <div>
                                    <div className="card-2">
                                        <div className="offer-banner-wrapper">
                                            <img className="offer-banner" src={assets.offer1} alt="Hotel background" loading="lazy" />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide--two">
                                <div>
                                    <div className="card-2">
                                        <div className="offer-banner-wrapper">
                                            <img className="offer-banner" src={assets.offer1} alt="Hotel background" loading="lazy" />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide--two">
                                <div>
                                    <div className="card-2">
                                        <div className="offer-banner-wrapper">
                                            <img className="offer-banner" src={assets.offer1} alt="Hotel background" loading="lazy" />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers;
