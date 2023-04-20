import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

function SideBar({ user, close }) {
  const style =
    "flex items-center gap-3 px-5 mt-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize ";
  const isActiveStyle = "flex items-center px-5 gap-3 font-bold border-r-2 border-black hover:text-black transition-all duration-200 ease-in-out capitalize ";
  const Categories = [
    { name: "Laptops", img: "" },
    { name: "Desktop Showroom", img: "" },
    { name: "Code", img: "" },
    { name: "Music", img: "" },
    { name: "Sites", img: "" },
    {name:'Pets' , img:''}
  ];
  return (
    <div className="flex flex-col justify-between min-w-210 shadow-md overflow-y-scroll hide-scrollbar h-full">
      <div className="flex flex-col">
        <Link to="/feed" className="my-6 px-5">
          <span
            className="font-bold"
            onClick={() => {
              close && close(false);
            }}
          >
            Code<span className="text-orange-500">Share</span>
          </span>
        </Link>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/feed"
            className={({isActive}) => (isActive ? isActiveStyle : style)}
            onClick={() => {
              close && close(false);
            }}
          >
            <RiHomeFill /> Home
          </NavLink>
          <h3 className="text-base mt-2 px-5 2xl:text-2xl">
            Discover Categories
          </h3>
          {Categories.slice(0 , Categories.length -1).map((items) => (
            <NavLink
              to={`/categories/${items.name}`}
              className={({isActive}) => (isActive ? isActiveStyle : style)}
              onClick={() => {
                close && close(false);
              }}
            >
              {items.name}
            </NavLink>
       ))}
        </div>
      </div> 
      {
        user && (
          <Link
          to={`userProfile/${user._id}`}
          className="my-6 mb-3 px-5 flex flex-col items-center gap-3 "
          >
          <img src={user.image} className='w-10 h-10 rounded-full bg-black ' />
          <p className='uppercase font-bold'>{user.userName}</p>
          </Link>
        )
      }
    </div>
  );
}

export default SideBar;
