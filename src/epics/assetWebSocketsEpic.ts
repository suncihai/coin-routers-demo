import { Epic } from "redux-observable";
import { merge } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { map, mergeMap, filter } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";
import { AssetMsgProps, BidProps, AskProps } from "../types/Asset";

import * as assetsActions from "../actions/assetsActions";
import {
  getEventEmitter,
  createEventEmitterObserver$,
} from "../services/eventEmitter";
import {
  getDataFeedBids,
  getDataFeedAsks,
  getOrderBookBids,
  getOrderBookAsks,
} from "../helpers/assetsHandlerHelper";
import { selectAsset } from "../selectors/assetsSelectors";
import { State } from "../types/State";

type ConnectActions = ActionType<
  typeof assetsActions.assetsWebSocketConnectAction
>;
type DisconnectActions = ActionType<
  typeof assetsActions.assetsWebSocketDisconnectAction
>;
const socket$ = webSocket<AssetMsgProps>("wss://ws-feed.pro.coinbase.com");
const eventEmitter = getEventEmitter();
const dataFeedBids: number[] = [];
const dataFeedAsks: number[] = [];
const orderBookBids: BidProps[] = [];
const orderBookAsks: AskProps[] = [];

let timer = 0;
setInterval(() => {
  timer += 10;
}, 10);

export const assetWebSocketsConnectEpic: Epic<
  ConnectActions,
  ConnectActions,
  State
> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(assetsActions.assetsWebSocketConnectAction)),
    mergeMap((action) => {
      const asset = selectAsset(state$.value);
      const assets$ = socket$.multiplex(
        () => ({
          type: "subscribe",
          product_ids: [asset],
          channels: ["level2", "heartbeat"],
        }),
        () => ({ unsub: action }),
        (msg) => msg === action
      );
      socket$.subscribe(
        (msg: AssetMsgProps) => {
          if (
            timer % 1000 === 0 &&
            msg.type === "l2update" &&
            msg.changes[0][0] === "sell"
          ) {
            const bidBest = {
              productId: msg.product_id,
              bidPrice: msg.changes[0][1],
              bidAmount: msg.changes[0][2],
            };
            eventEmitter.emit("MESSAGE_BID_BEST", bidBest);
            const feedBids = getDataFeedBids(dataFeedBids, bidBest);
            eventEmitter.emit("MESSAGE_DATA_FEED_BIDS", feedBids);
            const bookBids = getOrderBookBids(orderBookBids, bidBest);
            eventEmitter.emit("MESSAGE_ORDER_BOOK_BIDS", bookBids);
          }
          if (
            timer % 1000 === 0 &&
            msg.type === "l2update" &&
            msg.changes[0][0] === "buy"
          ) {
            const askBest = {
              productId: msg.product_id,
              askPrice: msg.changes[0][1],
              askAmount: msg.changes[0][2],
            };
            eventEmitter.emit("MESSAGE_ASK_BEST", askBest);
            const feedAsks = getDataFeedAsks(dataFeedAsks, askBest);
            eventEmitter.emit("MESSAGE_DATA_FEED_ASKS", feedAsks);
            const bookAsks = getOrderBookAsks(orderBookAsks, askBest);
            eventEmitter.emit("MESSAGE_ORDER_BOOK_ASKS", bookAsks);
          }
        },
        (error) => console.log("error", error),
        () => console.log("closed")
      );
      return assets$;
    })
  );

export const assetWebSocketsDisconnectEpic: Epic<
  DisconnectActions,
  DisconnectActions,
  State
> = (action$) =>
  action$.pipe(
    filter(isActionOf(assetsActions.assetsWebSocketDisconnectAction)),
    mergeMap((action) => {
      const assets$ = socket$.multiplex(
        () => ({
          type: "unsubscribe",
          product_ids: ["BTC-USD", "ETH-USD", "LTC-USD", "BCH-USD"],
          channels: ["level2", "heartbeat"],
        }),
        () => ({ unsub: action }),
        (msg) => msg === action
      );
      socket$.complete();
      return assets$;
    })
  );

export const MessageListenerEpic: Epic = (action$) =>
  action$.pipe(
    filter(isActionOf(assetsActions.assetsWebSocketStartMessageAction)),
    mergeMap(() =>
      merge(
        createEventEmitterObserver$<BidProps>("MESSAGE_BID_BEST").pipe(
          map((bid) => assetsActions.updateBidBestAction(bid))
        ),
        createEventEmitterObserver$<AskProps>("MESSAGE_ASK_BEST").pipe(
          map((ask) => assetsActions.updateAskBestAction(ask))
        ),
        createEventEmitterObserver$<number[]>("MESSAGE_DATA_FEED_BIDS").pipe(
          map((bids) => assetsActions.dataFeedBidsAction(bids))
        ),
        createEventEmitterObserver$<number[]>("MESSAGE_DATA_FEED_ASKS").pipe(
          map((asks) => assetsActions.dataFeedAsksAction(asks))
        ),
        createEventEmitterObserver$<BidProps[]>("MESSAGE_ORDER_BOOK_BIDS").pipe(
          map((bids) => assetsActions.orderBookBidsAction(bids))
        ),
        createEventEmitterObserver$<AskProps[]>("MESSAGE_ORDER_BOOK_ASKS").pipe(
          map((asks) => assetsActions.orderBookAsksAction(asks))
        )
      )
    )
  );
