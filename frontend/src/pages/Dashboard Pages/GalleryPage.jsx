import React, { useState } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import ImagePanel from '../../components/ImagePanel';

function GalleryPage() {
    const [images, setImages] = useState([{}, {}, {}]);

    const handleSave = () => {
        console.log('Save button clicked');
    };

    const handleReset = () => {
        console.log('Reset button clicked');
        setImages([{}, {}, {}]);
    };

    return (
        <div className="d-flex">
            <SideBar />
            <div className="flex-grow-1 p-4">
                <h2>Gallery</h2>
                <div className="row">
                    {images.map((image, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                            <ImagePanel />
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-primary me-2" onClick={handleSave}>
                        Save
                    </button>
                    <button className="btn btn-secondary" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GalleryPage;
