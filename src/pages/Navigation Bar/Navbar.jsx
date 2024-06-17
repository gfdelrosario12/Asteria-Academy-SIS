"use client";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import React, { useState } from "react";
import "../Navigation Bar/Navbar.css";

function Navbar() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className="navbar navbar-light bg-light p-2 mb-3">
      <div className="container-fluid">
        <Link to="/">
          <img src={logo} className="logo" alt="logo" width={150} height={100} />
        </Link>
        <form className="nav-items d-flex flex-row flex-wrap">
          <div
            className="dropdown"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <p className="nav-link m-4">About</p>
            <ul className={`dropdown-menu text-center ${aboutOpen ? "show" : ""}`}>
              <li>
                <Link to="/about/seal" className="dropdown-item">
                  School Seal
                </Link>
              </li>
              <li>
                <Link to="/about/vission-mission" className="dropdown-item">
                  Vision and Mission
                </Link>
              </li>
              <li>
                <Link to="/about/developers" className="dropdown-item">
                  Asteria Administration
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/contact" className="nav-link m-4">
            Contact Us
          </Link>
          <div className="m-3">
            <button
              className="btn portal"
            >
              SIS Portal
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;