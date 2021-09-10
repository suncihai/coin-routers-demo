export type AssetProps = {
  assets: Asset[];
  asset: string;
  assetsStream: AssetMsgProps;
  balance: number;
  frozen: number;
  bidBest: BidProps;
  buyOrder: BuySellProps;
  sellOrder: BuySellProps;
  askBest: AskProps;
  dataFeedBids: number[];
  dataFeedAsks: number[];
  orderBookBids: BidProps[];
  orderBookAsks: AskProps[];
  orders: BuySellOrderProps[];
};

export type BuySellOrderProps = {
  direction: string;
  price: number;
  amount: number;
  createdAt: string;
}

export type BuySellProps = {
  price: number;
  amount: number;
}

export type BidProps = {
  productId: string;
  bidPrice: string;
  bidAmount: string;
};

export type AskProps = {
  productId: string;
  askPrice: string;
  askAmount: string;
};

export type Asset = {
  asset_id: string;
  name: string;
  price_usd: number;
};

export type AssetMsgProps = {
  type: string;
  product_id: string;
  changes: string[][];
  time: string;
};

export type DataFeedProps = {
  name: string;
  Bids: number;
  Asks: number;
};

export type chartProps = {
  title: {
    text: string;
  };
  tooltip: {
    trigger: string;
  };
  legend: {
    data: string[];
  };
  toolbox: {
    show: boolean;
    feature: {
      dataView: {
        readOnly: boolean;
      };
      restore: {};
      saveAsImage: {};
    };
  };
  grid: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  dataZoom: {
    show: boolean;
    start: number;
    end: number;
  };
  visualMap: {
    show: boolean;
    min: number;
    max: number;
  };
  color?: string[];
  xAxis: xAxisProps[];
  yAxis: yAxisProps[];
  series: seriesProps[];
};

type xAxisProps = {
  type: string;
  boundaryGap: boolean;
  data: string[];
};

type yAxisProps = {
  type: string;
  scale: boolean;
  name: string;
  max: number;
  min: number;
  boundaryGap: number[];
};

type seriesProps = {
  name: string;
  type: string;
  xAxisIndex?: number;
  yAxisIndex?: number;
  itemStyle?: {
    normal: {
      barBorderRadius: number;
    };
  };
  animationEasing?: string;
  animationDelay?: (idx: number) => number;
  animationDelayUpdate?: (idx: number) => number;
  lineStyle?: {
    color: string;
  };
  color?: string;
  data: number[];
};
