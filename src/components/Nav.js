import { Link } from "react-router-dom";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">🏠 Lists</Link>
      </li>
      <li>
        <Link to="/account">😁 Account</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
