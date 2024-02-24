import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Input } from "../components/auth/input";
import { getName } from "../utils/helper";
import AuthInfo from "../components/auth/auth_info";
import { signInAuthUserWithEmailAndPassword } from "../utils/firebase/firebase.utils";
import { UserContext } from "../contexts/user.context";

const defaultValue = {
  email_address: "",
  password: "",
};

const SignIn = () => {
  const [state, setstate] = useState("unloaded");
  const [formField, setFormField] = useState(defaultValue);

  const resetFormFields = () => {
    setFormField(defaultValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setstate("loading");
    const { email_address, password } = formField;

    try {
      await signInAuthUserWithEmailAndPassword(email_address, password);
      resetFormFields();
    } catch (error) {
      console.log("user sign in failed", error);
    }
    setstate("loaded");
  };

  const { currentUser, userDetails } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="flex  min-h-screen">
      <AuthInfo />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:max-w-sm lg:max-w-[80%] lg:mx-[10%]">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 lg:text-left">
            Sign in to I Money
          </h2>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500 lg:text-left lg:mx-[10%]">
          <span className=" xl:inline-block hidden ">
            Enter your details below{" "}
          </span>
          <span className=" xl:inline-block hidden mx-3"> | </span>
          <span className=" inline-block mr-8">Don’t have an account? </span>

          <Link
            to="/signup"
            className="font-bold leading-6 text-[#00D871] hover:text-[#00d870c8] hover:border-[#00d87087] border-2 border-[#00D871] p-2 rounded-xl"
          >
            Sign Up
          </Link>
        </p>

        <div className="mt-28 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-[80%] ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {Object.keys(formField).map((key) => {
              return (
                <Input
                  key={key}
                  name={getName(key)}
                  type={key == "password" ? "password" : "text"}
                  value={formField[key]}
                  placeholder={getName(key)}
                  onChange={(e) => {
                    setFormField((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }));
                  }}
                />
              );
            })}

            <div>
              <button className="flex w-full justify-center rounded-md bg-[#00D871] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#00d870c8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d870c8]">
                {state == "loading" ? (
                  <ClipLoader size={20} color="#fff" className="text-white" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            <div className="relative flex gap-x-3">
              <div className="text-sm leading-6">
                <p className="text-gray">
                  By continuing you’re confirming that you have read and agree
                  to our <a className=" text-blue-600">Terms </a> and
                  <a className=" text-blue-600"> Privacy Policy</a>.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
