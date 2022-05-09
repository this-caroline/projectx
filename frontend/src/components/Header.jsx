import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/List">ProjectX</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink exact to="/List" className="nav-link" activeClassName="active">
              Home
            </NavLink>
            <NavLink
              exact
              to="/UpdateUser"
              className="nav-link"
              activeClassName="active"
            >
              Atualizar Perfil
            </NavLink>
            <NavLink
              exact
              to="/Logout"
              className="nav-link"
              activeClassName="active"
            >
              Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
