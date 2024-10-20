import React from 'react'
import './Fun.css'
import assets from '../../assets/assets'

const Event = () => {
    return (
        <div className="event">
            <div className="event-color">
                <div className="caption" data-aos="fade-up" data-aos-duration="6000">
                    <h1>Weddings & Event</h1>
                </div>
                <div className="content-area">
                    <div className="content-area-1">
                        
                        <div className="card-fun-1">
                            <div className="header">
                                <div className="img-box">
                                    <img className="" src={assets.gal7} alt="Hotel background" loading="lazy" />
                                </div>
                                <span className="title">Weddings
                                </span></div>
                            <div className="content">
                                <p>Book your dream wedding in our elegant banquet hall, accommodating up to 300 guests. We offer comprehensive services including catering, decoration, and evening planning to ensure your special day is unforgettable.</p>
                                <a className="btn-link"></a>
                            </div>
                        </div>
                        <div className="card-fun-1">
                            <div className="header">
                                <div className="img-box">
                                    <img className="" src={assets.gal8} alt="Hotel background" loading="lazy" />
                                </div>
                                <span className="title">Party
                                </span></div>
                            <div className="content">
                                <p>Host your next celebration in our stylish venue, perfect for parties of all sizes. We offer tailored services including catering, decoration, and event planning to make your party an unforgettable experience.</p>
                                <a className="btn-link"></a>
                            </div>
                        </div>

                        <div className="card-fun-1">
                            <div className="header">
                                <div className="img-box">
                                    <img className="" src={assets.gal9} alt="Hotel background" loading="lazy" />
                                </div>
                                <span className="title">Meetings
                                </span></div>
                            <div className="content">
                                <p>Conduct your meetings in our fully equipped conference rooms, designed for productivity and comfort. We offer customizable setups, audiovisual support, and catering services to ensure a successful event.</p>
                                <a className="btn-link"></a>
                            </div>
                        </div>
                    </div>

                    <div className="content-area-2">
                        <div className="card-fun-2">
                            <img src={assets.gal7} alt="card-fun-2 Image" />
                            <div className="card-fun-2-content">
                                <h2 className="card-fun-2-title">weddings</h2>
                                <p className="card-fun-2-description">Book your dream wedding in our elegant banquet hall, accommodating up to 300 guests. We offer comprehensive services including catering, decoration, and evening planning to ensure your special day is unforgettable.</p>
                            </div>
                        </div>
                        <div className="card-fun-2">
                            <img src={assets.gal8} alt="card-fun-2 Image" />
                            <div className="card-fun-2-content">
                                <h2 className="card-fun-2-title">Part</h2>
                                <p className="card-fun-2-description">Host your next celebration in our stylish venue, perfect for parties of all sizes. We offer tailored services including catering, decoration, and event planning to make your party an unforgettable experience.</p>
                            </div>
                        </div>
                        <div className="card-fun-2">
                            <img src={assets.gal9} alt="card-fun-2 Image" />
                            <div className="card-fun-2-content">
                                <h2 className="card-fun-2-title">Meeting</h2>
                                <p className="card-fun-2-description">Conduct your meetings and seminars in our fully equipped conference rooms, designed for productivity and comfort. We offer customizable setups, audiovisual support, and catering services to ensure a successful event.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Event