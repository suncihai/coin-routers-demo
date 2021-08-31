import { createAction, createAsyncAction } from "typesafe-actions";
import { Asset, AskProps, BidProps } from "../types/Asset";

export const getAssetsAction = createAsyncAction(
  "GET_ASSETS_REQUEST",
  "GET_ASSETS_SUCCESS",
  "GET_ASSETS_ERROR"
)<undefined, Asset[], undefined>();

export const updateAssetAction = createAction("UPDATE_ASSET_ACTION")<string>();

export const assetsWebSocketConnectAction = createAction(
  "CONNECT_ASSETS_WEBSOCKET_ACTION"
)();

export const assetsWebSocketStartMessageAction = createAction(
  "START_MESSAGE_ASSETS_WEBSOCKET_ACTION"
)();

export const updateBidBestAction = createAction(
  "UPDATE_BID_BEST_ACTION"
)<BidProps>();

export const updateAskBestAction = createAction(
  "UPDATE_ASK_BEST_ACTION"
)<AskProps>();

export const dataFeedBidsAction = createAction("DATA_FEED_BIDS_ACTION")<
  number[]
>();

export const dataFeedAsksAction = createAction("DATA_FEED_ASKS_ACTION")<
  number[]
>();

export const orderBookBidsAction = createAction("ORDER_BOOK_BIDS_ACTION")<
  BidProps[]
>();

export const orderBookAsksAction = createAction("ORDER_BOOK_ASKS_ACTION")<
  AskProps[]
>();
