import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginIcons from "../assest/signin.gif";
import SummaryApi from "../common";
import imageTobase64 from "../helpers/imageTobase64";
import Audio, { Bars, ThreeCircles, ThreeDots } from "react-loader-spinner";

const SignUP = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      console.log("data", dataApi);

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
        setShowLoader(false);
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
        setShowLoader(false);
      }
    } else {
      //console.log("Please check password and confirm password")
      //throw new Error("Please check password and confirm password")
      toast("Please check password and confirm password");
    }
  };

  return (
    <section id="signup">
      {showLoader ? (
        <div className="h-96 flex justify-center items-center">
          <ThreeDots type="ThreeDots" color="#7542ff" height={80} width={80} />
        </div>
      ) : (
        <div className="mx-auto container p-4">
          <div className=" bg-white p-4 w-full max-w-sm mx-auto">
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <div>
                <img src={data.profilePic || loginIcons} alt="login icons" />
              </div>
              <form>
                <label>
                  <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 text-center cursor-pointer absolute bottom-0 w-full">
                    Upload photo
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleUploadPic}
                  />
                </label>
              </form>
            </div>

            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="grid">
                <label>Name :</label>
                <div className="bg-slate-200 p-2 rounded">
                  <input
                    type="text"
                    placeholder="enter your name"
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  ></input>
                </div>
              </div>
              <div className="grid">
                <label>Email :</label>
                <div className="bg-slate-200 p-2 rounded">
                  <input
                    type="email"
                    placeholder="enter email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  ></input>
                </div>
              </div>

              <div>
                <label>Password :</label>
                <div className="bg-slate-200 p-2 flex rounded">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="enter password"
                    value={data.password}
                    name="password"
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  ></input>
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((preve) => !preve)}
                  >
                    <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
              </div>
              <div>
                <label>Confirm Password :</label>
                <div className="bg-slate-200 p-2 flex rounded">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="enter confirm password"
                    value={data.confirmPassword}
                    name="confirmPassword"
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  ></input>
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowConfirmPassword((preve) => !preve)}
                  >
                    <span>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white fu px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Sign Up
              </button>
            </form>
            <p className="my-5">
              Already have account?{" "}
              <Link
                to={"/login"}
                className="text-red-600 hover:text-red-300 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SignUP;
