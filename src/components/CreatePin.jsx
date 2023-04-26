import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/queries";

function CreatePin({ user }) {
  const [Input, setInput] = useState({
    title: "",
    about: "",
    destination: "",
    category: "",
  });

  const { title, about, destination, category } = Input;


  const [Loading, setLoading] = useState(false);
  const [Fields, setFields] = useState(false);
  const [ImageAsset, setImageAsset] = useState(null);
  const [WrongImg, setWrongImg] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const savePin = () => {
    if(title && about && category && ImageAsset?._id){
      const doc ={
        _type:'pin',
        about,
        title,
        destination,
        image:{
          _type:'image',
          asset:{
            _type:'reference',
            _ref:ImageAsset?._id
          }
        },
        userId:user._id,
        postedBy:{
          _type:'postedBy',
          _ref:user._id
        },
        category,
      }
client.create(doc).then(() => {navigate('/')})
    }
else {setFields(true)
  setTimeout(() => {setFields(false)} ,2000)
}
  };

  const upload = (e) => {
    const { type, name } = e.target.files[0];
    console.log(type);

    if (
      type === "image/svg" ||
      type === "image/png" ||
      type === "image/gif" ||
      type === "image/jpg" ||
      type === "image/jpeg"
    ) {
      setWrongImg(false);
      setLoading(true);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((data) => {
          setImageAsset(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setWrongImg(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {Fields && (
        <p className="text-xl text-red-500 mb-5 transition-all duration-150 ease-in">
          Please Fill Out Fields{" "}
        </p>
      )}
      <div className="flex  flex-col justify-center p-2 bg-white items-center w-4/5 lg:flex-row lg:p-5">
        <div className="bg-secondaryColor flex-1 p-3 w-full flex justify-center items-center">
          <div className="justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {Loading && <Spinner />}
            {WrongImg && <p>Wrong Image Type</p>}
            {!ImageAsset ? (
              <label>
                <div className="flex cursor-pointer flex-col justify-center items-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click To Upload</p>
                  </div>
                  <p className="mt-32">
                    Use High Quality Jpeg Gif JPg Png less than 20mb
                  </p>
                </div>
                <input
                  type="file"
                  onChange={upload}
                  name="upload-img"
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className=" flex items-center justify-center h-full">
                <div className="w-full h-full relative md:w-4/5">
                  <img src={ImageAsset.url} alt="" className="w-full h-full" />
                  <button
                    className="absolute bg-white z-20 left-3 bottom-2 p-3 text-lg rounded-full hover:shadow-md transition-all duration-150 cursor-pointer"
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 flex-1 lg:pl-4 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={handleChange}
            name="title"
            className="outline-none p-2 focus:border-b-2 rounded-s-md border-blue-400 "
            placeholder="Input Your Title"
          />
          {user && (
            <div className="flex gap-2 mt-2 items-center">
              <img
                src={user.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            name="about"
            onChange={handleChange}
            className="outline-none p-2 focus:border-b-2 rounded-s-md border-blue-400"
            placeholder="Whats Your Pin About"
          />
          <input
            type="text"
            value={destination}
            name="destination"
            onChange={handleChange}
            className="outline-none p-2 focus:border-b-2 rounded-s-md border-blue-400"
            placeholder="Add A Destination Link"
          />
          <div>
            <div>
              <p className="font-bold ">Select a Category</p>
              <select
                name="category"
                onChange={handleChange}
                id=""
                value={category}
                className="outline-none w-4/5 bg-white py-2 text-base shadow-md border-b-2 border-gray-300"
              >
                <option value="Other" className="bg-white">
                  Select A Category
                </option>
                {categories.map((item) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full mt-10 flex  justify-end">
              <button
                onClick={savePin}
                className="bg-red-500 rounded-full py-2 p-3 text-white font-bold"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePin;
