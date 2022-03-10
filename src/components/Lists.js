import { useState, useEffect } from "react";
import List from "./List";
import ListForm from "./ListForm";
import { createList, getAllLists, deleteList } from "../data/lists";

const Lists = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const lists = await getAllLists();
      setLists(lists || []);
    };
    fetchLists();
  }, []);

  const handleCreate = async (name) => {
    const newList = await createList(name);
    setLists([...lists, newList]);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      const deletedList = await deleteList(id);
      setLists(lists.filter((list) => list.id !== deletedList.id));
    }
  };

  return (
    <div id="lists">
      <h2>{lists.length || "No"} Lists</h2>
      {lists.length > 0 ? (
        <ul>
          {lists.map((list) => (
            <List key={list.id} list={list} handleDelete={handleDelete} />
          ))}
        </ul>
      ) : (
        <p>No lists found</p>
      )}

      <ListForm onSubmit={handleCreate} />
    </div>
  );
};

export default Lists;
