/* eslint-disable @typescript-eslint/no-use-before-define */
import { EventEmitter } from "fbemitter";
import { Observable } from "rxjs";

declare global {
  interface Window {
    eventEmitter: EventEmitter;
  }
}

export const emit = (type: string, props?: Record<string, unknown>) =>
  getEventEmitter().emit(type, props);

export const addListener = (event: string, func: () => void) =>
  getEventEmitter().addListener(event, func);

export const getEventEmitter = () =>
  window.eventEmitter || createEventEmitter();

const createEventEmitter = () => {
  //  We need to store event emitter across application
  window.eventEmitter = new EventEmitter();

  return window.eventEmitter;
};

export const createEventEmitterObserver$ = <T>(event: string) =>
  new Observable<T>((subscribe) => {
    const eventEmitter = getEventEmitter();

    const listener = eventEmitter.addListener(event, (args: T) =>
      subscribe.next(args)
    );

    return () => listener.remove();
  });
