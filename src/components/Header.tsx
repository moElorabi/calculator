import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "./common";

function PrimarySearchAppBar() {
  const navigate = useNavigate();

  const [searchWord, setSearchWord] = useState<String>("");

  const redirect = () => {
    navigate("/");
  };

  const handelSearchWord = () => {
    !searchWord ? navigate("/") : navigate(`/${searchWord}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={redirect}
          >
            MOVIE THEATER
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
            />
          </Search>
          <Button onClick={handelSearchWord} variant="contained">
            Search
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default PrimarySearchAppBar;
