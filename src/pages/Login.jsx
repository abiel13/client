import React from "react";
import video from "../assets/share.mp4";
import { client } from "../client";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const decode = jwtDecode(response.credential);
    console.log(decode);
    localStorage.setItem("user", JSON.stringify(decode));

    const { name, sub, picture } = decode;
    const doc ={
      _id:sub,
      _type:'user',
      userName:name,
      image:picture
    }

    client.createIfNotExists(doc).then(() =>{
       navigate("/feed");
    })
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative w-full h-full">
        <video
          src={video}
          controls={false}
          autoPlay
          muted
          type="video/mp4"
          loop
          className="w-full h-full object-cover "
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-blackOverlay flex flex-col justify-center items-center">
          <div className="flex gap-4">
            <p className="text-3xl text-white font-bold ">
              Code<span className="text-orange-600">Share</span>{" "}
            </p>
          </div>
          <div>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_React_Token}>
              <GoogleLogin
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                useOneTap
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
