
import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import {Link} from "react-router-dom";

const Navigator = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const closeTheNav = () => {
    setCollapsed(true);
  }

  const displayNavItems = () => {
    const userID = localStorage.getItem("userID");
    if (userID) {
      return (
        <>
          <NavItem>
            <Link className="nav-link" to="/profile" onClick={e => {
              closeTheNav()
            }}>Profile</Link>
            <Link className="nav-link text-danger" to="/users/logout" onClick={e => {
              closeTheNav()
            }}>Logout</Link>
          </NavItem>
        </>
      )
    } else {
      return (
        <>
          <NavItem>
              <Link className="nav-link" to="/users/login" onClick={e => {
                closeTheNav()
              }}>Login</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/users/signup" onClick={e => {
                closeTheNav()
              }}>Sign Up</Link>
            </NavItem>
        </>
      )
    }
  }

  return (
    <div>
      <Navbar color="dark" dark>
        <Container>
        <Link className="navbar-brand mr-auto" to="/">Yu-Gi-Oh</Link>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link className="nav-link" to="/" onClick={e => {
                closeTheNav()
              }}>Monster Cards</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/spell-cards" onClick={e => {
                closeTheNav()
              }}>Spell Cards</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/trap-cards" onClick={e => {
                closeTheNav()
              }}>Trap Cards</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/blogs/all" onClick={e => {
                closeTheNav()
              }}>Blogs</Link>
            </NavItem>
            {displayNavItems()}
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigator;