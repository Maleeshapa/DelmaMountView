import React, { useState, useEffect } from 'react';

function BookingForm({ onSave, onClose, booking }) {
    const [formData, setFormData] = useState({
        cusFullName: '',
        cusNIC: '',
        cusTP: '',
        cusEmail: '',
        cusAddress: '',
        cusCheckIn: '',
        cusCheckOut: '',
        numberOfPersons: 1,
        roomType: 'Select The Room Type',
        payMethod: 'Select The Payment Method',
    });

    const [errors, setErrors] = useState({});

    // Use effect to update form data when editing a booking
    useEffect(() => {
        if (booking) {
            setFormData({
                cusFullName: booking.cusFullName || '',
                cusNIC: booking.cusNIC || '',
                cusTP: booking.cusTP || '',
                cusEmail: booking.cusEmail || '',
                cusAddress: booking.cusAddress || '',
                cusCheckIn: booking.cusCheckIn || '',
                cusCheckOut: booking.cusCheckOut || '',
                numberOfPersons: booking.numberOfPersons || 1,
                roomType: booking.roomType || 'Select The Room Type',
                payMethod: booking.payMethod || 'Select The Payment Method',
            });
        }
    }, [booking]);  // Run this when `booking` prop changes

    // Regex for phone number (example: must be 10 digits)
    const phoneRegex = /^[0-9]{10}$/;

    const validate = () => {
        const newErrors = {};
        if (!phoneRegex.test(formData.cusTP)) {
            newErrors.cusTP = 'Phone number must be 10 digits';
        }
        // You can add more validation rules here (e.g., email, NIC, etc.)
        if (!formData.cusFullName.trim()) {
            newErrors.cusFullName = 'Full Name is required';
        }
        if (!formData.cusNIC.trim()) {
            newErrors.cusNIC = 'NIC is required';
        }
        if (!formData.cusEmail.trim()) {
            newErrors.cusEmail = 'Email is required';
        }
        if (!formData.roomType || formData.roomType === 'Select The Room Type') {
            newErrors.roomType = 'Please select a room type';
        }
        if (!formData.payMethod || formData.payMethod === 'Select The Payment Method') {
            newErrors.payMethod = 'Please select a payment method';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className='p-3'>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <h5>Full Name:</h5>
                    <input
                        className='form-control'
                        type="text"
                        name="cusFullName"
                        value={formData.cusFullName}
                        onChange={handleChange}
                        required
                    />
                    {errors.cusFullName && <small className="text-danger">{errors.cusFullName}</small>}
                </div>
                <div className='col-md-6'>
                    <h5>NIC:</h5>
                    <input
                        className='form-control'
                        type="text"
                        name="cusNIC"
                        value={formData.cusNIC}
                        onChange={handleChange}
                        required
                    />
                    {errors.cusNIC && <small className="text-danger">{errors.cusNIC}</small>}
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <h5>Telephone:</h5>
                    <input
                        className='form-control'
                        type="text"
                        name="cusTP"
                        value={formData.cusTP}
                        onChange={handleChange}
                        required
                    />
                    {errors.cusTP && <small className="text-danger">{errors.cusTP}</small>}
                </div>
                <div className='col-md-6'>
                    <h5>Email:</h5>
                    <input
                        className='form-control'
                        type="email"
                        name="cusEmail"
                        value={formData.cusEmail}
                        onChange={handleChange}
                        required
                    />
                    {errors.cusEmail && <small className="text-danger">{errors.cusEmail}</small>}
                </div>
            </div>
            <div className='row mb-3'>
                <div>
                    <h5>Address:</h5>
                    <input
                        className='form-control'
                        type="text"
                        name="cusAddress"
                        value={formData.cusAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <h5>Check-in Date:</h5>
                    <input
                        className='form-control'
                        type="date"
                        name="cusCheckIn"
                        value={formData.cusCheckIn}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='col-md-6'>
                    <h5>Check-out Date:</h5>
                    <input
                        className='form-control'
                        type="date"
                        name="cusCheckOut"
                        value={formData.cusCheckOut}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className='row mb-3'>
                <div className='col-md-6'>
                    <h5>Number of Persons:</h5>
                    <input
                        className='form-control'
                        type="number"
                        name="numberOfPersons"
                        value={formData.numberOfPersons}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='col-md-6'>
                    <h5>Room Type:</h5>
                    <select
                        className='form-control'
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                    >
                        <option value="selectRoomType">- Select The Room Type -</option>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="suite">Suite</option>
                    </select>
                    {errors.roomType && <small className="text-danger">{errors.roomType}</small>}
                </div>
            </div>

            <div className='row mb-3'>
                <div className='col-md-6'>
                    <h5>Payment Method:</h5>
                    <select
                        className='form-control'
                        name="payMethod"
                        value={formData.payMethod}
                        onChange={handleChange}
                    >
                        <option value="selectPaymentMethod">- Select The Payment Method -</option>
                        <option value="card">Card</option>
                        <option value="cash">Cash</option>
                    </select>
                    {errors.payMethod && <small className="text-danger">{errors.payMethod}</small>}
                </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
                <button type="button" className="btn btn-secondary mr-2" onClick={onClose}>
                    Close
                </button>
                <button type="submit" className="btn btn-success">
                    {booking ? 'Update' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}

export default BookingForm;
