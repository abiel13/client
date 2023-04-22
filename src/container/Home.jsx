import { React, useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {  SideBar, UserProfile } from "../components";
import Pins from "./pins";
import { fetchUser, userQuery } from "../utils/queries";
import { client } from "../client";

function Home() {
  const userInfo = fetchUser()
   
  const [Toggle, seTToggle] = useState(false);
  const [User, setUser] = useState([]);
  const scroll = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    scroll.current.scrollTo(0, 0);
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
            <img
              src={User?.image}
              alt=""
              className="w-[50px] h-[50px] bg-black rounded-full"
            />
          </Link>
          {Toggle && (
            <div className="fixed z-[100] pt-3 p-1 inset-0 w-4/5 animate-slide-in bg-white h-screen shadow-md">
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
      <div className="pb-2 h-screen flex-1 overflow-y-auto" ref={scroll}>
        <Routes>
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={User && User} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
