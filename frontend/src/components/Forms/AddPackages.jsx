import React, { useState, useEffect } from 'react';

function AddPackages({ onClose, onSave, packages }) {
    const [formData, setFormData] = useState({
        packageName: '',
        bedType: '',
        packagePrice: '',
    });
    const [error, setError] = useState(null);

    // Populate form data when editing an existing package
    useEffect(() => {
        if (packages) {
            setFormData({
                packageName: packages.packageName || '',
                bedType: packages.bedType || '',
                packagePrice: packages.packagePrice || '',
            });
        }
    }, [packages]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Basic input validation
        if (!formData.packageName || !formData.bedType || !formData.packagePrice) {
            setError("All fields are required.");
            return;
        }

        if (isNaN(formData.packagePrice)) {
            setError("Price must be a valid number.");
            return;
        }

        // Call the onSave function with the form data
        onSave({
            packageName: formData.packageName,
            bedType: formData.bedType,
            packagePrice: parseFloat(formData.packagePrice),
        });

        // Close the form after saving
        onClose();
    };

    return (
        <form className="p-3" onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row mb-3">
                <div className="form-group">
                    <h5 htmlFor="packageName">Package Name</h5>
                    <input
                        type="text"
                        id="packageName"
                        name="packageName"
                        className="form-control"
                        placeholder="Package Name"
                        value={formData.packageName}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="form-group">
                    <h5 htmlFor="bedType">Room Type</h5>
                    <input
                        type="text"
                        id="bedType"
                        name="bedType"
                        className="form-control"
                        placeholder="Room Type"
                        value={formData.bedType}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="form-group">
                    <h5 htmlFor="packagePrice">Price</h5>
                    <input
                        type="number"
                        id="packagePrice"
                        name="packagePrice"
                        className="form-control"
                        placeholder="Price"
                        value={formData.packagePrice}
                        onChange={handleChange}
                        required
                    />
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
                    {packages ? 'Update' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}

export default AddPackages;
