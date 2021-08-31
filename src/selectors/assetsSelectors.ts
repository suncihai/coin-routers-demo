import { State } from "../types/State";

export const select = (state: State) => state.asset;
export const selectAsset = (state: State) => select(state).asset;

export const selectBidBest = (state: State) => select(state).bidBest;
export const selectAskBest = (state: State) => select(state).askBest;
export const selectDataFeedBids = (state: State) => select(state).dataFeedBids;
export const selectDataFeedAsks = (state: State) => select(state).dataFeedAsks;
export const selectOrderBookBids = (state: State) =>
  select(state).orderBookBids;
export const selectOrderBookAsks = (state: State) =>
  select(state).orderBookAsks;
