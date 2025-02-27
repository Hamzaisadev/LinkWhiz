import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = false;
  return (
    <nav>
      <Link to="/">
        <img src="../assets/LinkWhiz.png" alt="LinkWhiz logo" />
      </Link>
      <div></div>
    </nav>
  );
};

export default Header;
