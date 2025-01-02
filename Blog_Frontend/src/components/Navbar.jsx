import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-5xl mx-auto flex justify-between">
        <h1 className="text-xl font-bold">
          <Link to="/">My Blog</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/post/manage" className="hover:underline">
            Manage Posts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
