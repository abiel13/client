import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import {categories} from '../utils/queries'

function SideBar({ user, close }) {
  const style =
    "flex items-center gap-3 px-5 mt-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize ";
  const isActiveStyle = "flex items-center px-5 gap-3 font-bold border-r-2 border-black hover:text-black transition-all duration-200 ease-in-out capitalize ";
 
  return (
    <div className="flex flex-col justify-between  min-w-210 shadow-lg overflow-y-scroll hide-scrollbar h-full">
      <div className="flex flex-col">
        <Link to="/" className="my-6 px-5">
          <span
            className="font-bold"
            onClick={() => {
              close && close(false);
            }}
          >
            Pic<span className="text-orange-500">Share</span>
          </span>
        </Link>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/"
            className={({isActive}) => (isActive ? isActiveStyle : style)}
            onClick={() => {
              close && close(false);
            }}
          >
            <RiHomeFill /> Home
          </NavLink>
          <Link to={`create-pin`} className="flex font-bold px-5 py-2  text-white md:hidden "   onClick={() => {
              close && close(false);
            }}>
 
<p className='w-1/2 bg-red-500 p-2 rounded-md'> create pin
</p>
        </Link>

          <h3 className="text-base mt-2 px-5 2xl:text-2xl">
            Discover Categories
          </h3>
          {categories.slice(0 , categories.length -1).map((items) => (
            <NavLink
              to={`category/${items.name}`}
              className={({isActive}) => (isActive ? isActiveStyle : style)}
              onClick={() => {
                close && close(false);
              }}
            >
              <img src={items.image} alt="" className="w-8 h-8 rounded-full" />
              <p>   {items.name}</p>
           

            </NavLink>
       ))}
        </div>
      </div> 
      {
        user && (
          <Link
          to={`userProfile/${user._id}`}
          className="my-6 mb-3 px-5 flex flex-col items-start gap-3 "
          >
          <img src={user.image} className='w-10 h-10 rounded-full bg-black ' />
          <p className='capitalize font-bold'>{user.userName}</p>
          </Link>
        )
      }
    </div>
  );
}

export default SideBar;
