export interface Information {
  paddock: string;
  piezo: string;
  days: number;
  chartType: string;
}

export interface PiezoDataListI {
  id: string;
  paddock: string;
  section: string;
  reading: null | string | number | 0;
  pressureLimit?: null | string | number;
  floodTime?: null | string;
  lastReadingDate?: string;
  depth: null | string | number;
  status: number;
  coordinates: string[];
}

export interface ReportDetails {
  report_photo: string;
  report_date: string;
  report_description: string;
  report_id: string;
  report_paddock: string;
  report_piezo: string;
  report_title: string;
  report_supervisors: string[];
  report_time_span: string;
  report_readings_information: string;

  user_id: number;
  user_name: string;
  user_picture: string;
  user_username: string;
}

export interface IncidentDetails {
  incident_photo: string;
  incident_date: string;
  incident_description: string;
  incident_id: string;
  incident_paddock: string;

  incident_latitude: number | string;
  incident_longitude: number | string;
  incident_elevation: number | string;

  incident_title: string;
  incident_supervisors: string[];

  user_id: number;
  user_name: string;
  user_picture: string;
  user_username: string;
}

export interface PiezometerDataI {
  channel: number;
  cptu: string;
  datalogger: number;
  depth: string;
  id: string;
  lat: string;
  lon: string;
  paddock: string;
  section: string;
  serial: number;
  status: number;

  east_utm: string;
  north_utm: string;
  elevation: string;
  initial_depth: string;
  tarps_value: string;
  time_threshold_wrong: string;
}

export interface LastReadingsI {
  channel: number;
  node: number;
  pressure: string;
  temperature: string;
  time: string;
}
