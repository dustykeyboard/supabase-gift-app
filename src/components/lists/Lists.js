import "./list.css";
import { useState, useEffect } from "react";
import List from "./List";
import ListForm from "./ListForm";
import { createList, getAllLists, updateList, deleteList } from "./data";

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

  const handleNew = () => {
    setEditing({});
  };

  const handleCreate = async (name) => {
    const newList = await createList(name);
    setLists([...lists, newList]);
    setEditing(null);
  };

  const handleEdit = (list) => {
    setEditing(list);
  };

  const handelCancel = () => {
    setEditing(null);
  };

  const handleUpdate = async (list) => {
    const updatedList = await updateList(list.id, { ...list, id: list.id });
    setLists([
      ...lists.filter((list) => list.id !== updatedList.id),
      updatedList,
    ]);
    setEditing(null);
  };

  const handleDelete = async (list) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      const deletedList = await deleteList(list.id);
      setLists(lists.filter((list) => list.id !== deletedList.id));
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
        <p>
          <button onClick={handleNew}>Add new item</button>
        </p>
      )}
    </div>
  );
};

export default Lists;
