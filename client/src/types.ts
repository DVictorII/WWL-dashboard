export interface Information {
  paddock: string;
  piezo: string;
  days: number;
  chartType: string;
}

export interface ReportDetails {
  report_photo:string;
  report_date: string;
  report_description: string;
  report_id: string;
  report_paddock: string;
  report_piezo: string;
  report_title: string;
  report_supervisors: string[];
  user_id: number;
  user_name: string;
  user_picture: string;
  user_username: string;
}

export interface IncidentDetails {
  incident_photo:string;
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
