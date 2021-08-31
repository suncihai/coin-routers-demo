import { combineEpics } from "redux-observable";

import { getAssetsEpic } from "../epics/getAssetsEpic";
import {
  assetWebSocketsConnectEpic,
  assetWebSocketsDisconnectEpic,
  MessageListenerEpic,
} from "../epics/assetWebSocketsEpic";

export const epics = combineEpics(
  assetWebSocketsConnectEpic,
  assetWebSocketsDisconnectEpic,
  MessageListenerEpic,
  getAssetsEpic
);
