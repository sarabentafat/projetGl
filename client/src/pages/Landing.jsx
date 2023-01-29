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

  return (
    <div className="p-4 mx-10 sm:text-xs  sm:mx-1 ">
      <div className="flex justify-between">
        <img src={logo} alt="logo" className="w-15 h-8" />
        <div className="sm:w-[40%] md:w-[200px] ">
          <button
            className="border-2 border-blue-500 rounded-md  font-thin p-1 flex bg-blue-500 text-white  "
            onClick={redirectToGoogleSSO}
          >
            <img
              src={googleIcon2}
              alt=""
              className="w-5 m-1 mr-2
              "
            />
            S'inscrire avec google
          </button>
        </div>
      </div>

      <Link to="/offre"> go</Link>

      <div className="md:flex mt-20">
        <div>
          <div className="font-bold text-2xl py-5">
            Déposer votre annonces de soutien scolaires sur le site
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
            Se connecter avec google{" "}
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
