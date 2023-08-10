import { useGloblalUserStore } from "../store/GlobalUserStore";

function UserIDCard() {
  const currentUser = useGloblalUserStore((state) => state.currentUser);

  return (
    <div className="flex items-center gap-x-2">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-12 md:h-12 2xl:w-16 2xl:h-16 flex justify-center items-center rounded-full border">
        <img
          src={
            currentUser
              ? `/static/img/${currentUser?.picture}`
              : `/static/img/undraw_profile_1.svg`
          }
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col ">
        <span className=" text-xs md:text-[10px] text-gray-400  2xl:text-[14px]">
          ADMINISTRATOR
        </span>
        <span className=" text-[18px] md:text-base font-semibold 2xl:text-xl">
          {currentUser ? currentUser?.name : "Log in"}
        </span>
      </div>
    </div>
  );
}

export default UserIDCard;
