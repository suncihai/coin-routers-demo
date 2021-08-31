import { Epic } from "redux-observable";
import { of } from "rxjs";
import { map, mergeMap, filter, catchError } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";

import { getAssetsAction } from "../actions/assetsActions";
import { getAssets } from "../api/getAssetsApi";
import { errorHandler } from "../helpers/errorHandler";
import { State } from "../types/State";

type RootActions = ActionType<typeof getAssetsAction>;

export const getAssetsEpic: Epic<RootActions, RootActions, State> = (action$) =>
  action$.pipe(
    filter(isActionOf(getAssetsAction.request)),
    mergeMap(() =>
      getAssets().pipe(
        map((data) => getAssetsAction.success(data)),
        catchError((e) => {
          errorHandler(e);
          return of(getAssetsAction.failure());
        })
      )
    )
  );
