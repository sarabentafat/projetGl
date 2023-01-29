import React from "react";
import landingPic from "../assets/landingPic.png";
import { HashLink as Link } from "react-router-hash-link";
import googleIcon from "../assets/googleIcon.png";
import tw from "tailwind-styled-components";
import googleIcon2 from "../assets/googleicon2.png";
import ellipse from "../assets/ellipse.png";
import logo from "../assets/logo.png";
// const StyledProduct = tw.div`
// text-3xl font-bold underline
// `;
function Landing() {
  const googleLoginUrl = "http://localhost:5000/auth/login";

  const redirectToGoogleSSO = async () => {
    window.open(googleLoginUrl, "_self"); // new tab in the current one
  };
  // const redirectToGoogleSSO = async () => {
  //   window.open(googleLoginUrl, "_self");
  //   // Check for redirect after a certain amount of time
  //   console.log("detecting0 ...");
  //   setTimeout(() => {
  //     console.log("detecting ...");
  //     if (window.location.href !== googleLoginUrl) {
  //       console.log("Redirect detected to:", window.location.href);
  //     } else {
  //       console.log("No redirect detected");
  //     }
  //   }, 3000); // 1000ms = 1s
  // };
  // const redirectToGoogleSSO = async () => {
  //   const originalUrl = window.location.href;

  //   window.addEventListener("beforeunload", function listener() {
  //     window.removeEventListener("beforeunload", listener);

  //     if (window.location.href !== originalUrl) {
  //       console.log("Redirect detected to:", window.location.href);
  //     } else {
  //       console.log("No redirect detected");
  //     }
  //   });

  //   window.open(googleLoginUrl, "_self");
  // };

  return (
    <div className="p-4 mx-10  ">
      <div className="flex justify-between">
        <img src={logo} alt="" className="w-15 h-10" />
        <div className="">
          <button
            className="border-2 border-blue-500 rounded-md font-thin p-1 flex bg-blue-500 text-white  "
            onClick={redirectToGoogleSSO}
          >
            <img
              src={googleIcon2}
              alt=""
              className="w-5 m-1 mr-2
              "
            />
            sign in with google{" "}
          </button>
        </div>
      </div>

      <Link to="/offre"> go to profile</Link>

      <div className="md:flex mt-20">
        <div>
          <h1 className="font-bold flex">
            <img src={ellipse} alt="" className="w-3 h-3 mt-1 mr-2" />
            In our web app you will:
          </h1>
          <div className="font-bold text-2xl py-5">
            Post your annoncements of student help to find more and more choices
          </div>
          <p>
            hna rah tkun libre bach tposte les announce ta3ek f domaine ta3 les
            cours w soutien scholaire
          </p>
          <button
            className="border-2 border-blue-500 rounded-md font-thin p-1 flex mt-10"
            onClick={redirectToGoogleSSO}
          >
            <img
              src={googleIcon}
              alt=""
              className="w-5 mr-2
              "
            />
            sign in with google{" "}
          </button>
        </div>
        <div className="flex justify-center mr-[100px] pt-5 sm:w-[75%] ">
          <img src={landingPic} alt="student" />
        </div>
      </div>
      {/* <StyledProduct>hello</StyledProduct> */}
    </div>
  );
}

export default Landing;
