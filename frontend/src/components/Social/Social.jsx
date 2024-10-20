import React from 'react'
import './Social.css'

const Social = () => {
    return (
        <div className='Social'>
            <div class="redes">
                <a class="facebook" href="https://web.facebook.com/delmamountviewhotel.lk" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" width="30px" height="30px" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 510.125"><path fill="#fff" fill-rule="nonzero" d="M512 256C512 114.615 397.385 0 256 0S0 114.615 0 256c0 120.059 82.652 220.797 194.157 248.461V334.229h-52.79V256h52.79v-33.709c0-87.134 39.432-127.521 124.977-127.521 16.218 0 44.202 3.18 55.651 6.36v70.916c-6.042-.635-16.537-.954-29.575-.954-41.977 0-58.196 15.901-58.196 57.241V256h83.619l-14.365 78.229h-69.254v175.896C413.771 494.815 512 386.885 512 256z" /></svg>
                    <p>facebook</p>
                </a>
                <a class="instagram" href="https://www.instagram.com/delmamountview/" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0,0,550,550" width="30px" height="30px" fill-rule="nonzero">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                    </svg>
                    <p>Instagram</p>
                </a>
                <a class="tripadvisor" href="https://www.tripadvisor.com/Hotel_Review-g304138-d2531437-Reviews-Delma_Mount_View_Hotel-Kandy_Kandy_District_Central_Province.html" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1333.31 1333.31"
                        shape-rendering="geometricPrecision"
                        text-rendering="geometricPrecision"
                        image-rendering="optimizeQuality"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        width="30px"
                        height="30px">
                        <g fill-rule="nonzero"><circle cx="666.66" cy="666.66" r="666.66" fill="#34e0a1" />
                            <path d="M1078.42 536.6l80.45-87.52h-178.4c-89.31-61.01-197.17-96.54-313.81-96.54-116.5 0-224.06 35.61-313.22 96.54H174.6l80.44 87.52c-49.31 44.99-80.22 109.8-80.22 181.75 0 135.79 110.09 245.88 245.88 245.88 64.51 0 123.27-24.88 167.14-65.55l78.81 85.81 78.81-85.73c43.87 40.67 102.57 65.47 167.07 65.47 135.79 0 246.03-110.09 246.03-245.88.07-72.03-30.84-136.83-80.15-181.75zM420.77 884.75c-91.92 0-166.4-74.48-166.4-166.4s74.49-166.4 166.4-166.4c91.92 0 166.4 74.49 166.4 166.4 0 91.91-74.49 166.4-166.4 166.4zm245.96-171.24c0-109.5-79.63-203.5-184.73-243.65 56.84-23.76 119.18-36.94 184.66-36.94 65.47 0 127.89 13.18 184.73 36.94-105.02 40.23-184.65 134.15-184.65 243.65zm245.88 171.24c-91.92 0-166.4-74.48-166.4-166.4s74.49-166.4 166.4-166.4c91.92 0 166.4 74.49 166.4 166.4 0 91.91-74.49 166.4-166.4 166.4zm0-253.7c-48.2 0-87.23 39.03-87.23 87.23 0 48.19 39.03 87.22 87.23 87.22 48.19 0 87.22-39.03 87.22-87.22 0-48.12-39.03-87.23-87.22-87.23zM508 718.35c0 48.19-39.03 87.22-87.23 87.22-48.19 0-87.22-39.03-87.22-87.22 0-48.2 39.03-87.23 87.22-87.23 48.19-.07 87.23 39.03 87.23 87.23z" />
                        </g>
                    </svg>
                    <p>Tripadvisor</p>
                </a>



                <a class="bookingcom" target="_blank" href="https://www.booking.com/hotel/lk/delma-mount-view.en-gb.html?aid=356980&label=gog235jc-1DCAsohQFCEGRlbG1hLW1vdW50LXZpZXdIM1gDaIUBiAEBmAEJuAEXyAEM2AED6AEBiAIBqAIDuALHvuK2BsACAdICJGQzNzMyZjE3LTY4Y2ItNDYxYi05MDI2LTZmY2ViZDE0YWI0MtgCBOACAQ&sid=6ea003afea9a4b3960a3dfda6a00beb4&dist=0&group_adults=2&keep_landing=1&sb_price_type=total&type=total&">
                    <img className='b-1' src="https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg" alt="File:Booking.com logo.svg" height="20" width="119" />
                    <img className='b-2' src="https://www.vectorlogo.zone/logos/booking/booking-icon.svg" width="25px" height="25px" alt="" />
                </a>

                <a class="kandyHotels" target="_blank" href="https://delma-mount-view-hedeniya.kandy-hotels.com/en/">
                    <p className='b-1'>KANDY HOTELS</p>
                    <p className='b-2'>KH</p>
                </a>
            </div>

        </div>
    )
};

export default Social