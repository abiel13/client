import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/queries";
import Spinner from "./Spinner";

function PinDetails({ user }) {
  const [Pins, setPins] = useState(null);
  const [PinDetails, setPinDetails] = useState(null);
  const [Comments, setComments] = useState("");
  const [Commenting, setCommenting] = useState(false);
  const { pin } = useParams();

  const fetchPinDetails = (pin) => {
    let query = pinDetailQuery(pin);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetails(data[0]);
        if (data[0]) {
          query = pinDetailMorePinQuery(query);

          client.fetch(query).then((data) => setPins(data));
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails(pin);
  }, [pin]);

  if (!PinDetails) return <Spinner message="Loading Pins " />;

function AddComment(){
  if(Comments ){
    setCommenting(true)

    client.patch(pin).setIfMissing({comments : []}).insert('after' , 'comments[-1]',[
    {
      comment:Comments,
      key:uuidv4(),
      postedBy:{
        _type:'postedBy',
        _ref:user._id
      }
    }
    ]).commit().then(() =>{
      fetchPinDetails()
      setCommenting(false)
      setComments('')
    })
  }
}

  return (
    <div
      className="flex xl-flex-row flex-col rounded-md m-auto bg-white"
      style={{ maxWidth: "1500px" }}
    >
      <div className="flex justify-center items-center flex-initial  md:flex-start">
        <img
          src={PinDetails?.image && urlFor(PinDetails.image).url()}
          alt="user Post"
          className="rounded-t-3xl rounded-b-lg max-h-370  w-370"
        />{" "}
      </div>
      <div className="flex-1 w-full p-5 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a
              href={`${PinDetails?.image?.asset?.url}?dl=`}
              download
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-white text-black w-9 h-9 rounded-full flex items-center justify-center text-lg opacity-70 hover:opacity-100"
            >
              <MdDownloadForOffline className='text-2xl ' />
            </a>
          </div>
          <a href={PinDetails.destination} className='p-2 shadow-md rounded-md' target="_blank" rel="noreffer">
            {PinDetails?.destination}
          </a>
        </div>
        <div>
          <h1 className="text-3xl font-bold break-words">
            {PinDetails?.title}
          </h1>
          <p className="mt-3">{PinDetails?.about}</p>
        </div>

        <Link
          to={`user-profile/${PinDetails.postedBy._id}`}
          className="flex mt-2 p-2 gap-2 items-center flex-initial rounded-lg bg-white "
        >
          <img
            src={PinDetails.postedBy.image}
            alt="userprofile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <p className="font-semibold capitalize">
            {PinDetails.postedBy?.userName}
          </p>
        </Link>

        <h2 className="mt-5 text-2xl">Comments</h2>
        <div className="max-h-370 mt-3 overflow-y-auto">
          {PinDetails?.comments?.map((comment, i) => (
            <div key={i} className="flex gap-2 items-center">
              <img src={comment.postedBy.image} alt="uer" className="bg-blue w-8 h-8 rounded-full" />
              <div className="flex flex-col">
                <p className="font-bold">{comment.postedBy.userName}</p>
                <p className="mt-3">{comment.comment}</p>
                {console.log(comment)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 flex-wrap mt-6">
        <Link to={`user-profile/${PinDetails.postedBy._id}`}
          className="flex mt-2 p-2 gap-2 items-center flex-initial rounded-lg bg-white "
        >
          <img
            src={PinDetails.postedBy.image}
            alt="userprofile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </Link>
<input type="text" placeholder="Add A Comment" value={Comments} onChange={(e) => setComments(e.target.value)}
className="p-2 px-5 flex-1 outline-blue-500 border-blue-300 border-2"
/>

<button className="bg-red-500 text-white font-bold p-2 px-3 rounded-md cursor-pointer"
onClick={AddComment}
>
  {Commenting ? 'Adding Comment' : 'Comment'}
</button>
        </div>
      </div>
    </div>
  );
}

export default PinDetails;
