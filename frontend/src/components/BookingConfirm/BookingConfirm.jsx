import React from 'react';
import { Link } from 'react-router-dom';

const BookingConfiram = () => {
  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header bg-success text-white">
          <h1>Booking Placed Sucessfully!</h1>
        </div>
        <div className="card-body">
          <h5 className="card-title">Thank you for your booking.</h5>

          <div className="next-steps mt-4">
            <p>An email confirmation has been sent to your email.</p>
            <p>For any inquiries, feel free to contact us.</p>
          </div>

          <div className="actions mt-4">
            <Link to="/" className="btn btn-primary m-2">Return to Homepage</Link>
          </div>
        </div>
        <div className="card-footer text-muted">
          Thank you for choosing our hotel!
        </div>
      </div>
    </div>
  );
};

export default BookingConfiram;
