import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { client } from "../client";
import Spinner from "./Spinner";

function CreatePin() {
  const [Title, setTitle] = useState("");
  const [About, setAbout] = useState("");
  const [Destination, setDestination] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Fields, setFields] = useState(false);
  const [Category, setCategory] = useState(null);
  const [ImageAsset, setImageAsset] = useState(null);
  const [WrongImg, setWrongImg] = useState(false);

  const navigate = useNavigate();

const upload = (e) =>{
const {type , name} = e.target.files[0];
console.log(type)

if(type === 'image/svg' || type ==='image/png'|| type === 'image/gif' || type ==='image/jpg' || type === 'image/jpeg'){
  setWrongImg(false)
  setLoading(true)
  client.assets.upload('image' ,e.target.files[0] , {
    contentType:type,
    filename:name,
  }).then(data => {setImageAsset(data)
  setLoading(false);
  }).catch(err => {console.log(err)})

}
else{
  setWrongImg(true)
}

}

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {Fields && (
        <p className="text-xl text-red-500 mb-5 transition-all duration-150 ease-in">
          Please Fill Out Fields{" "}
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center w-4/5">
        <div className="bg-secondaryColor p-3 w-full flex justify-center items-center">
          <div className="justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {Loading && <Spinner />}
            {WrongImg && <p>Wrong Image Type</p>}
            {!ImageAsset ? (
              <label htmlFor="">
                <div className="flex cursor-pointer flex-col justify-center items-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click To Upload</p>
                  </div>
                  <p className="mt-32">Use High Quality Jpeg Gif JPg Png less than 20mb</p>
                </div>
                <input type="file" onChange={upload} name='upload-img'/>
              </label>
            ) : (
              <div className=" flex items-center justify-center h-full">
                <div className="w-1/2 ">
                       <img src={ImageAsset.url} alt="" className="w-1/2  h-full" />
<button className="absolute bg-white z-20 left-3 bottom-2 p-3 text-lg rounded-full hover:shadow-md transition-all duration-150 cursor-pointer"  onClick={() => setImageAsset(null)}>
  <MdDelete />
</button>
                </div>
           
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePin;
