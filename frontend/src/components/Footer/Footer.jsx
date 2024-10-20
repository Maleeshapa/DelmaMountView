import React from 'react'
import assets from '../../assets/assets'
import './Footer.css'

const Footer = () => {
    return (
        <div className="Footer">
            <footer className="text-center text-lg-start bg-color text-muted">
                <div className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="links col-md-2 col-lg-2 col-xl-2 text-white mx-auto mb-4">
                                <h6 className="text-uppercase  text-warning  fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">Home</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">About</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Rooms</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Dining</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Events</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Gallery</a>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-center">
                                <img className='footer-logo' src={assets.logo} alt="Logo" />
                                <form className="newsletter-form mt-3">
                                    <input
                                        type="email"
                                        className="form-control mb-2"
                                        placeholder="Enter your email"
                                        aria-label="Email"
                                    />
                                    <button type="submit" className="button w-100">
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 text-white mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase text-warning fw-bold mb-4">Contact</h6>
                                <p><i className="fas fa-home me-3"></i> No 213/7 Aladeniya Werellagama, Kandy, Sri Lanka</p>
                                <p><i className="fas fa-envelope me-3"></i><a href="mailto:delmalanka@gmail.com" className='text-white'>info@delmamountviewhotel.com</a></p>
                                <p><i className="fas fa-phone me-3"></i><a href="tel:+94814940746" className='text-white'>+94 81 494 0746</a> </p>
                                <p><i className="fas fa-phone me-3"></i><a href="tel:+94772998997" className='text-white'> +94 77 299 8997</a></p>
                                <p><i className="fab fa-facebook-f me-3"></i><a href="https://web.facebook.com/delmamountviewhotel.lk/about_profile_transparency" className='text-white'>Delma Mount View Hotel</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer