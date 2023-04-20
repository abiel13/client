import { React, useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Pins, SideBar, UserProfile } from "../components";
import logo from "../assets/logo.png";
import { userQuery } from "../utils/queries";
import { client } from "../client";

function Home() {
  const [Toggle, seTToggle] = useState(false);
  const userInfo =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  const [User, setUser] = useState([]);

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((res) => setUser(res[0]));
  }, []);

  return (
    <div className="flex flex-col bg-gray-50 transition-height duration-75 ease-out md:flex-row">
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar user={User && User} />
      </div>
      <div className="md:hidden flex">
        <div className="flex flex-row  shadow-md  w-full p-2 items-center justify-between ">
          <HiMenu
            fontSize={40}
            cursor={"pointer"}
            fontWeight={"bold"}
            onClick={() => {
              seTToggle(true);
            }}
          />
          <Link to={"/"} className="flex flex-col justify-center items-center">
            <span className="font-bold">
              Code<span className="text-orange-500">Share</span>{" "}
            </span>
          </Link>
          <Link to={`user-profile/${User?.id}`}>
            <img src={User?.image} alt="" className="w-[50px] h-[50px] bg-black rounded-full" />
          </Link>
          {Toggle && (
            <div className="fixed pt-3 p-1 inset-0 w-4/5 animate-slide-in bg-white h-screen shadow-md">
              <div className="absolute w-full flex justify-end items-center ">
                <AiFillCloseCircle
                  fontSize={30}
                  className="cursor-pointer p-1"
                  onClick={() => {
                    seTToggle(false);
                  }}
                />
              </div>
              <SideBar user={User && User} close={seTToggle} />
            </div>
          )}
        </div>
      </div>{" "}
      <div className="pb-2 h-screen flex-1 overflow-y-auto">
        <Routes>
          <Route path='/userprofile/:id' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={User && User} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
