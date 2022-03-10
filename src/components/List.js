import { Link } from "react-router-dom";

//{ id, name, description }
const List = ({ list, handleDelete }) => 
  <li key={list.id}><Link to={`/list/${list.id}`}>{list.name}</Link> <button type="button" onClick={() => handleDelete(list.id)}>❌</button></li>


export default List;