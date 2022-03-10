import { useState, useEffect } from "react";
import List from './List';
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
        {lists.map((list) => <List list={list} handleDelete={handleDelete} />)}
          </ul>
          </>
      ) : <p>No lists found</p>}
      
      <ListForm onSubmit={handleCreate} />
    </>
  );
};

export default Lists;