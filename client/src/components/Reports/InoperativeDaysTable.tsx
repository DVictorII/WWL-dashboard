import moment from "moment";

function InoperativeDaysTable({
  inoperativeDates,
}: {
  inoperativeDates: {
    currentDate: string;
    inoperativeDays: string;
    nextDate: string;
  }[];
}) {
  return (
    <div
      className={`w-full h-[19rem] overflow-y-auto rounded-lg border-2 bg-white border-damaged-dark`}
    >
      <table className="select-none w-full border-collapse bg-white">
        <thead>
          <tr
            className={`w-full flex items-center px-4 xl:px-8  text-xs h-12  font-medium text-white bg-damaged-dark`}
          >
            <th className="flex items-center gap-x-2 ">
              <span className="text-[11px] md:text-xs text-start leading-relaxed">
                Inoperative days
              </span>
            </th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {inoperativeDates && inoperativeDates.length > 0 ? (
            <>
              {inoperativeDates.map((obj, i) => (
                <tr
                  style={{
                    backgroundColor: i % 2 === 0 ? "#F0D1D1" : "#fff",
                  }}
                  className="w-full flex items-center px-4 xl:px-8  h-12 bg-white "
                >
                  <th className="w-full flex items-center gap-x-3">
                    <span className="text-[9px] md:text-[10px]">
                      {obj.inoperativeDays} days:
                    </span>
                    <span className="text-[9px] md:text-[10px]">
                      From{" "}
                      {moment(obj.currentDate).format(
                        "MMM DD, YYYY [at] HH:mm"
                      )}
                    </span>
                    <span className="text-[9px] md:text-[10px]">
                      to{" "}
                      {moment(obj.nextDate).format("MMM DD, YYYY [at] HH:mm")}
                    </span>
                  </th>
                </tr>
              ))}
            </>
          ) : (
            <tr
              //   style={{
              //     backgroundColor:
              //       i % 2 === 0 ? selectedStatus.lightColor : "#fff",
              //   }}
              className="w-full h-[16rem] flex items-center px-4 xl:px-8  bg-white "
            >
              <th className="w-full h-full flex items-center justify-center gap-x-2 ">
                <span className="text-xs">
                  Everything ok! No inoperative days for the current days span.
                </span>
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InoperativeDaysTable;
