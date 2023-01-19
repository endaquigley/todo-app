import { useRef, useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import useStore from "../hooks/useStore";

function CreateItem() {
  const inputRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("");
  const addItem = useStore((state) => state.addItem);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleClick = () => {
    inputRef.current?.focus();
    addItem(title);
    setTitle("");
  };

  return (
    <TextField
      inputRef={inputRef}
      fullWidth
      label="New item"
      variant="outlined"
      value={title}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="contained"
              onClick={handleClick}
              disabled={title.length === 0}
            >
              Add
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default CreateItem;
