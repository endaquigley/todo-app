import Container from "@mui/material/Container";

import CreateItem from "./CreateItem";
import ItemCard from "./ItemCard";
import useStore from "../hooks/useStore";
import { ItemStatus } from "../types";

function App() {
  const items = useStore((state) => state.items);

  const incompleteItems = items.filter(
    (item) => item.status === ItemStatus.Incomplete
  );

  const doneItems = items.filter((item) => item.status === ItemStatus.Done);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <CreateItem />

      {incompleteItems.length > 0 && (
        <h2>{`Incomplete (${incompleteItems.length})`}</h2>
      )}

      {incompleteItems.map((item) => (
        <ItemCard key={item.id} {...item} />
      ))}

      {doneItems.length > 0 && <h2>{`Done (${doneItems.length})`}</h2>}

      {doneItems.map((item) => (
        <ItemCard key={item.id} {...item} />
      ))}
    </Container>
  );
}

export default App;
