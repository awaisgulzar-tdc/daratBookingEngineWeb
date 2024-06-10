import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { css } from "@emotion/react";

const textFieldStyles = css`
  width: 100%;
  max-width: 500px;
  border-radius: 25px;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  & .MuiOutlinedInput-root {
    border-radius: 25px;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: transparent;
  }
`;

const searchIconStyles = css`
  color: gray;
`;

const SearchTextField = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleKeyPress = (event) => {
    if (searchValue !== "") {
      if (event.key === "Enter") {
        router.push(`/search?q=${searchValue}`);
      }
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <TextField
        sx={textFieldStyles} // Apply custom styles directly to the TextField component
        variant="outlined"
        placeholder="Search"
        value={searchValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon css={searchIconStyles} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchTextField;
