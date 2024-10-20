import { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import Table from '../../components/Table';
import AddUsers from '../../components/Forms/AddUsers';
import config from '../../config';

function Users() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const columns = ["Id", "Name", "Type", "Telephone", "NIC", "Email", "Address", "Status"];
    const btnName = "Add New User";

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${config.BASE_URL}/user`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const users = await response.json();
            const formattedData = users.map(user => [
                user.userId,
                user.userName,
                user.userType,
                user.userTP,
                user.userNIC,
                user.userEmail,
                user.userAddress,
                user.userStatus,
            ]);
            setData(formattedData);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (rowIndex) => {
        const selectedUserData = data[rowIndex];
        setSelectedUser({
            userId: selectedUserData[0],
            userName: selectedUserData[1],
            userType: selectedUserData[2],
            userTP: selectedUserData[3],
            userNIC: selectedUserData[4],
            userEmail: selectedUserData[5],
            userAddress: selectedUserData[6],
        });
        setModalOpen(true);
    };

    const handleDelete = async (rowIndex) => {
        const userId = data[rowIndex][0];
        try {
            const response = await fetch(`${config.BASE_URL}/user/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setData(prevData => prevData.filter((_, index) => index !== rowIndex));
            console.log(`User with ID ${userId} deleted successfully`);
        } catch (err) {
            console.error('Error deleting user:', err);
            setError(err.message);
        }
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {
        setSelectedUser(null);
        setModalOpen(false);
    };

    const handleSave = async (formData) => {
        const isEditing = Boolean(selectedUser);
        const url = isEditing
            ? `${config.BASE_URL}/user/${selectedUser.userId}`
            : `${config.BASE_URL}/user`;
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save user');
            }

            console.log('User saved successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error saving user:', error);
        } finally {
            handleCloseModal();
        }
    };

    return (
        <div className='d-flex'>
            <SideBar />
            <div className="flex-grow-1 p-3">
                <h2>Users</h2>
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
                                    <h5 className="modal-title">{selectedUser ? "Edit User" : "Add New User"}</h5>
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
                                    <AddUsers onClose={handleCloseModal} onSave={handleSave} user={selectedUser} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;
