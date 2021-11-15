import { ActionReducer, INIT, MetaReducer } from '@ngrx/store';
import { signoutUser } from './actions/user/user.actions';

export function signout<State extends {}>(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return (state, action) => {
    if (action != null && action.type === signoutUser.type) {
      return reducer(undefined, { type: INIT });
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [signout];
