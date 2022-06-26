import React from 'react';

const Navbar = () => {
  return (
      <div>
        <div className="p-3 d-flex align-items-center">
              <div className="search-bar d-flex align-items-center border">
                <i className="bi bi-search ms-3"></i>
                <input class="form-control bg-transparent me-2 border-0" type="search" placeholder="Search" aria-label="Search" />
              </div>
        </div>
      </div>
  )
}

export default Navbar