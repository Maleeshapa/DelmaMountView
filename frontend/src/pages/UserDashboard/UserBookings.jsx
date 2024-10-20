import { useState, useEffect } from 'react'
import SidebarUser from '../../components/SidebarUser/SidebarUser';
import Table from '../../components/Table'
import BookingForm from '../../components/Forms/BookingForm';
import config from '../../config';

function Bookings() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const columns = [
        'ID',
        'Name',
        'Mobile Number',
        'Email',
        'Address',
        'NIC',
        'Check In',
        'Check Out',
        'Persons',
        'Room Type',
        'Pay Method',
        'Pay Status',
        'Status',
    ];
    const btnName = 'Booking Now';

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/booking`);
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const bookings = await response.json();
            const formattedData = bookings.map((booking) => [
                booking.bookingId,
                booking.cusFullName,
                booking.cusTP,
                booking.cusEmail,
                booking.cusAddress,
                booking.cusNIC,
                booking.cusCheckIn,
                booking.cusCheckOut,
                booking.numberOfPersons,
                booking.roomType,
                booking.payMethod,
                <select
                    className="form-control"
                    key={`payStatus-${booking.bookingId}`}
                    value={booking.payStatus}
                    onChange={(e) =>
                        handleStatusChange(booking.bookingId, e.target.value)
                    }
                >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Pending">Pending</option>
                </select>,
                booking.payStatus,
            ]);
            setData(formattedData);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`${config.BASE_URL}/booking/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ payStatus: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            setData((prevData) =>
                prevData.map((item) => {
                    if (item[0] === id) {
                        return [
                            item[0],
                            item[1],
                            item[2],
                            item[3],
                            item[4],
                            item[5],
                            item[6],
                            item[7],
                            item[8],
                            item[9],
                            item[10],
                            <select
                                key={`payStatus-${id}`}
                                value={newStatus}
                                onChange={(e) => handleStatusChange(id, e.target.value)}
                                className="form-control"
                            >
                                <option value="Paid">Paid</option>
                                <option value="Unpaid">Unpaid</option>
                                <option value="Pending">Pending</option>
                            </select>,
                            item[12],
                        ];
                    }
                    return item;
                })
            );
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };


    const handleEdit = (rowIndex) => {
        const selectedBookingData = data[rowIndex];

        setSelectedBooking({
            bookingId: selectedBookingData[0],
            cusFullName: selectedBookingData[1],
            cusTP: selectedBookingData[2],
            cusEmail: selectedBookingData[3],
            cusAddress: selectedBookingData[4],
            cusNIC: selectedBookingData[5],
            cusCheckIn: selectedBookingData[6],
            cusCheckOut: selectedBookingData[7],
            numberOfPersons: selectedBookingData[8],
            roomType: selectedBookingData[9],
            payMethod: selectedBookingData[10],
        });

        setModalOpen(true);
    };

    const handleDelete = async (rowIndex) => {
        try {
            const bookingId = data[rowIndex][0];

            const response = await fetch(`${config.BASE_URL}/booking/${bookingId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete booking: ${errorText}`);
            }

            setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
        } catch (err) {
            console.error('Error deleting booking:', err);
            setError(err.message);
        }
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {
        setSelectedBooking(null);
        setModalOpen(false);
    };

    const handleSave = async (formData) => {
        try {
            let url = `${config.BASE_URL}/booking`;
            let method = 'POST';

            // If editing, update the booking
            if (selectedBooking) {
                url = `${config.BASE_URL}/booking/${selectedBooking.bookingId}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Booking saved successfully');
                fetchBooking();
            } else {
                console.error('Error saving booking');
            }
        } catch (error) {
            console.error('Error saving booking:', error);
        } finally {
            setModalOpen(false);
        }
    };
    return (
        <div className='d-flex'>
            <SidebarUser />
            <div className="flex-grow-1 p-5" style={{ maxWidth: '100%', overflow: 'auto' }}>
                <h2>Bookings</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <Table
                        data={data}
                        columns={columns}
                        btnName={btnName}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onAdd={handleOpenModal}
                    />
                )}
                {isModalOpen && (
                    <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header bg-success text-white">
                                    <h5 className="modal-title">Booking Details</h5>
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={handleCloseModal}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            fontSize: '1.5rem',
                                            background: 'none',
                                            border: 'none',
                                            color: 'white',
                                            outline: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <BookingForm onClose={handleCloseModal} onSave={handleSave} booking={selectedBooking} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Bookings