import { useState } from "react";

const ItemForm = ({ original, onCancel, onSubmit }) => {
  const [item, setItem] = useState(original);

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(item);
    setItem({ name: "", link: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{original.id ? "Update" : "Add"} item</h3>
      <p>
        <label>
          Item name:
          <br />
          <input
            type="text"
            value={item.name}
            aria-label="name"
            onChange={(event) => setItem({ ...item, name: event.target.value })}
          />
        </label>
      </p>

      <p>
        <label>
          Item link:
          <br />
          <input
            type="text"
            value={item.link}
            aria-label="link"
            onChange={(event) => setItem({ ...item, link: event.target.value })}
          />
        </label>
      </p>

      <p>
        <button type="submit">{original.id ? "Update" : "Add"} item</button>
        <button type="reset" onClick={onCancel}>Cancel</button>
      </p>
    </form>
  );
};

export default ItemForm;
