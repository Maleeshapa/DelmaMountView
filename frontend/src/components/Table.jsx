import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";


const Table = ({ data, columns, onAdd, btnName, onEdit, onDelete }) => {
    const [tableData, setTableData] = useState(data);
    const [tableColumns, setTableColumns] = useState(columns);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setTableData(data);
    }, [data]);

    useEffect(() => {
        setTableColumns(columns);
    }, [columns]);

    const filteredData = tableData.filter((tableDatum) => {
        const query = searchQuery.toLowerCase();
        return tableDatum.some((item) => {
            return item != null && item.toString().toLowerCase().includes(query);
        });
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentItems = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container-fluid p-2">
            <div className="row mb-2">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div className="col-md-6 d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={onAdd}>
                        {btnName}
                    </button>
                </div>
            </div>

            <div className="mt-2">
                <div className="col-md-12">
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                                {tableColumns.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((datum, rowIndex) => (
                                <tr key={rowIndex}>
                                    {datum.map((item, colIndex) => (
                                        <td key={colIndex}>{item}</td>
                                    ))}
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm mr-3"
                                            onClick={() => onEdit(rowIndex)}
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(rowIndex)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row mt-2 justify-content-center">
                <div className="col-md-12">
                    <ul className="pagination justify-content-center custom-pagination">
                        {[...Array(totalPages)].map((_, index) => (
                            <li
                                key={index}
                                className={`page-item ${index + 1 === currentPage ? "active" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Table;
