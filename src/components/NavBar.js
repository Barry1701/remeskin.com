import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faHome,
  faPlusSquare,
  faStream,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const addPostIcon = (
    <NavLink to="/posts/create" className={styles.NavLink}>
      <FontAwesomeIcon icon={faPlusSquare} className={styles.icon} /> Add Post
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink to="/feed" className={styles.NavLink}>
        <FontAwesomeIcon icon={faStream} className={styles.icon} /> Feed
      </NavLink>
      <NavLink to="/liked" className={styles.NavLink}>
        <FontAwesomeIcon icon={faHeart} className={styles.icon} /> Liked
      </NavLink>
      <NavLink to="/profile" className={styles.NavLink}>
        <Avatar src={currentUser?.profile_image} height={40} text="Profile" />
      </NavLink>
      <NavLink to="/" className={styles.NavLink} onClick={handleSignOut}>
        <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon} /> Sign out
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink to="/signin" className={styles.NavLink}>
        <FontAwesomeIcon icon={faSignInAlt} className={styles.icon} /> Sign in
      </NavLink>
      <NavLink to="/signup" className={styles.NavLink}>
        <FontAwesomeIcon icon={faUserPlus} className={styles.icon} /> Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar bg="light" expand="lg" fixed="top" className={styles.NavBar}>
      <NavLink to="/">
        <Navbar.Brand>
          <img src={logo} alt="logo" height="70" className={styles.Logo} />
        </Navbar.Brand>
      </NavLink>
      {currentUser && addPostIcon}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto text-right">
          <NavLink exact to="/" className={styles.NavLink}>
            <FontAwesomeIcon icon={faHome} className={styles.icon} /> Home
          </NavLink>
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
