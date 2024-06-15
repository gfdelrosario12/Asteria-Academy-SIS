"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.png";
import React, { useState } from "react";
import "../Navigation Bar/Navbar.css";

function Navbar() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [modalityOpen, setModalityOpen] = useState(false);
  const [educatorsOpen, setEducatorsOpen] = useState(false);

  return (
    <nav className="navbar navbar-light bg-light p-2">
      <div className="container-fluid">
        <Link href="/">
          <Image src={logo} className="logo" alt="logo" width={150} height={100} />
        </Link>
        <form className="nav-items d-flex flex-row flex-wrap">
          <div
            className="dropdown"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <p className="nav-link m-4">About</p>
            <ul className={`dropdown-menu ${aboutOpen ? "show" : ""}`}>
              <li>
                <Link href="/about/seal" className="dropdown-item">
                  School Seal
                </Link>
              </li>
              <li>
                <Link href="/about/vission-mission" className="dropdown-item">
                  Vision and Mission
                </Link>
              </li>
              <li>
                <Link href="/about/administration" className="dropdown-item">
                  Asteria Administration
                </Link>
              </li>
            </ul>
          </div>
          <Link href="/contact" className="nav-link m-4">
            Contact Us
          </Link>
          <div className="m-3">
            <button
              type="button"
              className="btn portal"
              data-bs-toggle="modal"
              data-bs-target="#portal"
            >
              Portal
            </button>
          </div>

          <div
            className="modal fade"
            id="portal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <Image src={logo} className="logo" alt="logo" width={150} height={100} />{" "}
                    <h1 className="p-2 blue-modal">Choose Your Platform</h1>
                    <div className="my-2">
                      <button className="btn portal modal-button-element">SIS</button>
                    </div>
                    <div className="my-2">
                      <button className="btn portal modal-button-element">LMS</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
