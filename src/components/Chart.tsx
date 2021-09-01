import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import ReactECharts from "echarts-for-react-typescript";
import { useParams, useHistory } from "react-router-dom";
import { Container } from "./Container";
import { Card } from "./Card";
import { Label } from "./Label";
import { useInterval } from "../hooks/useInterval";
import { useChart } from "../hooks/useChart";
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

  const { assetOptions, chartDefaultOption } = useChart(
    assetParam,
    dataFeedBids,
    dataFeedAsks
  );
  const [option, setOption] = useState<chartProps>(chartDefaultOption);
  const [crypto, setCrypto] = useState<string>(assetParam.toUpperCase());

  const fetchNewData = useCallback(() => {
    const axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
    const newOption: chartProps = { ...option }; // immutable
    const data0 = newOption.series[0].data;
    const data1 = newOption.series[1].data;
    data0.push(dataFeedBids[_.size(dataFeedBids) - 1]);
    data1.push(dataFeedAsks[_.size(dataFeedAsks) - 1]);
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

  useInterval(() => {
    fetchNewData();
  }, 1000);

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
