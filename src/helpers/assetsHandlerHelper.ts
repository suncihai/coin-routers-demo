import _ from "lodash";
import { BidProps, AskProps } from "../types/Asset";

const dataFeedLength = 50;
const orderBookLength = 20;

export const getDataFeedBids = (
  dataFeed: number[],
  bids: BidProps
): number[] => {
  dataFeed.push(Number(bids.bidPrice));
  _.size(dataFeed) > dataFeedLength && dataFeed.shift();
  return [...dataFeed];
};

export const getDataFeedAsks = (
  dataFeed: number[],
  asks: AskProps
): number[] => {
  dataFeed.push(Number(asks.askPrice));
  _.size(dataFeed) > dataFeedLength && dataFeed.shift();
  return [...dataFeed];
};

export const getOrderBookBids = (
  orderBook: BidProps[],
  bids: BidProps
): BidProps[] => {
  orderBook.push(bids);
  _.size(orderBook) > orderBookLength && orderBook.shift();
  orderBook.sort((a, b) => Number(a.bidPrice) - Number(b.bidPrice));
  return [...orderBook];
};

export const getOrderBookAsks = (
  orderBook: AskProps[],
  asks: AskProps
): AskProps[] => {
  orderBook.push(asks);
  _.size(orderBook) > orderBookLength && orderBook.shift();
  orderBook.sort((a, b) => Number(b.askPrice) - Number(a.askPrice));
  return [...orderBook];
};
