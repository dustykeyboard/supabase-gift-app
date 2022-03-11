import { useState, useEffect } from "react";
import { getList } from "../lists/data";

const ListHeader = ({id}) => {
  const [list, setList] = useState({});

  useEffect(() => {
    const fetchLists = async () => {
      const list = await getList(id);
      setList(list);
    };
    try {
      fetchLists();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <header className="list-header">
      <h2>{list.name}</h2>
      <p>{list.description}</p>
    </header>
  )
}

export default ListHeader;