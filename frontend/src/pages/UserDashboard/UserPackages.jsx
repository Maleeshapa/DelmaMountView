import { useEffect, useState } from 'react';
import SidebarUser from '../../components/SidebarUser/SidebarUser';
import Table from '../../components/Table';
import AddPackages from '../../components/Forms/AddPackages';
import config from '../../config';
import axios from 'axios';

function Packages() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const columns = ["Package ID", "Package Name", "Bed Type", "Price"];
    const btnName = "Add New Package";

    useEffect(() => {
        fetchPackage();
    }, []);

    const fetchPackage = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/packages`);
            if (!response.ok) {
                throw new Error('Failed to fetch Package');
            }
            const packages = await response.json();
            const formattedData = packages.map(packages => [
                packages.packageId,
                packages.packageName,
                packages.bedType,
                packages.packagePrice,
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
            const packageId = data[rowIndex][0];
            const response = await fetch(`${config.BASE_URL}/packages/${packageId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete package');
            }
            setData(prevData => prevData.filter((_, index) => index !== rowIndex));
            console.log(`Package with ID ${packageId} deleted successfully`);
            fetchPackage();
        } catch (err) {
            console.error('Error deleting package:', err);
            setError(err.message);
        }
    };

    const handleEdit = (rowIndex) => {
        const selectedPackageData = data[rowIndex];
        setSelectedPackage({
            packageId: selectedPackageData[0],
            packageName: selectedPackageData[1],
            bedType: selectedPackageData[2],
            packagePrice: selectedPackageData[3],
        });
        setModalOpen(true);
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {
        setSelectedPackage(null);
        setModalOpen(false);
    }

    const handleSave = async (formData) => {
        try {
            let url = `${config.BASE_URL}/packages`;
            let method = 'POST';

            // If editing, update the booking
            if (selectedPackage) {
                url = `${config.BASE_URL}/packages/${selectedPackage.packageId}`;
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
                console.log('Package saved successfully');
                fetchPackage();
            } else {
                console.error('Error saving package');
            }
        } catch (error) {
            console.error('Error saving package:', error);
        } finally {
            setModalOpen(false);
        }
    };

    return (
        <div className='d-flex'>
            <SidebarUser />
            <div className="flex-grow-1 p-3">
                <h2>Packages</h2>
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
                                    <h5 className="modal-title">Add New Package</h5>
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
                                    <AddPackages onClose={handleCloseModal} onSave={handleSave} packages={selectedPackage} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Packages;
