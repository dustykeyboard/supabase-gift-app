import "./item.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";
import ItemForm from "./ItemForm";
import { createItem, getAllItems, updateItem, deleteItem } from "./data";
import ListHeader from '../lists/ListHeader';
import { supabase } from '../../supabaseClient';

const Items = () => {
  const { list_id } = useParams();

  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      const items = await getAllItems(list_id);
      setItems(items || []);
    };
    try {
      fetchLists();
    } catch (error) {
      console.log(error);
    }
  }, [list_id]);

  // subscription to realtime items changes
  useEffect(() => {
    const subscription = supabase.from('items').on('*', payload => {
      setItems(currentItems => [
          ...currentItems.filter((item) => item.id !== payload.old.id),
          payload.new
        ].filter(item => item.id))
    }).subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    }
  }, [])

  const handleNew = () => {
    setEditing({
      name: '',
      link: '',
    });
  };

  const handleCreate = async (item) => {
    await createItem(list_id, item);
    setEditing(null);
  };

  const handleToggle = async (item) => {
    await updateItem(item.id, {
      ...item,
      taken: !item.taken,
      id: item.id,
    });
  };

  const handleEdit = (item) => {
    setEditing(item);
  };

  const handelCancel = () => {
    setEditing(null);
  };

  const handleUpdate = async (item) => {
    await updateItem(item.id, { ...item, id: item.id });
    setEditing(null);
  };

  const handleDelete = async (item) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      await deleteItem(item.id);
    }
  };

  return (
    <div id="items">
      <ListHeader id={list_id} />
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

      {editing != null ? (
        <ItemForm
          key={editing.id}
          original={editing}
          onSubmit={editing.id ? handleUpdate : handleCreate}
          onCancel={handelCancel}
        />
      ):
      (<form>
        <button onClick={handleNew}>Add item</button>
      </form>)}
    </div>
  );
};

export default Items;