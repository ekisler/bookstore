import React from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={handleClick}>Navegación</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem component={Link} to="/" onClick={handleClose}>
          Home
        </MenuItem>
        <MenuItem component={Link} to="/books" onClick={handleClose}>
          Libros
        </MenuItem>
        <MenuItem component={Link} to="/authorcreate" onClick={handleClose}>
          Crear Autores
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navigation;
