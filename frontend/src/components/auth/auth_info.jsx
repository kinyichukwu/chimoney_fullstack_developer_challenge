import React from "react";

const AuthInfo = () => {
  return (
    <div className="flex-1 hidden lg:flex bg-[#121228] justify-center  flex-col min-h-screen">
      <div className="pl-[5.4%] pr-[4.6%] mb-28 flex items-center">
        <img src={"Logo"} alt="" className="" />
        <span className="text-xl font-bold text-white ml-4 block">i Money</span>
      </div>

      <div className="pl-[5.4%] pr-[4.6%]">
        <p className="text-white font-bold text-5xl">
          A software that is trained on{" "}
          <span className="text-[#00D871]">
            how you talk, communicate and respond to everything
          </span>{" "}
        </p>
      </div>

      <div className="pl-[5.4%] pr-[4.6%] mt-16">
        <p className="text-white text-lg font-normal ">
          Dictumst scelerisque ut commodo dis. Risus ac tellus sapien gravida
          sit elementum dui eget nunc. Eu arcu montes, sit elit, maecenas
          feugiat.
        </p>
      </div>
    </div>
  );
};

export default AuthInfo;
