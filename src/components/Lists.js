import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListForm from './ListForm'
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
    setLists([...lists, newList])
  }

  const handleDelete = async (id) => {
    const deletedList = await deleteList(id)
    setLists(lists.filter(list => list.id !== deletedList.id))
  }

  return (
    <>
      <h2>Lists</h2>
      {lists.length > 0 ? (
        <>
          <p>{lists.length} lists</p>
      <ul>
        {lists.map((list) => 
          <li key={list.id}><Link to={`/list/${list.id}`}>{list.name}</Link> <button type="button" onClick={() => handleDelete(list.id)}>❌</button></li>
        )}
          </ul>
          </>
      ) : <p>No lists found</p>}
      
      <ListForm onSubmit={handleCreate} />
    </>
  );
};

export default Lists;