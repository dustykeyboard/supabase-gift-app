import { Link } from "react-router-dom";
import Avatar from './account/Avatar'

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/"><img src="/icons/list.png" width="32" height="32" alt="list" /></Link>
      </li>
      <li>
        <Link to="/account"><Avatar size={32} /></Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
