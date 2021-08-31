import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import ReactECharts from "echarts-for-react-typescript";
import { useParams, useHistory } from "react-router-dom";
import { Container } from "./Container";
import { Card } from "./Card";
import { Label } from "./Label";
import { assetOptions } from "../constant";
import {
  selectBidBest,
  selectAskBest,
  selectDataFeedBids,
  selectDataFeedAsks,
} from "../selectors/assetsSelectors";
import { blue, orange } from "../theme";
import { chartProps } from "../types/Asset";
import { Dropdown } from "semantic-ui-react";

export const Chart: React.FC = () => {
  const history = useHistory();
  const { assetParam } = useParams<{ assetParam: string }>();
  const bidBest = useSelector(selectBidBest);
  const askBest = useSelector(selectAskBest);
  const dataFeedBids = useSelector(selectDataFeedBids);
  const dataFeedAsks = useSelector(selectDataFeedAsks);

  const DEFAULT_OPTION: chartProps = {
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
        data: dataFeedBids,
      },
      {
        name: "Asks",
        type: "line",
        data: dataFeedAsks,
      },
    ],
  };

  const [option, setOption] = useState<chartProps>(DEFAULT_OPTION);
  const [crypto, setCrypto] = useState<string>(assetParam.toUpperCase());

  const fetchNewData = useCallback(() => {
    const axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
    let newOption: chartProps = { ...option }; // immutable
    const data0 = newOption.series[0].data;
    const data1 = newOption.series[1].data;
    data0.push(dataFeedBids[dataFeedBids.length - 1]);
    data1.push(dataFeedAsks[dataFeedAsks.length - 1]);
    if (data0.length > 50) data0.shift();
    if (data1.length > 50) data1.shift();

    newOption.xAxis[0].data.shift();
    newOption.xAxis[0].data.push(axisData);
    newOption.xAxis[1].data.shift();
    newOption.xAxis[1].data.push(axisData);
    newOption.yAxis[0].max = Number(bidBest.bidPrice) * 1.02;
    newOption.yAxis[0].min = Number(askBest.askPrice) * 0.98;
    newOption.yAxis[1].max = Number(bidBest.bidPrice) * 1.02;
    newOption.yAxis[1].min = Number(askBest.askPrice) * 0.98;

    setOption(newOption);
  }, [bidBest, askBest, dataFeedAsks, dataFeedBids, option]);

  const handleCryptoChange = useCallback(
    (event) => {
      setCrypto(event.target.innerText);
      history.push(`/${event.target.innerText.toLowerCase()}`);
      history.go(0);
    },
    [history]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      fetchNewData();
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchNewData]);

  return (
    <>
      <Container borderBottom pd="15px 0">
        <Label
          text="Real Time Chart"
          type="title"
          bold
          align="left"
          mb="10px"
        />
        <Dropdown
          placeholder="Select crypto"
          fluid
          selection
          options={assetOptions}
          onChange={handleCryptoChange}
          value={crypto}
        />
      </Container>
      <Container flex mb="40px">
        <Card type="bid" bgColor={blue} />
        <Card type="ask" bgColor={orange} />
      </Container>
      <ReactECharts option={option} style={{ height: 400 }} />
    </>
  );
};
