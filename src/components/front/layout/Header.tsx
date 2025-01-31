import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">六角購物商城</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">產品列表</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">購物車</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">後台管理</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
