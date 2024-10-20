import { useState } from "react";
import { useLocation, Link,useNavigate  } from "react-router-dom";
import "./SideBar.css";
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
            <Link to="/dashboard">
              Delma Mount View
            </Link>
          </div>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link
              to="/dashboard"
              className={`sidebar-link ${isActive("/dashboard") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/bookings"
              className={`sidebar-link ${isActive("/bookings") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faBookBookmark} />
              <span>Booking </span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/bookingCalendar"
              className={`sidebar-link ${isActive("/bookingCalendar") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faCalendarDays} />
              <span>Booking Calendar</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/rooms"
              className={`sidebar-link ${isActive("/rooms") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faBed} />
              <span>Rooms</span>
            </Link>
          </li>

          
          <li className="sidebar-item">
            <Link
              to="/Packages"
              className={`sidebar-link ${isActive("/Packages") ? "active" : ""}`}
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
          </li> */}
          <li className="sidebar-item">
            <Link
              to="/users"
              className={`sidebar-link ${isActive("/users") ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Add Users</span>
            </Link>
          </li>
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
