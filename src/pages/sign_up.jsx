import React, { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import AuthInfo from "../components/auth/auth_info";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/auth/input";
import { getName } from "../utils/helper";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
import { UserContext } from "../contexts/user.context";

const defaultValue = {
  username: "",
  email_address: "",
  password: "",
  confirm_password: "",
};

const SignUp = () => {
  const [state, setstate] = useState("unloaded");
  const [formField, setFormField] = useState(defaultValue);

  const { currentUser, userDetails } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const resetFormFields = () => {
    setFormField(defaultValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setstate("loading");
    const { email_address, password, confirm_password, username } = formField;

    if (password !== confirm_password) {
      alert("passwords do not match");
      return;
    }

    if (password.length < 8) {
      alert("Please input a longer password (8+)");
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email_address,
        password
      );

      await createUserDocumentFromAuth(user, { username }, username);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }

    setstate("loaded");
  };

  return (
    <div className="flex min-h-full ">
      <AuthInfo />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:max-w-sm lg:max-w-[80%] lg:mx-[10%]">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 lg:text-left">
            Get started for free
          </h2>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500 lg:text-left lg:mx-[10%]">
          <span className=" lg:inline-block hidden ">
            Enter your details below{" "}
          </span>
          <span className=" lg:inline-block hidden mx-3"> | </span>
          <span className=" inline-block mr-8">Aleady have an account? </span>

          <Link
            to="/signin"
            className="font-bold leading-6 text-[#00D871] hover:text-[#00d870c8] hover:border-[#00d87087] border-2 border-[#00D871] p-2 rounded-xl"
          >
            Log in
          </Link>
        </p>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-[80%]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {Object.keys(formField).map((key) => {
              return (
                <Input
                  key={key}
                  name={getName(key)}
                  type={
                    key == "password" || key == "confirm_password"
                      ? "password"
                      : "text"
                  }
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
              <button
                onClick={(e) => signuppost(e)}
                className="flex w-full justify-center rounded-md bg-[#00D871] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#00d870c8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d870c8]"
              >
                {state == "loading" ? (
                  <ClipLoader size={20} color="#fff" className="text-white" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

          
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
