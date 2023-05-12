import Image from "next/image";

import LogoImg from "../public/acs-logo.png";

const logo = ({ color }) => {
  return (
    <div className="flex items-end space-x-3 ">
      <Image
        src={LogoImg}
        alt="logo"
        className="h-auto w-10"
        color="white"
        priority
      />
      <div>
        <p
          className={
            " text-md font-noto  mb-0 text-left lg:text-base" +
            (color === "white" ? " text-gray-100" : " text-primary")
          }
        >
          አዲስ አበባ ካቶሊክ ሀገረ ስብከት
        </p>
        <p className="text-md mb-0 font-sans lg:text-base ">
          The Archdioceses of Addis Ababa
        </p>
      </div>
    </div>
  );
};

export default logo;
