const Item = ({ item, handleToggle, handleEdit, handleDelete }) => (
  <li>
    <button type="button" onClick={() => handleToggle(item)}>
      {item.taken ? '✔️' : ''}
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
    <button type="button" onClick={() => handleEdit(item)}>
      ✏️
    </button>
    <button type="button" onClick={() => handleDelete(item)}>
      ❌
    </button>
  </li>
);

export default Item;
