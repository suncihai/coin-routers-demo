import { combineEpics } from "redux-observable";

import { getAssetsEpic } from "../epics/getAssetsEpic";
import {
  assetWebSocketsConnectEpic,
  MessageListenerEpic,
} from "../epics/assetWebSocketsEpic";

export const epics = combineEpics(
  assetWebSocketsConnectEpic,
  MessageListenerEpic,
  getAssetsEpic
);
