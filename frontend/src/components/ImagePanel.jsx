import { useState } from "react";

function ImagePanel() {

    const [image, setImage] = useState(
        "https://via.placeholder.com/900x600"
    ); 

    const [title, setTitle] = useState("Card Title");
    const [description, setDescription] = useState("This is a card description.");

    const handleImageChange = (e) => setImage(e.target.value);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    return (
        <div className="container mt-4">
            <div className="card" style={{ width: "18rem" }}>
                <img src={image} className="card-img-top" alt="Card" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </div>

            <div className=" mt-3">
                <div className="form-group">
                    <label>Change Image URL:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={image}
                        onChange={handleImageChange}
                    />
                </div>

                <div className="form-group mt-2">
                    <label>Change Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>

                <div className="form-group mt-2">
                    <label>Change Description:</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>

            </div>
        </div>
    )
}

export default ImagePanel