import React from "react";

const Info = () => {
  return (
    <div class="flex py-10 gap-10 justify-center items-center h-screen">
      <div class="flex p-10 font-bold">
        <a
          className="m-5 text-black text-xl hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2"
          href="/info/drivers"
        >
          Drivers
        </a>
        <div class="vertical-divider py-5">&nbsp;</div>
        <a
          className="m-5 text-black text-xl hover:text-red-700 border-transparent border-b-2 hover:border-black hover:border-b-2"
          href="/info/teams"
        >
          Teams
        </a>
      </div>
    </div>
  );
};

export default Info;
