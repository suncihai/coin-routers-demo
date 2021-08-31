/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from "@reduxjs/toolkit";
import { Action } from "redux";

type UniversalActionCreator<Type extends string> = {
    (...args: any[]): Action<Type>;
};

export type ActionType<
    TActionCreatorOrMap extends unknown
> = TActionCreatorOrMap extends UniversalActionCreator<string>
    ? ReturnType<TActionCreatorOrMap>
    : TActionCreatorOrMap extends Record<any, any>
    ? {
          [K in keyof TActionCreatorOrMap]: ActionType<TActionCreatorOrMap[K]>;
      }[keyof TActionCreatorOrMap] // eslint-disable-next-line @typescript-eslint/no-unused-vars
    : TActionCreatorOrMap extends infer R
    ? never
    : never;

type TypedActionCreator<Type extends string> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]): Action<Type>;
    type: Type;
};

export function isActionOf<AC extends TypedActionCreator<string>>(
    actionCreatorOrCreators: AC | AC[],
): (action: Action<string>) => action is ReturnType<AC> {
    const actionCreators = Array.isArray(actionCreatorOrCreators)
        ? actionCreatorOrCreators
        : [actionCreatorOrCreators];

    const assertFn = (action: Action<string>): action is ReturnType<AC> =>
        actionCreators.some((actionCreator) => action.type === actionCreator.type);

    return assertFn;
}

export function createAsyncToolkitAction<TRequest, TResponse, TFailure>(
    requestType: string,
    successType: string,
    failureType: string,
) {
    return {
        request: createAction<TRequest>(requestType),
        success: createAction<TResponse>(successType),
        failure: createAction<TFailure>(failureType),
    };
}
