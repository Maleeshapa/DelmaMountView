import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../SideBar/SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTachometerAlt,
  faCalendarDays,
  faRightFromBracket,
  faUserPlus,
  faBed,
  faChartSimple,
  faImage,
  faBookBookmark,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ onLogout }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="wrapper">
      <aside id="sidebar" className={isExpanded ? "expand" : ""}>
        <div className="d-flex align-items-center mt-1">
          <button className="toggle-btn" onClick={toggleSidebar} type="button">
            <FontAwesomeIcon icon={faHome} />
          </button>
          <div className="sidebar-logo">
            <Link to="/dashboarduser">
              Delma Mount View
            </Link>
          </div>
        </div>
        <ul className="sidebar-nav">
          {/* <li className="sidebar-item">
            <Link
              to="/dashboard"
              className={`sidebar-link ${isActive("/dashboard") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span>Dashboard</span>
            </Link>
          </li> */}
          <li className="sidebar-item">
            <Link
              to="/bookingUser"
              className={`sidebar-link ${isActive("/bookingsUser") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faBookBookmark} />
              <span>Booking </span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/dashboardUser"
              className={`sidebar-link ${isActive("/bookingCalUser") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faCalendarDays} />
              <span>Booking Calendar</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/roomsUser"
              className={`sidebar-link ${isActive("/roomsUser") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faBed} />
              <span>Rooms</span>
            </Link>
          </li>

          
          <li className="sidebar-item">
            <Link
              to="/PackagesUser"
              className={`sidebar-link ${isActive("/PackagesUser") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faChartSimple} />
              <span>Packages</span>
            </Link>
          </li>
          {/* <li className="sidebar-item">
            <Link
              to="/GalleryPage"
              className={`sidebar-link ${isActive("/GalleryPage") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faImage} />
              <span>Gallery</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/users"
              className={`sidebar-link ${isActive("/users") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Add Users</span>
            </Link>
          </li> */}
        </ul>
        <div className="sidebar-footer mb-3">
          <Link to="/" className="sidebar-link" onClick={logout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
