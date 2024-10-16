import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSignInAlt, faSignOutAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Navbar bg="light" expand="lg" fixed="top" className={styles.NavBar}>
      <NavLink to="/">
        <Navbar.Brand>
          <img src={logo} alt="logo" height="70" className={styles.Logo} />
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto text-right">
          <NavLink exact to="/" className={styles.NavLink}>
            <FontAwesomeIcon icon={faHome} className={styles.icon} /> Home
          </NavLink>
          {currentUser ? (
            <>
              <NavLink to="/profile" className={styles.NavLink}>
                {currentUser.username}
              </NavLink>
              <NavLink to="/logout" className={styles.NavLink}>
                <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon} /> Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/signin" className={styles.NavLink}>
                <FontAwesomeIcon icon={faSignInAlt} className={styles.icon} /> Sign in
              </NavLink>
              <NavLink to="/signup" className={styles.NavLink}>
                <FontAwesomeIcon icon={faUserPlus} className={styles.icon} /> Sign up
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;