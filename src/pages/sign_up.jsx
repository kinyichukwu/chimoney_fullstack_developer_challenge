import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import AuthInfo from "../components/auth/auth_info";
import { Link } from "react-router-dom";
import { Input } from "../components/auth/input";
import { getName } from "../helper";

const defaultValue = {
  email_address: "",
  password: "",
  confirm_password: "",
};

const SignUp = () => {
  const [loading, setloading] = useState(false);
  const [formField, setFormField] = useState(defaultValue);

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
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {Object.keys(formField).map((key) => {
              return (
                <Input
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
              <button
                onClick={(e) => signuppost(e)}
                className="flex w-full justify-center rounded-md bg-[#00D871] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#00d870c8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d870c8]"
              >
                {loading ? (
                  <ClipLoader size={20} color="#fff" className="text-white" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 "
                />
              </div>
              <div className="text-sm leading-6">
                <p className="text-gray">
                  Get notified when someones posts a comment on a posting.
                </p>
              </div>
            </div>

            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 "
                />
              </div>
              <div className="text-sm leading-6">
                <p className="text-gray">
                  I agree with{" "}
                  <a className=" text-blue-600">Terms of Service</a> and{" "}
                  <a className=" text-blue-600">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
