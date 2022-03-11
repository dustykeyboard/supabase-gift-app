import "./item.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";
import ItemForm from "./ItemForm";
import { createItem, getAllItems, updateItem, deleteItem } from "./data";
import { getList } from "../lists/data";

const Items = () => {
  const { list_id } = useParams();

  const [list, setList] = useState({});
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      const list = await getList(list_id);
      const items = await getAllItems(list_id);
      setList(list);
      setItems(items || []);
    };
    try {
      fetchLists();
    } catch (error) {
      console.log(error);
    }
  }, [list_id]);

  const handleNew = () => {
    setEditing({});
  };

  const handleCreate = async (item) => {
    const newList = await createItem(list_id, item);
    setItems([...items, newList]);
    setEditing(null);
  };

  const handleToggle = async (item) => {
    const updatedItem = await updateItem(item.id, {
      ...item,
      taken: !item.taken,
      id: item.id,
    });
    setItems([
      ...items.filter((item) => item.id !== updatedItem.id),
      updatedItem,
    ]);
  };

  const handleEdit = (item) => {
    setEditing(item);
  };

  const handelCancel = () => {
    setEditing(null);
  };

  const handleUpdate = async (item) => {
    const updatedItem = await updateItem(item.id, { ...item, id: item.id });
    setItems([
      ...items.filter((item) => item.id !== updatedItem.id),
      updatedItem,
    ]);
    setEditing(null);
  };

  const handleDelete = async (item) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      const deletedItem = await deleteItem(item.id);
      setItems(items.filter((item) => item.id !== deletedItem.id));
    }
  };

  if (!list.name) return null;

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
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>No items found</p>
      )}

      <p>
        <button onClick={handleNew}>Add new item</button>
      </p>

      {editing != null && (
        <ItemForm
          key={editing.id}
          item={editing}
          onSubmit={editing.id ? handleUpdate : handleCreate}
          onCancel={handelCancel}
        />
      )}
    </div>
  );
};

export default Items;