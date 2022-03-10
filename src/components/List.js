import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GiftForm from "./GiftForm";
import { getList } from "../data/lists";
import { createGift, getAllGifts, deleteGift } from "../data/gifts";

const List = () => {
  const { list_id } = useParams();

  const [list, setList] = useState({});
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const list = await getList(list_id);
      const gifts = await getAllGifts(list_id);
      setList(list);
      setGifts(gifts || []);
    };
    fetchLists();
  }, [list_id]);

  const handleCreate = async (gift) => {
    console.log("handleCreate", gift);
    const newList = await createGift(list_id, gift);
    setGifts([...gifts, newList]);
  };

  const handleDelete = async (id) => {
    const deletedList = await deleteGift(id);
    setGifts(gifts.filter((list) => list.id !== deletedList.id));
  };

  return (
    <>
      <h2>
        {list.id}. {list.name}
      </h2>
      {gifts.length > 0 ? (
        <>
          <p>{gifts.length} lists</p>
          <ul>
            {gifts.map((gift) => (
              <li key={gift.id}>
                {gift.link ? (
                  <a href={gift.link} target="_blank" rel="noreferrer">
                    {gift.name}
                  </a>
                ) : (
                  gift.name
                )}
                <button type="button" onClick={() => handleDelete(gift.id)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No gifts found</p>
      )}

      <GiftForm onSubmit={handleCreate} />
    </>
  );
};

export default List;
