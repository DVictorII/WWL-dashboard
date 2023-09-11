import { BsArrowDownUp } from "react-icons/bs";
import { s3StaticFilesLinks } from "../../utils/globalLinks";

const workers = [
  {
    profileImg: "undraw_profile_2.svg",
    name: "Worker 1",
    position: "Frontend Developer",
    entryDate: "2016/05/27",
    contractType: "Full Time",
    experience: "7 years",
    overwork: "12%",
  },

  {
    profileImg: "undraw_profile_3.svg",
    name: "Worker 2",
    position: "Backend Developer",
    entryDate: "2018/04/27",
    contractType: "Part Time",
    experience: "1 year",
    overwork: "12%",
  },

  {
    profileImg: "undraw_profile_1.svg",
    name: "Worker 3",
    position: "Dev-Ops",
    entryDate: "2021/01/27",
    contractType: "Full Time",
    experience: "10 years",
    overwork: "12%",
  },

  {
    profileImg: "undraw_profile_2.svg",
    name: "Worker 4",
    position: "Team Leader",
    entryDate: "2020/12/27",
    contractType: "Full Time",
    experience: "5 years",
    overwork: "12%",
  },

  {
    profileImg: "undraw_profile_3.svg",
    name: "Worker 5",
    position: "Frontend Developer",
    entryDate: "2015/10/27",
    contractType: "Part Time",
    experience: "1 year",
    overwork: "12%",
  },

  {
    profileImg: "undraw_profile_1.svg",
    name: "Worker 6",
    position: "Full-stack Developer",
    entryDate: "2014/07/27",
    contractType: "Full Time",
    experience: "4 years",
    overwork: "12%",
  },
];

function MembersInformationTable() {
  return (
    <div className=" max-w-full max-h-fit ">
      <div
        // className={` overflow-y-scroll overflow-x-scroll h-fit max-h-96 mt-5 mb-4    pb-5  `}
        className={` overflow-y-scroll overflow-x-scroll h-fit max-h-[16rem] 2xl:max-h-[21rem]   mb-4   pb-5  rounded-sm border-b border-[#451919]`}
      >
        <table className="min-w-max border-separate border-spacing-0">
          <thead>
            <th className="sticky top-0 text-center px-4 py-2  lg:py-4   border-b bg-white  border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">N°</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2  lg:py-4  border-b bg-white  border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">Name</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2  lg:py-4  border-b bg-white  border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">Position</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2  lg:py-4  border-b bg-white  border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">Entry date</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2  lg:py-4  border-b bg-white  border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">Contract type</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2  lg:py-4  border-b bg-white  border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">Experience</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2  lg:py-4  border-b bg-white  border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">Overwork</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>
          </thead>

          <tbody className="bg-white text-[#444]  ">
            {workers.map((worker, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#F2E8E8" : "white",
                }}
              >
                <td className="px-4 py-2  lg:py-4">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-bold">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                </td>

                <td className="px-4 py-2  lg:py-4">
                  <div className="flex items-center gap-x-2">
                    <div className="w-6 h-6 border border-[#333] rounded-full flex items-center justify-center">
                      <img
                        src={`${s3StaticFilesLinks.baseURL}/${s3StaticFilesLinks.userProfilePictures}/${worker.profileImg}`}
                      />
                    </div>
                    <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                      {worker.name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-2  lg:py-4">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                    {worker.position}
                  </span>
                </td>

                <td className="px-4 py-2  lg:py-4">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                    {worker.entryDate}
                  </span>
                </td>

                <td className="px-4 py-2  lg:py-4">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                    {worker.contractType}
                  </span>
                </td>

                <td className="px-4 py-2  lg:py-4">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                    {worker.experience}
                  </span>
                </td>

                <td className="px-4 py-2  lg:py-4">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                    {worker.overwork}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MembersInformationTable;
