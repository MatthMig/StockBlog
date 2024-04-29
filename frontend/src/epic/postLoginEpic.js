import { ofType, ActionsObservable } from "redux-observable";
import { map, switchMap, catchError } from "rxjs/operators";
import { POST_LOGIN, postLoginSuccess, postLoginFailure } from "./actions";
import { of } from "rxjs";
import { ajax, AjaxError, AjaxResponse } from "rxjs/ajax";
import { AnyAction } from "redux";

const postLoginEpic = (action$) =>
  action$.pipe(
    ofType(POST_LOGIN),
    switchMap((action) =>
      ajax({
        url: `v1/login`,
        method: "POST",
        body: action.payload,
        headers: { "Content-Type": "appliction/json" }
      }).pipe(
        map((res) => postLoginSuccess(res.response)),
        catchError((error) => of(postLoginFailure(error.message)))
      )
    )
  );

export default postLoginEpic;
