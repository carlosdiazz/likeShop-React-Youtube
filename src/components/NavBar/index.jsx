import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
//Cmabiar para el logo
import { ShoppingCart, ExitToApp } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

import "./style.css";

const NavBar = ({ basketItems, totalCost, handleLogout}) => {
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className="custom-navbar">
        <Container>
          <Toolbar>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className="custom-title"
              color="inherit"
            >
              <img
                src="https://github.com/carlosdiazz/proyecto-likeshop/blob/main/fronted/src/assets/img/logo.png?raw=true"
                alt="Like Shop"
                height="10x"
                width="10px"
                className="logo"
              />



            </Typography>
            {location.pathname === "/basket" ? (
              <div className="basket-wrapper">
                <h2>
                  Costo Total: <strong>{totalCost}</strong>
                </h2>
                
              </div>
            ) : (
              <div className="basket-wrapper">
                <IconButton
                  component={Link}
                  to="/basket"
                  aria-label="Show basket contents"
                  color="inherit"
                >
                  <Badge badgeContent={basketItems} color="secondary">
                    <ShoppingCart className="custom-basket" />
                  </Badge>
                </IconButton>

                <div >
                <IconButton
                  onClick={handleLogout}
                >                 
                  <ExitToApp className="custom-basket" />         
                </IconButton>
              </div>
              </div>

              

            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
