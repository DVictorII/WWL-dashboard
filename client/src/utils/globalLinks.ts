export const s3StaticFilesLinks = {
  baseURL: "https://rossing.s3.ap-southeast-2.amazonaws.com",

  userProfilePictures: "users_profile_picture",
  piezoReports: "piezo_reports",
  incidentReports: "incident_reports",
  layoutImages: "layout_images",
  biannualVisits: "biannual_visits",
  overviewReports: "overview_reports",
  excelReports: "excel_reports",
};

export const pageStructureLinks = {
  operations: {
    baseURL: "/operations",
    monitoringMap: "/operations/monitoring-map",
    piezometerReadings: "operations/piezometer-readings",

    piezoReportsBase: "/operations/reports/piezometers",
    incidentsBase: "/operations/reports/incidents",

    newPiezoReport: "/operations/reports/piezometers/new-report",
    newIncidentReport: "/operations/reports/incidents/new-incident",

    biannualVisits: "/operations/biannual-visits",
  },

  business: {
    baseURL: "/business",
    stocksTracking: "/business/stocks-tracking",
  },

  staffTraining: {
    baseURL: "/staff-training",
    teamInformation: "/staff-training/team-information",
  },
};
