import { ActionUnion, createAction } from 'modules/redux-store';
import { LoadingActionTypes } from '.';

export const LoadingActions = {
    Start: (name: string) => createAction(LoadingActionTypes.Start, { name }),
    Stop: (name: string) => createAction(LoadingActionTypes.Stop, { name }),
};

export type LoadingActions = ActionUnion<typeof LoadingActions>;
