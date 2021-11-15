// import { CommentEffects } from '../contribution/store/effects/comment/comment.effects';
import { ReportEffects } from '../contribution/store/effects/report/report.effects';
import { DisasterEffects } from '../ews/store/effects/disaster/disaster.effects';
import { PersonPasswordEffects } from '../person/store/effects/password/password.effects';
import { PersonSecurecodeEffects } from '../person/store/effects/securecode/securecode.effects';
import { PersonUserEffects } from '../person/store/effects/user/user.effects';
import { HazardEffects } from '../threat/store/effects/hazard/hazard.effects';
import { CommentEffects } from '../generic/store/effects/comment/comment.effects';
import { SafetyCheckEffects } from '../generic/store/effects/safetycheck/safetycheck.effects';
import { HazardMapEffects } from '../threat/store/effects/hazard-map/hazard-map.effects';
import { SafetyCheckMapEffects } from '../generic/store/effects/safetycheck-map/safetycheck-map.effects';
import { ActivitySafetyCheckEffects } from '../folder/activity/store/effects/safetycheck/safetycheck.effects';

export const AppEffects = [
  PersonSecurecodeEffects,
  PersonUserEffects,
  PersonPasswordEffects,
  DisasterEffects,
  ReportEffects,
  // CommentEffects,
  HazardEffects,
  HazardMapEffects,
  CommentEffects,
  SafetyCheckEffects,
  SafetyCheckMapEffects,
  ActivitySafetyCheckEffects,
];
