import { Link } from "react-router-dom";

const List = ({ list, handleDelete }) => (
  <li>
    <Link to={`/list/${list.id}`}>{list.name}</Link>{" "}
    <button type="button" onClick={() => handleDelete(list.id)}>
      ❌
    </button>
  </li>
);

export default List;
