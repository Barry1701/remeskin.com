import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import Swal from "sweetalert2"; // Import SweetAlert
import Avatar from "./Avatar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      // Log the user out
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();

      // SweetAlert success notification
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been successfully logged out."
      }).then(() => {
        history.push("/signin"); // Redirect to sign-in page
      });
    } catch (err) {
      console.error(err);

      // SweetAlert error notification in case of logout failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again."
      });
    }
  };

  // Add Post Icon
  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="far fa-plus-square"></i>Add Post
    </NavLink>
  );

  // Add Product Icon
  const addProductIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/products/create"
      exact
    >
      <i className="fas fa-plus-circle"></i>Add Product
    </NavLink>
  );

  // Logged-in Icons
  const loggedInIcons = (
    <>
      {addPostIcon} {/* Add Post Icon */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
        exact
      >
        <i className="fas fa-home"></i>Home
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/products"
        exact
      >
        <i className="fas fa-box-open"></i>Products
      </NavLink>
      {addProductIcon} {/* Add Product Icon */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign Out
      </NavLink>
    </>
  );

  // Logged-out Icons
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        {/* Logo */}
        {currentUser ? (
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" className={styles.NavLogo} />
            </Navbar.Brand>
          </NavLink>
        ) : (
          <Navbar.Brand>
            <img src={logo} alt="logo" className={styles.NavLogo} />
          </Navbar.Brand>
        )}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <div className={styles.customBox}>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
