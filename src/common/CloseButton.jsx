import { memo } from "react";

const CloseButton = ({ onClick, backgroundColor, isMobMenuOpen }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: backgroundColor }}
      className="group flex items-center justify-center relative cursor-pointer size-[24px] rounded-full"
    >
      <span
        className={`absolute block h-[2px] w-[19px] bg-black rounded-sm rotate-45 group-hover:rotate-0 duration-300 ${
          isMobMenuOpen ? "bg-green-600" : "bg-black"
        }`}
      ></span>
      <span
        className={`absolute block h-[2px] w-[19px] bg-black rounded-sm -rotate-45 group-hover:rotate-0 duration-300 ${
          isMobMenuOpen ? "bg-green-600" : "bg-black"
        }`}
      ></span>
    </button>
  );
};

export default memo(CloseButton);
