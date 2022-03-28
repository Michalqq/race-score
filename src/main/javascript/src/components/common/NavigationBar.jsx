import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkReferee } from "../utils/fetchUtils";
import Card from "react-bootstrap/Card";

export const NavigationBar = () => {
  const [referee, setReferee] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  let username = sessionStorage.getItem("username");

  useEffect(
    () => {
      if (location.state?.eventId !== undefined)
        checkReferee(location.state?.eventId, setReferee);
    },
    [location.state?.eventId],
    username
  );

  return (
    <Navbar bg="primary gradient" expand="lg">
      <Container>
        <Navbar.Brand href="/">Wyniki motorsportowe on-line</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Lista wydarzeń</Nav.Link>

            {referee && location.state?.eventId !== undefined && (
              <NavDropdown title="Administrator" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() =>
                    navigate(`add_score`, {
                      state: { eventId: location.state.eventId },
                    })
                  }
                >
                  Dodaj wyniki
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() =>
                    navigate(`add_penalty`, {
                      state: { eventId: location.state.eventId },
                    })
                  }
                >
                  Dodaj kary
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() =>
                    navigate(`drivers`, {
                      state: { eventId: location.state.eventId },
                    })
                  }
                >
                  Lista startowa
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            {sessionStorage.getItem("username") === null && (
              <>
                <Nav.Link href="/login">Zaloguj</Nav.Link>
                <Nav.Link href="/register">Rejestracja</Nav.Link>
              </>
            )}
            {sessionStorage.getItem("username") !== null && (
              <>
                <Navbar.Brand
                  className="mx-5"
                  href="/"
                >{`Użytkownik: ${sessionStorage.getItem(
                  "username"
                )}`}</Navbar.Brand>

                <Nav.Link
                  onClick={() => {
                    sessionStorage.removeItem("username");
                    window.location.href = "/";
                  }}
                >
                  Wyloguj
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export const Footer = () => {
  const [referee, setReferee] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  let username = sessionStorage.getItem("username");

  useEffect(
    () => {
      if (location.state?.eventId !== undefined)
        checkReferee(location.state?.eventId, setReferee);
    },
    [location.state?.eventId],
    username
  );

  return (
    <div className="fixed-bottom dark">
      <Card className="">
        <Card.Footer className="bg-dark text-white text-start py-0">
          <div className="row" style={{ fontSize: "14px" }}>
            <div className="col-lg-2 text-end"></div>
            <div className="col-lg-8 text-white text-center">
              Potrzebujesz wyniki na własną imprezę? Masz pytania, uwagi lub
              propozycje? Znalazłeś błąd? &nbsp;
              <Link to="message">Wyślij wiadomość</Link>
            </div>
            <div className="col-lg-2 text-end">Wszystkie prawa zastrzeżone</div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};
