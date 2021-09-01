import { chartProps } from "../types/Asset";
import { blue, orange } from "../theme";

export const useChart = (
  assetParam: string,
  dataFeedBids: number[],
  dataFeedAsks: number[]
) => {
  const assetOptions = [
    {
      key: "BTC_USD",
      text: "BTC-USD",
      value: "BTC-USD",
      image: {
        avatar: true,
        src:
          "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png",
      },
    },
    {
      key: "ETH_USD",
      text: "ETH-USD",
      value: "ETH-USD",
      image: {
        avatar: true,
        src:
          "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
      },
    },
    {
      key: "LTC_USD",
      text: "LTC-USD",
      value: "LTC-USD",
      image: {
        avatar: true,
        src:
          "https://dynamic-assets.coinbase.com/f018870b721574ef7f269b9fd91b36042dc05ebed4ae9dcdc340a1bae5b359e8760a8c224bc99466db704d10a3e23cf1f4cd1ff6f647340c4c9c899a9e6595cd/asset_icons/984a4fe2ba5b2c325c06e4c2f3ba3f1c1fef1f157edb3b8ebbfe234340a157a5.png",
      },
    },
    {
      key: "BCH_USD",
      text: "BCH-USD",
      value: "BCH-USD",
      image: {
        avatar: true,
        src:
          "https://dynamic-assets.coinbase.com/93a4303d1b0410b79bb1feac01020e4e7bdf8e6ece68282d0af2c7d0b481c5f5c44c0cec1d7071ae8f84674dbd139e290d50a038a6a4c1bbc856ec0871b5f3e2/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png",
      },
    },
  ];

  const chartDefaultOption: chartProps = {
    title: {
      text: `${assetParam.toUpperCase()} Price`,
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Bids", "Asks"],
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    grid: {
      top: 60,
      left: 60,
      right: 60,
      bottom: 30,
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1000,
    },
    color: ["#009ece", "#fcb146"],
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        data: (function () {
          let now = new Date();
          let res = [];
          let len = 50;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
            now = new Date(Number(now) - 2000);
          }
          return res;
        })(),
      },
      {
        type: "category",
        boundaryGap: true,
        data: (function () {
          let now = new Date();
          let res = [];
          let len = 50;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
            now = new Date(Number(now) - 2000);
          }
          return res;
        })(),
      },
    ],
    yAxis: [
      {
        type: "value",
        scale: true,
        name: "Price",
        max: 0,
        min: 0,
        boundaryGap: [0.2, 0.2],
      },
      {
        type: "value",
        scale: true,
        name: "Price",
        max: 0,
        min: 0,
        boundaryGap: [0.2, 0.2],
      },
    ],
    series: [
      {
        name: "Bids",
        type: "line",
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 4,
          },
        },
        animationEasing: "elasticOut",
        animationDelay: function (idx) {
          return idx * 10;
        },
        animationDelayUpdate: function (idx) {
          return idx * 10;
        },
        lineStyle: {
          color: blue,
        },
        data: dataFeedBids,
      },
      {
        name: "Asks",
        type: "line",
        lineStyle: {
          color: orange,
        },
        data: dataFeedAsks,
      },
    ],
  };

  return {
    assetOptions,
    chartDefaultOption,
  };
};
