import React, { useState } from "react";
import { urlFor ,client } from "../client";
import { useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { fetchUser } from "../utils/queries";
import {v4 as uuidv4} from 'uuid'


function Pin({ pin: { save, postedBy, destination, image, _id } }) {
  const [Hovered, setHovered] = useState(false);
  const [Saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();

  const alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user.sub)?.length);

function savePins(id){
    if(!alreadySaved){
        setSaving(true)

        client.patch(id).setIfMissing({save : []}).insert('after' ,'save[-1]' ,[{
            _key:uuidv4(),
            userId:user.sub,
            postedBy:{
                _type:'postedBy',
                _ref:user.sub,
            }
        }]).commit().then(() => {
            window.location.reload()
            setSaving(false)
        })
    }
}

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        onClick={() => navigate(`pin-details/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(image).width(250).url()}
          alt=""
          className="rounded-lg w-full"
        />

        {Hovered && (
          <div className="absolute top-0 bottom-0 left-0 right-0 rounded-lg transition-all duration-500 ease-in-out flex flex-col items-start justify-between  bg-blackOverlay">
            <div className="flex items-center justify-between p-1 pt-2 w-full pb-2 pr-2">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white text-black w-9 h-9 rounded-full flex items-center justify-center text-lg opacity-70 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button className="bg-red-500 text-white py-1 px-5 text-base  opacity-70 rounded-md font-bold hover:opacity-100 outline-none ">
               {save.length}   Saved
                </button>
              ) : (
                <button
                onClick={(e) =>{
                    e.stopPropagation()
                    savePins(_id)
                }}
                className="bg-red-500 text-white py-1 px-5 text-base  opacity-70 rounded-md font-bold hover:opacity-100 outline-none ">
                  Save {save.length}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pin;
