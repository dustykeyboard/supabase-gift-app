import { useState } from "react";

const GiftForm = ({ onSubmit }) => {
  const [gift, setGift] = useState({ name: "", link: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(gift);
    setGift({ name: "", link: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={gift.name}
        aria-label="name"
        onChange={(event) => setGift({ ...gift, name: event.target.value })}
      />
      <input
        type="text"
        value={gift.link}
        aria-label="link"
        onChange={(event) => setGift({ ...gift, link: event.target.value })}
      />

      <button type="submit">add</button>
    </form>
  );
};

export default GiftForm;
