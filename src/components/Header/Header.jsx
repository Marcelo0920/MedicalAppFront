import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { logout } from "../../actions/auth";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const Header = ({ onMenuClick, logout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked");
    logout();
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={onMenuClick}>
          ☰
        </button>
      </div>
      <div className="user-info">
        <span>Sylvia Johnston</span>
        <span className="user-role">Doctor</span>
        <div className="user-avatar-container" ref={dropdownRef}>
          <div
            className="user-avatar"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            role="button"
            tabIndex={0}
          >
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
              alt="User avatar"
            />
          </div>
          {isDropdownOpen && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <strong>Sylvia Johnston</strong>
                <span className="dropdown-email">sylvia.j@hospital.com</span>
              </div>
              <div className="dropdown-divider" />
              <button
                className="dropdown-item"
                onClick={() => console.log("Profile clicked")}
              >
                <span className="dropdown-icon">👤</span>
                Mi Perfil
              </button>
              <button
                className="dropdown-item"
                onClick={() => console.log("Settings clicked")}
              >
                <span className="dropdown-icon">⚙️</span>
                Configuración
              </button>
              <div className="dropdown-divider" />
              <button className="dropdown-item logout" onClick={handleLogout}>
                <span className="dropdown-icon">🚪</span>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({});

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logout })(Header);
