import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
const Footer = () => {
  return (
    <footer className=" bg-slate-700 px-4 sm:px-6 lg:px-8">
    <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 lg:p-16">
      <div>
        <img src={logo} alt="UMAT Logo" className="h-8" />
        <p className="text-base text-gray-300 mt-2">
          UMAT is a leading online platform for learning and mastering the UMAT
          exam. We provide comprehensive courses, practice tests, and expert
          guidance to help students succeed.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white uppercase">Quick Links</h3>
        <ul className="mt-4 space-y-2">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white transition"> 
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-300 hover:text-white transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-300 hover:text-white transition">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
     <div>
        <h3 className="text-xl font-bold text-white uppercase">Location</h3>
        <ul className="mt-4 space-y-2 text-white">
          <li>
              University of Mines, Tarkwa
          </li>
          <li>
           Western Region, Ghana
          </li>
        </ul>
      </div>
    </div>
    <hr className="text-white"/>
    <p className="text-center text-white p-6">All rights reserved &copy; 2026</p>
    </footer>
  );
};

export default Footer;
