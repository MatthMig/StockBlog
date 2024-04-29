import { combineEpics } from "redux-observable";
import postLoginEpic from "./postLoginEpic";

const postLoginEpic = [postLoginEpic];

export default combineEpics(...postLoginEpic);
