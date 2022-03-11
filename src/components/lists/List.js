import { Link } from "react-router-dom";

const List = ({ list, handleEdit, handleDelete }) => (
  <li>
    <Link to={`/list/${list.id}`}>{list.name}</Link>{" "}
    <div className="icon edit" onClick={() => handleEdit(list)} />
    <div className="icon delete" onClick={() => handleDelete(list)} />
  </li>
);

export default List;
