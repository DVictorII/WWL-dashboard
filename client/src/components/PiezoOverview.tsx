import React, { useState } from "react";
import PiezoCard from "./PiezoCard";

interface GlobalMapState {
  status: string | number;
  paddock: string;
  piezo: string;
  date: string;
}

interface PiezoOverviewProps {
  globalMapStateDisplay: GlobalMapState;
  setGlobalStateStatus: (newStatus: string | number) => void;
  changeMapType: (type: string) => void;
  mapType: string;
}

function PiezoOverview({
  globalMapStateDisplay,
  setGlobalStateStatus,
  changeMapType,
  mapType,
}: PiezoOverviewProps) {
  const selectStatusCard = (statusID: number) => {
    setGlobalStateStatus(statusID);
    changeMapType("piezometers");
  };

  const returnStatusToNormal = () => {
    setGlobalStateStatus("All");
  };

  const selectIncidents = () => {
    returnStatusToNormal();
    changeMapType("incidents");
  };

  return (
    <div className="grid grid-cols-1 sz450:grid-cols-2 sz900:grid-cols-3 gap-x-8 gap-y-12 2xl:gap-x-12 2xl:gap-y-16 3xl:gap-x-20 3xl:gap-y-28 mt-12 2xl:mt-20">
      <PiezoCard
        title="ACTIVE PIEZO"
        number={49}
        icon="active"
        color="#477C9A"
        statusID={1}
        selectStatusCard={selectStatusCard}
        returnStatusToNormal={returnStatusToNormal}
        isActive={globalMapStateDisplay.status == 1}
      />

      <PiezoCard
        title="DAMAGED PIEZO"
        number={14}
        icon="damaged"
        color="#E11E1E"
        statusID={2}
        selectStatusCard={selectStatusCard}
        returnStatusToNormal={returnStatusToNormal}
        isActive={globalMapStateDisplay.status == 2}
      />
      <PiezoCard
        title="DISCONN. PIEZO"
        number={17}
        icon="disconnected"
        color="#DBC719"
        statusID={3}
        selectStatusCard={selectStatusCard}
        returnStatusToNormal={returnStatusToNormal}
        isActive={globalMapStateDisplay.status == 3}
      />
      <PiezoCard
        title="PROPOSED PIEZO"
        number={12}
        icon="proposed"
        color="#849A47"
        statusID={4}
        selectStatusCard={selectStatusCard}
        returnStatusToNormal={returnStatusToNormal}
        isActive={globalMapStateDisplay.status == 4}
      />
      <PiezoCard
        title="TARPS"
        number={0}
        icon="tarps"
        color="#37AC74"
        statusID={5}
        selectStatusCard={selectStatusCard}
        returnStatusToNormal={returnStatusToNormal}
        isActive={globalMapStateDisplay.status == 5}
      />
      <PiezoCard
        title="DAILY INCIDENTS"
        number={1}
        level="Low"
        icon="incidents"
        color="#831B1B"
        statusID={6}
        selectStatusCard={selectStatusCard}
        returnStatusToNormal={returnStatusToNormal}
        isActive={mapType === "incidents"}
        isIncidentsCard
        selectIncidents={selectIncidents}
      />
    </div>
  );
}

export default PiezoOverview;
