import { environment } from 'src/environments/environment';

const EWS = 'ews/v1/';
const CONTRIBUTION = 'contribution/v1/';
const THREAT = 'threat/v1/';
const GENERIC = 'generic/v1/';

export const Endpoints = {
  scraper_bnpb_dipi: environment.endpoint + EWS + 'scraper/bnbp-dipi/',
  disaster: environment.endpoint + EWS + 'disasters/',
  report: environment.endpoint + CONTRIBUTION + 'reports/',
  // comment: environment.endpoint + CONTRIBUTION + 'comments/',
  hazard: environment.endpoint + THREAT + 'hazards/',
  hazard_coordinate: environment.endpoint + THREAT + 'hazards/coordinates/',
  attachment: environment.endpoint + GENERIC + 'attachments/',
  comment: environment.endpoint + GENERIC + 'comments/',
  safetycheck: environment.endpoint + GENERIC + 'safetychecks/',
  safetycheck_coordinate:
    environment.endpoint + GENERIC + 'safetychecks/coordinates/',
};
