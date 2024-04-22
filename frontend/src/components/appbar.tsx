import { Link } from "react-router-dom";

export const AppBar = () => {
  return (
    <header className="bg-black py-3 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={"/"} className="text-gray-50 text-lg md:text-2xl font-title">
          @foxyfool/Medium
        </Link>

        <nav className="flex space-x-4">
          <div className="bg-white p-2 rounded-md font-title">User XYZ</div>
          <div className="bg-white p-2 rounded-md ">
            <button className="text-black font-title">
              {" "}
              <Link to={"/publish"} className="text-black font-title">
                Add A Blog
              </Link>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
