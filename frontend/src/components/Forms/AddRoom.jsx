import React, { useState, useEffect } from 'react';

function AddRoom({ onClose, onSave, room }) {
    const [formData, setFormData] = useState({
        roomNumber: '',
        roomType: '',
        price: '',
        roomCapacity: '',
        bedType: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (room) {
            setFormData({
                roomNumber: room.roomNumber || '',
                roomType: room.roomType || '',
                price: room.price || '',
                roomCapacity: room.roomCapacity || '',
                bedType: room.bedType || '',
            });
        }
    }, [room]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Basic input validation
        if (!formData.roomNumber || !formData.roomType || !formData.price || !formData.roomCapacity || !formData.bedType) {
            setError("All fields are required.");
            return;
        }

        if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            setError("Price must be a valid positive number.");
            return;
        }

        if (isNaN(formData.roomCapacity) || parseInt(formData.roomCapacity) <= 0) {
            setError("Room Capacity must be a valid positive number.");
            return;
        }

        // Call the onSave function with the form data
        onSave({
            roomNumber: formData.roomNumber,
            roomType: formData.roomType,
            price: parseFloat(formData.price),
            roomCapacity: parseInt(formData.roomCapacity),
            bedType: formData.bedType,
        });
    };

    return (
        <form className="p-3" onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="roomNumber">Room Number</label>
                        <input
                            type="text"
                            id="roomNumber"
                            name="roomNumber"
                            className="form-control"
                            placeholder="Room Number"
                            value={formData.roomNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="roomType">Room Type</label>
                        <input
                            type="text"
                            id="roomType"
                            name="roomType"
                            className="form-control"
                            placeholder="Room Type"
                            value={formData.roomType}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="price">Price Per Night</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-control"
                            placeholder="Price Per Night"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="roomCapacity">Room Capacity</label>
                        <input
                            type="number"
                            id="roomCapacity"
                            name="roomCapacity"
                            className="form-control"
                            placeholder="Room Capacity"
                            value={formData.roomCapacity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="bedType">Bed Type</label>
                        <input
                            type="text"
                            id="bedType"
                            name="bedType"
                            className="form-control"
                            placeholder="Bed Type"
                            value={formData.bedType}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
                <button
                    type="button"
                    className="btn btn-secondary mr-2"
                    onClick={onClose}
                >
                    Close
                </button>
                <button
                    type="submit"
                    className="btn btn-success"
                >
                    {room ? 'Update' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}

export default AddRoom;
