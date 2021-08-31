import { ajax, AjaxResponse } from "rxjs/ajax";
import { map } from "rxjs/operators";

export const removeEmptyParams = (obj: { [key: string]: unknown }) =>
  Object.keys(obj).reduce(
    (acc, key) =>
      obj[key] !== undefined && obj[key] !== "" && obj[key] !== null
        ? { [key]: obj[key], ...acc }
        : acc,
    {}
  );

const defaultHeaders = {
  "Content-type": "application/json; charset=UTF-8",
  "X-Requested-With": "XMLHttpRequest",
  Accept: "application/json",
};

export const get$ = <T = undefined>(
  url: string,
  params?: { [key: string]: unknown }
) =>
  ajax({
    url,
    method: "GET",
    headers: defaultHeaders,
  }).pipe(map((data: AjaxResponse): T => data.response));

export const post$ = <T = undefined>(
  url: string,
  body?: { [key: string]: unknown } | string,
  params?: { [key: string]: unknown },
  headers?: { [key: string]: unknown }
) =>
  ajax({
    url,
    method: "POST",
    headers: { ...defaultHeaders, ...headers },
    body,
  }).pipe(map((data: AjaxResponse): T => data.response));

export const put$ = <T = undefined>(
  url: string,
  body?: { [key: string]: unknown } | string,
  params?: { [key: string]: unknown }
) =>
  ajax({
    url,
    method: "PUT",
    headers: defaultHeaders,
    body,
  }).pipe(map((data: AjaxResponse): T => data.response));

export const del$ = <T = undefined>(
  url: string,
  body?: { [key: string]: unknown },
  params?: { [key: string]: unknown }
) =>
  ajax({
    url,
    method: "DELETE",
    headers: defaultHeaders,
    body,
  }).pipe(map((data: AjaxResponse): T => data.response));

export const patch$ = <T = undefined>(
  url: string,
  body?: { [key: string]: unknown } | string,
  params?: { [key: string]: unknown }
) =>
  ajax({
    url,
    method: "PATCH",
    headers: defaultHeaders,
    body,
  }).pipe(map((data: AjaxResponse): T => data.response));
