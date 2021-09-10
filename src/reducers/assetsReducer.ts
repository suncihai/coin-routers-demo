import { ActionType, createReducer } from "typesafe-actions";
import * as assetsActions from "../actions/assetsActions";
import { AssetProps } from "../types/Asset";

export const commonInitState: AssetProps = {
  assets: [],
  asset: "BTC-USD",
  assetsStream: {
    type: "",
    product_id: "",
    changes: [],
    time: "",
  },
  balance: 100000,
  bidBest: {
    productId: "BTC-USD",
    bidPrice: "",
    bidAmount: "",
  },
  buyOrder: {
    price: 0,
    amount: 0
  },
  sellOrder: {
    price: 0,
    amount: 0
  },
  askBest: {
    productId: "BTC-USD",
    askPrice: "",
    askAmount: "",
  },
  dataFeedBids: [],
  dataFeedAsks: [],
  orderBookBids: [],
  orderBookAsks: [],
  orders: [],
};

export const assetsReducer = createReducer<
  AssetProps,
  ActionType<typeof assetsActions>
>(commonInitState)
  .handleAction(assetsActions.updateBidBestAction, (state, { payload }) => ({
    ...state,
    bidBest: payload,
  }))
  .handleAction(assetsActions.updateAskBestAction, (state, { payload }) => ({
    ...state,
    askBest: payload,
  }))
  .handleAction(assetsActions.dataFeedBidsAction, (state, { payload }) => ({
    ...state,
    dataFeedBids: payload,
  }))
  .handleAction(assetsActions.dataFeedAsksAction, (state, { payload }) => ({
    ...state,
    dataFeedAsks: payload,
  }))
  .handleAction(assetsActions.orderBookBidsAction, (state, { payload }) => ({
    ...state,
    orderBookBids: payload,
  }))
  .handleAction(assetsActions.orderBookAsksAction, (state, { payload }) => ({
    ...state,
    orderBookAsks: payload,
  }))
  .handleAction(assetsActions.updateAssetAction, (state, { payload }) => ({
    ...state,
    asset: payload,
  }))
  .handleAction(assetsActions.buyOrderAction, (state, { payload }) => ({
    ...state,
    buyOrder: payload,
  })).handleAction(assetsActions.sellOrderAction, (state, { payload }) => ({
    ...state,
    sellOrder: payload,
  })).handleAction(assetsActions.orderAction, (state, { payload }) => ({
    ...state,
    orders: [...state.orders, payload],
  }));
