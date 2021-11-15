import { ActionReducerMap } from '@ngrx/store';
//import {
//  CommentReducer,
//  CommentState,
//} from '../contribution/store/reducers/comment/comment.reducer';
import {
  ReportReducer,
  ReportState,
} from '../contribution/store/reducers/report/report.reducer';
import {
  DisasterReducer,
  DisasterState,
} from '../ews/store/reducers/disaster/disaster.reducer';
import {
  PersonPasswordReducer,
  PersonPasswordState,
} from '../person/store/reducers/password/password.reducer';
import {
  PersonSecurecodeReducer,
  PersonSecurecodeState,
} from '../person/store/reducers/securecode/securecode.reducer';
import {
  PersonUserReducer,
  PersonUserState,
} from '../person/store/reducers/user/user.reducer';
import {
  HazardReducer,
  HazardState,
} from '../threat/store/reducers/hazard/hazard.reducer';
import {
  CommentReducer,
  CommentState,
} from '../generic/store/reducers/comment/comment.reducer';
import {
  SafetyCheckReducer,
  SafetyCheckState,
} from '../generic/store/reducers/safetycheck/safetycheck.reducer';
import {
  HazardMapReducer,
  HazardMapState,
} from '../threat/store/reducers/hazard-map/hazard-map.reducer';
import {
  SafetyCheckMapReducer,
  SafetyCheckMapState,
} from '../generic/store/reducers/safetycheck-map/safetycheck-map.reducer';
import {
  ActivitySafetyCheckReducer,
  ActivitySafetyCheckState,
} from '../folder/activity/store/reducers/safetycheck/safetycheck.reducer';

// STATE
export interface AppState {
  person_securecode: PersonSecurecodeState;
  person_user: PersonUserState;
  person_password: PersonPasswordState;

  disaster: DisasterState;
  report: ReportState;
  // comment: CommentState;
  hazard: HazardState;
  hazard_map: HazardMapState;

  comment: CommentState;
  safetycheck: SafetyCheckState;
  safetycheck_map: SafetyCheckMapState;

  activity_safetycheck: ActivitySafetyCheckState;
}

// REDUCERS
export const AppReducers: ActionReducerMap<AppState> = {
  person_securecode: PersonSecurecodeReducer,
  person_user: PersonUserReducer,
  person_password: PersonPasswordReducer,

  disaster: DisasterReducer,
  report: ReportReducer,
  // comment: CommentReducer,
  hazard: HazardReducer,
  hazard_map: HazardMapReducer,

  comment: CommentReducer,
  safetycheck: SafetyCheckReducer,
  safetycheck_map: SafetyCheckMapReducer,

  activity_safetycheck: ActivitySafetyCheckReducer,
};
