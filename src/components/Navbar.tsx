import React from "react";
import { Link } from "react-router-dom";
import logoNavBar from "../assets/navbarbeer.png"; 

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to="/">
        <img src={logoNavBar} alt="LogoNavBar" />
      </Link>
    </nav>
  );
};

export default Navbar;