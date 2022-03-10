import "./item.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";
import ItemForm from "./ItemForm";
import { getList } from "../../data/lists";
import {
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
} from "../../data/items";

const Items = () => {
  const { list_id } = useParams();

  const [list, setList] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const list = await getList(list_id);
      const items = await getAllItems(list_id);
      setList(list);
      setItems(items || []);
    };
    fetchLists();
  }, [list_id]);

  const handleCreate = async (item) => {
    const newList = await createItem(list_id, item);
    setItems([...items, newList]);
  };

  const handleToggle = async (item) => {
    const updatedItem = updateItem(item.id, { ...item, taken: !item.taken });
    setItems([
      ...items.filter((item) => item.id !== updatedItem.id),
      updatedItem,
    ]);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      const deletedItem = await deleteItem(id);
      setItems(items.filter((item) => item.id !== deletedItem.id));
    }
  };

  return (
    <div id="items">
      <h2>{list.name}</h2>
      {items.length > 0 ? (
        <>
          <p>{items.length} item ideas</p>
          <ul>
            {items.map((item) => (
              <Item
                key={item.id}
                item={item}
                handleToggle={handleToggle}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>No items found</p>
      )}

      <ItemForm onSubmit={handleCreate} />
    </div>
  );
};

export default Items;
