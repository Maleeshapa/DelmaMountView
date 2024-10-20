import { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import Table from '../../components/Table';
import AddRoom from '../../components/Forms/AddRoom';
import config from '../../config';

function Rooms() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const columns = ["Room ID", "Room Number", "Room Type", "Bed Type", "Room Capacity", "Price Per Night"];
    const btnName = "Add New Room";

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/rooms`);
            if (!response.ok) {
                throw new Error('Failed to fetch rooms');
            }
            const rooms = await response.json();
            const formattedData = rooms.map(room => [
                room.roomId,
                room.roomNumber,
                room.roomType,
                room.bedType,
                room.roomCapacity,
                room.price,
            ]);
            setData(formattedData);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const handleDelete = async (rowIndex) => {
        try {
            const roomId = data[rowIndex][0];
            const response = await fetch(`${config.BASE_URL}/rooms/${roomId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete room');
            }

            setData(prevData => prevData.filter((_, index) => index !== rowIndex));
            fetchRooms();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (rowIndex) => {
        const selectedRoomData = data[rowIndex];
        setSelectedRoom({
            roomId: selectedRoomData[0],
            roomNumber: selectedRoomData[1],
            roomType: selectedRoomData[2],
            bedType: selectedRoomData[3],
            roomCapacity: selectedRoomData[4],
            price: selectedRoomData[5],
        });
        setModalOpen(true);
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {
        setSelectedRoom(null);
        setModalOpen(false);
    };

    const handleSave = async (formData) => {
        try {
            let url = `${config.BASE_URL}/rooms`;
            let method = 'POST';

            // If editing, update 
            if (selectedRoom) {
                url = `${config.BASE_URL}/rooms/${selectedRoom.roomId}`;
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
                console.log('Room saved successfully');
                fetchRooms();
            } else {
                console.error('Error saving room');
            }
        } catch (error) {
            console.error('Error saving room:', error);
        } finally {
            setModalOpen(false);
        }
    };

    return (
        <div className="d-flex">
            <SideBar />
            <div className="flex-grow-1 p-3">
                <h2>Rooms</h2>
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
                    <div
                        className="modal d-block"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    >
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header bg-success text-white">
                                    <h5 className="modal-title">{selectedRoom ? 'Edit Room' : 'Add New Room'}</h5>
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={handleCloseModal}
                                        style={{
                                            position: "absolute",
                                            top: "10px",
                                            right: "10px",
                                            fontSize: "1.5rem",
                                            background: "none",
                                            border: "none",
                                            color: "white",
                                            outline: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <AddRoom
                                        onClose={handleCloseModal}
                                        onSave={handleSave}
                                        room={selectedRoom}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Rooms;
