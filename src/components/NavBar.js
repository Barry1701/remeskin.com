import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import useNotificationSocket from "../hooks/useNotificationSocket";
import { removeTokenTimestamp } from "../utils/utils";
import Swal from "sweetalert2";
import Avatar from "./Avatar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const { notifications, clearNotifications } = useNotificationSocket();
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = notifications.length;

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();

      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been successfully logged out."
      }).then(() => {
        navigate("/signin");
      });
    } catch (err) {
      console.error(err);
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

  // Inbox / Outbox / New Message icons
  const inboxIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/inbox"
      onClick={clearNotifications}
    >
      <i className="fas fa-inbox"></i>
      Inbox
      {unreadCount > 0 && (
        <span className={styles.Badge}>{unreadCount}</span>
      )}
    </NavLink>
  );

  const outboxIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/outbox"
    >
      <i className="fas fa-paper-plane"></i>Outbox
    </NavLink>
  );

  const newMessageIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/messages/new"
    >
      <i className="fas fa-edit"></i>New Message
    </NavLink>
  );

  // Logged-in Icons
  const loggedInIcons = (
    <>
      {addPostIcon}
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
      {addProductIcon}
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

      {/* Dodajemy DM */}
      {inboxIcon}
      {outboxIcon}
      {newMessageIcon}
      <div className={styles.NotifWrapper}>
        <button
          className={styles.NotifButton}
          onClick={() => {
            setNotifOpen((o) => !o);
            if (!notifOpen) clearNotifications();
          }}
          aria-label="Notifications"
        >
          <i className="fas fa-bell"></i>
          {unreadCount > 0 && (
            <span className={styles.NotifBadge}>{unreadCount}</span>
          )}
        </button>

        {notifOpen && (
          <ul className={styles.NotifDropdown}>
            {notifications.length ? (
              notifications.map((n) => (
                <li key={n.id} className={styles.NotifItem}>
                  {n.message}
                </li>
              ))
            ) : (
              <li className={styles.NotifEmpty}>No new notifications</li>
            )}
          </ul>
        )}
      </div>

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
