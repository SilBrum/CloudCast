import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer text-light py-4">
      <div className="container text-center">
        <p className="mb-2">© {new Date().getFullYear()} CloudCast. All rights reserved.</p>
        <div className="social-icons">
          <a href="#" className="text-light mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
