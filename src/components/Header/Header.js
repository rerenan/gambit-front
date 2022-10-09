import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import Input from "@mui/material/Input";
import SearchIcon from '@mui/icons-material/Search';

export default function Header({ logged, user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  function renderButtons() {
    if (logged) {
      return (
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
                color: "white"
            }}
          >
            PROFILE
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                mr: 20,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 2,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={()=> navigate(`/${user.username}`)}>
              <Avatar src={user.profileImage}/> {user.username}
            </MenuItem>
            <Divider />
            <MenuItem onClick={()=> logout()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      );
    } else {
      return (
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={() => navigate("/login")}>
            LOG IN
          </Button>
          <Button variant="contained" onClick={() => navigate("/register")}>
            SIGN UP
          </Button>
        </Stack>
      );
    }
  }
  function logout(){
    localStorage.removeItem("authToken")
    window.location.reload();
  }

  return (
    <Container>
      <h1>Gambit</h1>
      <SearchBox>
      <SearchIcon sx={{
        color: "black",
        marginRight: 0.5
      }}/>
        <Input 
            className="input-text" 
            disableUnderline
        />
      </SearchBox>
      {renderButtons()}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  background-color: #434e62;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;

  h1 {
    font-size: 27px;
    font-weight: 700;
  }
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 611px;
  height: 40px;
  background-color: white;
  padding: 0px 10px;
  border-radius: 6px;
  position: relative;
  .input-text {
    
      width: 100%;
      height: 100%;
      font-size: 20px;
      margin-right: 0px;
      
    }
`