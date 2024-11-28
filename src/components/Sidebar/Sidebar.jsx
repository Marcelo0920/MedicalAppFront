import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: "🏠", text: "Inicio" },
    { path: "/pacientes", icon: "👥", text: "Pacientes" },
    { path: "/revision", icon: "📋", text: "Hacer Revisión" },
    { path: "/personal-medico", icon: "⚕️", text: "Personal Médico" },
  ];

  return (
    <div className={`sidebar ${!isOpen ? "hidden" : ""}`}>
      <div className="logo">Menu</div>
      <nav>
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.path === "/" ? (
                <a
                  href="#"
                  className={`nav-item ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="nav-text">{item.text}</span>
                </a>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-item ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="nav-text">{item.text}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
