import { useState } from "react";

const ItemForm = ({ item: originalItem,onSubmit }) => {
  const [item, setItem] = useState(originalItem);

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(item);
    setItem({ name: "", link: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={item.name}
        aria-label="name"
        onChange={(event) => setItem({ ...item, name: event.target.value })}
      />
      <input
        type="text"
        value={item.link}
        aria-label="link"
        onChange={(event) => setItem({ ...item, link: event.target.value })}
      />

      <button type="submit">{originalItem.id ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default ItemForm;
