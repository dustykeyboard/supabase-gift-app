const Item = ({ item, handleToggle, handleDelete }) => (
  <li>
    <button type="button" onClick={() => handleToggle(item.id)}>
      {item.taken ? '✅' : '🟩'}
    </button>

    {item.link ? (
      <a href={item.link} target="_blank" rel="noreferrer">
        {item.name}
      </a>
    ) : (
        <span>
          {item.name}
        </span>
    )}
    <button type="button" onClick={() => handleDelete(item.id)}>
      ❌
    </button>
  </li>
);

export default Item;
