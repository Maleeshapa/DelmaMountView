import React, { useState } from 'react';
import { Bed } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import emailjs from 'emailjs-com'; // Import EmailJS

const CusBookingForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { startDate, endDate } = location.state || {};

    const [formData, setFormData] = useState({
        cusFullName: '',
        cusNIC: '',
        cusTP: '',
        cusEmail: '',
        cusAddress: '',
        cusCheckIn: startDate || '',
        cusCheckOut: endDate || '',
        numberOfPersons: 1,
        roomType: '',
        payMethod: 'Pending',
    });

    const [bookingSuccess, setBookingSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    // send email using EmailJS

    const serviceID = process.env.REACT_APP_YOUR_SERVICE_ID;
    const templateID = process.env.REACT_APP_YOUR_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_YOUR_PUBLIC_KEY;

    const sendConfirmationEmail = (formData) => {
        const templateParams = {
            cusFullName: formData.cusFullName,
            cusEmail: formData.cusEmail
        };

        
        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                console.error('FAILED...', err);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.BASE_URL}/booking`, formData);
            console.log('Booking created:', response.data);

            setBookingSuccess(true); // Set booking success to true
            
            // Call the email sending function
            sendConfirmationEmail(formData);

            navigate('/confirm', { state: { bookingDetails: response.data } });
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className="w-100 mx-auto mt-10 p-6 bg-white rounded-lg">
            <h2 className="caption">Delma Mount View Hotel</h2>
            
            {/* Show success message */}
            {bookingSuccess && (
                <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
                    Booking successful! We look forward to your stay.
                </div>
            )}

            <form className="space-y-4 p-4 max-w-md mx-auto" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cusFullName" className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        name="cusFullName"
                        id="cusFullName"
                        className="w-full p-2 border rounded"
                        value={formData.cusFullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cusNIC" className="block text-sm font-medium mb-1">NIC</label>
                    <input
                        type="text"
                        name="cusNIC"
                        id="cusNIC"
                        className="w-full p-2 border rounded"
                        value={formData.cusNIC}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cusTP" className="block text-sm font-medium mb-1">Telephone</label>
                    <input
                        type="tel"
                        name="cusTP"
                        id="cusTP"
                        className="w-full p-2 border rounded"
                        value={formData.cusTP}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cusEmail" className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="cusEmail"
                        id="cusEmail"
                        className="w-full p-2 border rounded"
                        value={formData.cusEmail}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cusAddress" className="block text-sm font-medium mb-1">Address</label>
                    <input
                        type="text"
                        name="cusAddress"
                        id="cusAddress"
                        className="w-full p-2 border rounded"
                        value={formData.cusAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cusCheckIn" className="block text-sm font-medium mb-1">Check-in Date</label>
                    <input
                        type="date"
                        name="cusCheckIn"
                        id="cusCheckIn"
                        className="w-full p-2 border rounded"
                        value={formData.cusCheckIn}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cusCheckOut" className="block text-sm font-medium mb-1">Check-out Date</label>
                    <input
                        type="date"
                        name="cusCheckOut"
                        id="cusCheckOut"
                        className="w-full p-2 border rounded"
                        value={formData.cusCheckOut}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="numberOfPersons" className="block text-sm font-medium mb-1">Number of Persons</label>
                    <input
                        type="number"
                        name="numberOfPersons"
                        id="numberOfPersons"
                        className="w-full p-2 border rounded"
                        value={formData.numberOfPersons}
                        onChange={handleInputChange}
                        min="1"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Room Type</label>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="roomType"
                                value="single"
                                checked={formData.roomType === 'single'}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <Bed className="h-4 w-4 mr-1" /> Single
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="roomType"
                                value="double"
                                checked={formData.roomType === 'double'}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <Bed className="h-4 w-4 mr-1" /> Double
                        </label>
                    </div>
                </div>
                <button type="submit" className="button w-100">Book Now</button>
            </form>
        </div>
    );
};

export default CusBookingForm;
