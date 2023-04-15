import React from "react";
import video from "../assets/share.mp4";
import logo from "../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function Login() {
  const responseGoogle = (response) => {};

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
                render={(renderProps) => (
                  <button
                    className="border-none flex mt-3  text-black items-center rounded-md gap-4 bg-white outline-none cursor-pointer p-2"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="text-lg" />{" "}
                    <p className="text-black text-lg font-bold">
                      Sign Up With Google
                    </p>
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
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
