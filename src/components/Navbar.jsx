import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

function Navbar({ search, setSsearch, user }) {
  const navigate = useNavigate();

  if (!user) return null;
  return (
    <div className="flex gap-2 mt-5 pb-7 md:gap-5">
      <div className="justify-start items-center w-full bg-white px-2 rounded-md border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSsearch(e.target.value);
          }}
          placeholder="search"
          onFocus={() => navigate('/search')}
          className="w-full bg-white outlne-none "
        />
      </div>
    </div>
  );
}

export default Navbar;
