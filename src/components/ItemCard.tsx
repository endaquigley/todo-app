import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import ReplayIcon from "@mui/icons-material/Replay";

import useStore from "../hooks/useStore";
import { Item, ItemStatus } from "../types";

type Props = Item;

function ItemCard({ id, title, status }: Props) {
  const removeItem = useStore((state) => state.removeItem);
  const toggleItemStatus = useStore((state) => state.toggleItemStatus);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto auto" }}>
      <span>{title}</span>

      <IconButton
        aria-label="Toggle status"
        onClick={() => toggleItemStatus(id)}
      >
        {status === ItemStatus.Incomplete ? <DoneIcon /> : <ReplayIcon />}
      </IconButton>

      <IconButton aria-label="Remove item" onClick={() => removeItem(id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export default ItemCard;
