const Item = ({ item, handleToggle, handleEdit, handleDelete }) => (
  <li>
    <div className={item.taken ? 'icon done' : 'icon unchecked'} onClick={() => handleToggle(item)} />

    {item.link ? (
      <a href={item.link} target="_blank" rel="noreferrer">
        {item.name}
      </a>
    ) : (
        <span>
          {item.name}
        </span>
    )}
    <div className="icon edit" onClick={() => handleEdit(item)} />
    <div className="icon delete" onClick={() => handleDelete(item)} />
  </li>
);

export default Item;
