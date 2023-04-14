import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DesktopLink from "./DesktopLink";
import DesktopSubLink from "./DesktopSubLink";
import UserIDCard from "./UserIDCard";

function DesktopSidebar() {
  // const router = useRouter();
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className=" 2xl:col-span-2 relative hidden lg:inline w-full pr-4 border-r border-[#222] border-opacity-20">
      <div>
        <div className="w-32 lg:w-36 xl:w-44 2xl:w-52   relative rounded-md overflow-hidden">
          <img
            src="/static/img/rossing_logo.png"
            className="w-full object-contain"
          />
        </div>

        <div className="mt-16 flex flex-col gap-y-10">
          <UserIDCard />

          <div className="flex flex-col gap-y-8">
            <DesktopLink
              title="Dashboard"
              icon="dashboard"
              linkTo="/"
              hasSubLinks={false}
              isCurrentPage={currentPage === "/"}
            />
            <DesktopLink
              title="Monitoring Chart"
              icon="chart"
              linkTo="/paddock-lectures"
              hasSubLinks={false}
              isCurrentPage={currentPage === "/paddock-lectures"}
            />

            <div>
              <DesktopLink
                title="Reports"
                icon="reports"
                hasSubLinks={true}
                isCurrentPage={false}
              />

              <div className="flex flex-col gap-y-4  mt-4">
                <DesktopSubLink
                  title="Piezometers"
                  linkTo="/reports/piezometers"
                  isCurrentPage={currentPage.startsWith("/reports/piezometers")}
                />
                <DesktopSubLink
                  title="Incidents"
                  linkTo="/reports/incidents"
                  isCurrentPage={currentPage.startsWith("/reports/incidents")}
                />

                <DesktopSubLink
                  title="Visits"
                  linkTo="/biannual-visits"
                  isCurrentPage={currentPage.startsWith("/biannual-visits")}
                />
              </div>
            </div>
            <div>
              <DesktopLink
                title="Account"
                icon="account"
                hasSubLinks={true}
                isCurrentPage={false}
              />
              <div className="flex flex-col gap-y-4  mt-4">
                <DesktopSubLink
                  title="Log Out"
                  isAccountLogOut
                  isCurrentPage={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopSidebar;
