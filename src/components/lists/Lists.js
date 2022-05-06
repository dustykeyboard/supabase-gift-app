import "./list.css";
import { useState, useEffect } from "react";
import List from "./List";
import ListForm from "./ListForm";
import { createList, getAllLists, updateList, deleteList } from "./data";
import { supabase } from "../../supabaseClient";

const Lists = () => {
  const [lists, setLists] = useState();
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      const lists = await getAllLists();
      setLists(lists || []);
    };
    fetchLists();
  }, []);

  // realtime * to lists
  useEffect(() => {
    const subscription = supabase.from('lists').on('*', payload => {
      setLists(currentLists => [
          ...currentLists.filter((list) => list.id !== payload.old.id),
          payload.new
        ].filter(list => list.id))
    }).subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    }
  }, [])

  const handleNew = () => {
    setEditing({
      name: '',
      description: '',
    });
  };

  const handleCreate = async (name) => {
    await createList(name);
    setEditing(null);
  };

  const handleEdit = (list) => {
    setEditing(list);
  };

  const handelCancel = () => {
    setEditing(null);
  };

  const handleUpdate = async (list) => {
    await updateList(list.id, { ...list, id: list.id });
    setEditing(null);
  };

  const handleDelete = async (list) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      await deleteList(list.id);
      // setLists(lists.filter((list) => list.id !== deletedList.id));
    }
  };

  if (typeof lists?.length === "undefined") return null;

  return (
    <div id="lists">
      <h2>{lists.length || "No"} Lists</h2>
      {lists.length > 0 ? (
        <ul>
          {lists.map((list) => (
            <List
              key={list.id}
              list={list}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      ) : (
        <p>No lists found</p>
      )}

      {editing != null ? (
        <ListForm
          key={editing.id}
          original={editing}
          onSubmit={editing.id ? handleUpdate : handleCreate}
          onCancel={handelCancel}
        />
      ) : (
        <form>
          <button onClick={handleNew}>Add list</button>
        </form>
      )}
    </div>
  );
};

export default Lists;
