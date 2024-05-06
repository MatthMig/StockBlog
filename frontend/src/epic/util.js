import { ajax, AjaxRequest } from "rxjs/ajax";

const API_URL = process.env.REACT_APP_API_URL;

const DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};

export function createAction(action) {
  return [`${action}`, `${action}_SUCCESS`, `${action}_FAILURE`];
}

export function _ajax(options) {
  options.url = API_URL + options.url;
  options.headers = { ...DEFAULT_HEADERS, ...options.headers };
  return ajax(options);
}
