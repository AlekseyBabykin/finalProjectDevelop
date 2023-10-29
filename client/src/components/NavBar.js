import React, { useContext } from "react";
import { Context } from "..";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("userInfo");
    navigate(LOGIN_ROUTE);
  };
  console.log();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white", fontSize: 22 }} to={SHOP_ROUTE}>
          <b>Buy a device</b>
        </NavLink>
        {user.isAuth ? (
          <Nav className="ms-auto" style={{ color: "white" }}>
            {localStorage.getItem("userInfo") &&
              JSON.parse(localStorage.getItem("userInfo")).role != "USER" && (
                <Button
                  style={{ fontSize: 20 }}
                  variant={"outline-light"}
                  onClick={() => navigate(ADMIN_ROUTE)}
                >
                  Admin display
                </Button>
              )}
            <Button
              className="ms-2"
              style={{ fontSize: 20 }}
              variant={"outline-light"}
              onClick={() => navigate(BASKET_ROUTE)}
            >
              Basket
            </Button>
            <Button
              className="ms-2"
              style={{ fontSize: 20 }}
              variant={"outline-light"}
              onClick={() => logOut()}
            >
              Exit
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Login
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
