import React, { useState, useRef } from "react";
import image from "../assets/image.png";
import LeftSideBar from "../components/LeftSideBar";
import Nav from "../components/Nav";
import axios from "../api/Axios";
import ENDPOINTS from "../api/endPoints";

function AddAnnonce() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const categorieRef = useRef();
  const modaliteRef = useRef();
  const tarifRef = useRef();
  const themeRef = useRef();
  const wilayaRef = useRef();
  const communeRef = useRef();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [categorie, setcategorie] = useState("");
  const [modalite, setmodalite] = useState("");
  const [tarif, settarif] = useState("");
  const [theme, settheme] = useState("");
  const [wilaya, setwilaya] = useState("");
  const [commune, setcommune] = useState("");
  const [images, setImages] = useState([]);

  const handleImages = (e) => {
    setImages(e.target.files);
  };

  const uploadImages = async (annonceId) => {
    try {
      const formData = new FormData();
      for (const image of images) {
        formData.append("file", image);
      }
      console.log(formData.keys);

      const reponse = await axios.post(
        ENDPOINTS.ANNONCES + annonceId + ENDPOINTS.MEDIA,
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      setImages([]);
      settitle("");
      setdescription("");
      setcategorie("");
      setmodalite("");
      settarif("");
      settheme("");
      setwilaya("");
      setcommune("");
      titleRef.current.value = "";
      descriptionRef.current.value = "";
      categorieRef.current.value = "";
      modaliteRef.current.value = "";
      tarifRef.current.value = "";
      themeRef.current.value = "";
      wilayaRef.current.value = "";
      communeRef.current.value = "";
      window.alert("----------Annonce Added Succ----------------");
    } catch (err) {
      window.alert(err);
    }
  };
  const setData = () => {
    settitle(titleRef.current.value);
    setdescription(descriptionRef.current.value);
    setcategorie(categorieRef.current.value);
    setmodalite(modaliteRef.current.value);
    settarif(tarifRef.current.value);
    settheme(themeRef.current.value);
    setwilaya(wilayaRef.current.value);
    setcommune(communeRef.current.value);
  };
  const handleSubmit = async () => {
    setData();
    if (
      title &&
      description &&
      categorie &&
      modalite &&
      tarif &&
      theme &&
      wilaya &&
      commune &&
      images.length > 0
    ) {
      try {
        setData();
        const data = {
          theme: theme,
          description: description,
          tarif: tarif,
          modalite: modalite,
          categorie: categorie,
          wilaya: wilaya,
          commune: commune,
          titre: title,
        };
        const response = await axios.post(ENDPOINTS.ANNONCES, data);
        if (response.data) {
          console.log(response.data);
          const annonceId = response.data["annonce_id"];
          await uploadImages(annonceId);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      window.alert("Please enter all fields and add image");
    }
  };
  return (
    <div className="p-4 mx-10 sm:mx-1  md:text-sm sm:text-xs  sm:ml-4 ">
      <Nav />
      <div className="flex">
        <LeftSideBar />
        <div className="md:flex w-full  sm:ml-8 ">
          <div className="bg-[var(--primary-color)] md:ml-[-100px]  border-2 border-gray-300 border-dashed  md:w-[50%] flex justify-center items-center sm:w-full">
            <div>
              <img
                src={image}
                alt=" add image "
                className="p-3 ml-8 sm:w-[50%] "
              />
              <button className="bg-blue-500 text-white rounded-md px-2 ">
                <input
                  type="file"
                  name="file"
                  id="myImages"
                  multiple="multiple"
                  placeholder=" selectionner des images"
                  onChange={handleImages}
                />
              </button>
              <div className="text-gray-500 text-sm ">
                {" "}
                ou deposer les images ici
              </div>
            </div>
          </div>
          <div className="  p-5 shadow-sm sm:w-full    ">
            <div className="font-bold mb-10 sm:mb-1 sm:w-[90%]  md:w-[300px]">
              remplir les informations qui concerne le cours de soutien
            </div>

            <div class="relative h-11 w-full min-w-[200px] mb-4">
              <input
                id="titre"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                ref={titleRef}
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                titre
              </label>
            </div>
            <div class="relative h-11 w-full min-w-[200px] mb-4">
              <input
                id="description"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                ref={descriptionRef}
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                description
              </label>
            </div>
            <label className="text-gray-500 text-[14px] focus:outline-none  ">
              <select
                name="annonce"
                className="          
                w-full
                  cursor-pointer
                  text-gray-700
                  border-b-2 border-gray-100
                py-2
                  transition
                  ease-in-out
               focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-2"
                id="catégorie"
                ref={categorieRef}
              >
                <option value="college">collège </option>
                <option value="lycee">lycée </option>
                <option value="primaire">primaire</option>
              </select>
            </label>
            <label className="text-gray-500 text-[14px] focus:outline-none  ">
              <select
                name="annonce"
                className="          
            text-gray-400
            w-full
            cursor-pointer
            text-gray-700
            border-b-2 border-gray-100
            py-2
            transition
            ease-in-out
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                id="modalité"
                ref={modaliteRef}
              >
                <option value="online">en ligne </option>
                <option value="offline">hors ligne </option>
              </select>
            </label>
            <div class="relative h-11 w-full min-w-[200px] mb-4 mt-2 ">
              <input
                id="tarif"
                class=" text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                ref={tarifRef}
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Tarif
              </label>
            </div>
            <div class="relative h-11 w-full min-w-[200px] mb-4">
              <input
                id="theme"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                ref={themeRef}
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Thème
              </label>
            </div>
            <div class="relative h-11 w-full min-w-[200px] mb-4">
              <input
                id="wilaya"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                ref={wilayaRef}
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Wilaya
              </label>
            </div>
            <div class="relative h-11 w-full min-w-[200px] mb-4">
              <input
                id="commune"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                ref={communeRef}
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Commune
              </label>
            </div>
            <div class="relative h-11 w-full min-w-[200px] mb-">
              <input
                id="bienImmobilier"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Adresse du bien immobilier
              </label>
            </div>
            <div className="flex justify-center md:mt-10 sm:mt-2 sm:ml-[-20%] sm:w-[80%]">
              <button
                id="submit-button"
                className="bg-blue-500 text-white rounded-md w-[80%] p-1 md:ml-[40%] sm:ml-24"
                onClick={handleSubmit}
              >
                Publier l'annonce
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAnnonce;
