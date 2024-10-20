import React, { useEffect } from 'react'
import './About.css'
import AOS from 'aos';
import 'aos/dist/aos.css';


const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1 second
    }, []);
    return (
        <div>
            <div className="about" data-aos="fade-up"     data-aos-anchor-placement="top-bottom">
                <div className="caption" data-aos="fade-up"     data-aos-duration="6000">
                    <h1>Delma Mount View Hotel</h1>
                    <h4 className='text-lg'>Luxury Banquet & Rooms</h4>
                </div>
                <div className="about_text" data-aos="fade-up"     data-aos-duration="3000">
                    <p>Delma Mount View Hotel is a luxurious 3-star property offering a serene and picturesque getaway, often characterized by its stunning views and high-quality amenities. Nestled in a mountainous area, the hotel provides guests with breathtaking scenery, fresh air, and a peaceful environment.

The hotel features well-appointed rooms and suites, catering to both comfort and elegance. Guests can enjoy a range of dining options, including local and international cuisines, ensuring a delightful culinary experience. Additionally, the hotel boasts various facilities such as a spa, gym, swimming pool, and event spaces suitable for weddings, conferences, and other gatherings.</p>

                    <p>Whether you're planning a stay or a visit, Delma Mount View Hotel is ideal for those who appreciate a combination of luxury, comfort, and natural beauty.</p>
                </div>
            </div>
        </div>
    )
}

export default About