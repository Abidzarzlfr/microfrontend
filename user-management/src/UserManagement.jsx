import React, { useState } from "react";
import "./UserManagement.css";
import { Table } from "./components/Table.jsx";
import { Modal } from "./components/Modal.jsx";
import Pagination from "./components/Pagination.jsx";
import data from "./Assets/data";

// Integration map
const ViewPeta = React.lazy(() => import("map/ViewPeta"));

function UserManagement() {
  const [searchInput, setSearchInput] = useState("");
  const [rows, setRows] = useState(data);
  const [filteredRows, setFilteredRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Integration Map
  const [showMap, setShowMap] = useState(false);

  const openMap = () => {
    console.log("clicked");
    if (showMap) {
      setShowMap(false);
    } else {
      setShowMap(true);
    }
  };
  //
  const handleSearchChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);

    const filtered = rows.filter((row) =>
      row.name.toLowerCase().includes(inputValue)
    );

    setFilteredRows(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleRows = filteredRows.slice(startIndex, startIndex + itemsPerPage);

  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    const updatedRows = rows.filter((_, idx) => idx !== targetIndex);
    setRows(updatedRows);
    updateVisibleRowsAndPages(updatedRows);
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    if (rowToEdit === null) {
      setRows([...rows, newRow]);
    } else {
      const updatedRows = rows.map((currRow, idx) =>
        idx !== rowToEdit ? currRow : newRow
      );
      setRows(updatedRows);
      updateVisibleRowsAndPages(updatedRows);
    }
  };

  const updateVisibleRowsAndPages = (updatedRows) => {
    const filtered = updatedRows.filter((row) =>
      row.name.toLowerCase().includes(searchInput)
    );
    setFilteredRows(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="w-full h-full">
      {!showMap ? (
        <div>
          <div className="absolute right-0 top-0 mt-5 mr-5 space-y-2">
            <button
              onClick={openMap}
              className="bg-blue-800 text-white p-2 rounded m-1 mr-1"
            >
              Map
            </button>
          </div>
          <div className="UserManagement">
            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Cari berdasarkan nama..."
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
            {/* Table */}
            <Table
              rows={visibleRows}
              deleteRow={handleDeleteRow}
              editRow={handleEditRow}
            />
            {/* Pagination  */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            {/* Button Add */}
            <button onClick={() => setModalOpen(true)} className="btn">
              Add
            </button>
            {/* Modal Add */}
            {modalOpen && (
              <Modal
                closeModal={() => {
                  setModalOpen(false);
                  setRowToEdit(null);
                }}
                onSubmit={handleSubmit}
                defaultValue={rowToEdit !== null ? rows[rowToEdit] : null}
              />
            )}
          </div>
        </div>
      ) : (
      <div>
        <React.Suspense fallback="Loading...">
          <ViewPeta />
        </React.Suspense>
      </div>
      )}
    </div>
  );
}

export default UserManagement;
