import React from "react";
import { useMenuStore } from "../../store/DesktopSidebarStore";
import { useConfirmationModalStore } from "../../store/ConfirmationModalStore";
import { useGloblalUserStore } from "../../store/GlobalUserStore";
import { BiLogOut } from "react-icons/bi";

function TopBarProfileComp() {
  const closeMenu = useMenuStore((state) => state.closeMenu);

  const openLogOutModal = useConfirmationModalStore(
    (state) => state.openLogOutModal
  );

  const currentUser = useGloblalUserStore((state) => state.currentUser);

  return (
    <div className="flex items-center gap-x-2">
      {currentUser ? (
        <>
          <div className="w-10 h-10 rounded-full border border-white">
            <img
              src={`/media/img/photos/${
                currentUser.picture || "undraw_profile_1.svg"
              }`}
              alt={`${currentUser.name} profile picture`}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="font-bold">{currentUser.name}</span>
            <span className="text-xs text-[#ccc]">
              ({currentUser.username})
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="w-10 h-10 rounded-full border border-white">
            <img
              src={`/media/img/photos/undraw_profile_1.svg`}
              alt="user photo"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="font-bold">Guest user</span>
            <span className="text-xs text-[#ccc]">(guest_user1809)</span>
          </div>
        </>
      )}
    </div>
  );
}

export default TopBarProfileComp;
