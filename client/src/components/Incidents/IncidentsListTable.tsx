import React from 'react'
import { IncidentDetails } from '../../types'
import { BsArrowDownUp, BsTrash } from 'react-icons/bs'
import moment from 'moment'
import { Link } from 'react-router-dom'

function IncidentsListTable({incidents}:{incidents:IncidentDetails[]}) {
  return (
    <div
      className={`max-w-[1000vh] h-[21rem] sm:h-[24.5rem] md:h-[28rem] overflow-x-auto rounded-lg border-2 bg-white border-[#451919]`}
    >
      <table className=" select-none w-full border-collapse bg-white">
        <thead>
          <tr
            className={`w-full flex items-center px-8 whitespace-nowrap  gap-x-10 md:gap-x-12 justify-evenly  h-14  font-medium text-white bg-[#451919]`}
          >
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center ">
              <span className="text-[11px] md:text-xs">N°</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center ">
              <span className="text-[11px] md:text-xs">Created by</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span className="text-[11px] md:text-xs">Incident title</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span className="text-[11px] md:text-xs">Report date</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span className="text-[11px] md:text-xs">Incident location</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span className="text-[11px] md:text-xs">At paddock</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center"></th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center"></th>
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center"></th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {incidents.map((incident, i) => (
            <tr key={incident.incident_id} style={{
              backgroundColor: i%2===0 ? "#F2E8E8" : "white"
            }} className="w-full flex items-center justify-evenly whitespace-nowrap gap-x-10 md:gap-x-12 px-8  text-[9px] md:text-[10px] h-14 bg-white ">
              <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
                <span className="text-xs">{String(i+1).padStart(2,"0")}.</span>
              </th>

              <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
                <div className="w-6 h-6 border border-[#333] rounded-full flex items-center justify-center">
                  <img src={`/media/img/photos/${incident.user_picture}`} />
                </div>
                <span>{incident.user_name}</span>
              </th>

              <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center ">
                <span>{incident.incident_title}</span>
              </th>

              <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
                <span>{moment(incident.incident_date).format("MMM DD, YYYY")}</span>
              </th>

              <th className="flex flex-col items-center gap-y-1 w-36 md:w-40 justify-center">
                <span>
                  {incident.incident_latitude}°,
                </span>
                

                <span>
                {incident.incident_longitude}°
                </span>
              </th>

              <th className="flex items-center gap-x-1 w-36 md:w-40 justify-center">
                <span>
                  {incident.incident_paddock} 
                </span>
                
              </th>

              <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
                <Link to={`/reports/incidents/${incident.incident_id}`}>
                <span className="text-[11px] md:text-xs text-orange-600  border-b-2 border-orange-600  hover:text-orange-800 hover:border-orange-800 transition-all cursor-pointer">
                  View
                </span>
                
                </Link>
              </th>

              <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
                <span className="text-[11px] md:text-xs text-orange-600 border-b-2 border-orange-600  hover:text-orange-800 hover:border-orange-800 transition-all cursor-pointer">
                  Edit
                </span>
              </th>
              <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
                <div className=" w-7 h-7 md:w-9 md:h-9 bg-damaged-normal hover:bg-opacity-30 transition-all cursor-pointer  bg-opacity-20 rounded-full flex items-center justify-center">
                  <BsTrash className="h-3 w-3 md:w-4 md:h-4 text-damaged-dark" />
                </div>
              </th>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default IncidentsListTable