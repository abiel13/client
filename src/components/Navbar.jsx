import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

function Navbar({ search, setSsearch, user }) {
  const navigate = useNavigate();

  if (!user) return null;
  return (
    <div className="flex gap-2 items-center mt-5 pb-7 md:gap-3">
      <div className="justify-start flex items-center w-full bg-white px-3 rounded-md border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={20} className="ml-1"/>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSsearch(e.target.value);
          }}
          placeholder="search"
          onFocus={() => navigate('/search')}
          className="w-full p-2 bg-white outline-none border-none"
        />
      </div>
      <div className="flex items-center gap-3">
        <Link to={`user-profile/${user._id}`} className="hidden md:block">
          <img src={user.image} alt="image" className="w-[50px] h-[40px] rounded-[50%] " />
        </Link>
        <Link to={`create-pin`} className="hidden md:block">
  <IoMdAdd className="bg-black text-white w-8 h-8 rounded-lg" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
