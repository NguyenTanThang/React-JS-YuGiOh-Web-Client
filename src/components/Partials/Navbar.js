
import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import {Link} from "react-router-dom";

const Navigator = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="dark" dark>
        <Container>
        <Link className="navbar-brand mr-auto" to="/">Yu-Gi-Oh</Link>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link className="nav-link" to="/">Monster Cards</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/spell-cards">Spell Cards</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/trap-cards">Trap Cards</Link>
            </NavItem>
            <NavItem>
              <NavLink target="_blank" href="https://github.com/NguyenTanThang/React-JS-YuGiOh-Web-Client">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigator;