import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "./Container";
import { Label } from "./Label";
import * as assetsActions from "../actions/assetsActions";
import { selectBuyOrder, selectSellOrder } from "../selectors/assetsSelectors";
import { Input, Button } from "semantic-ui-react";
import moment from "moment"

export const BuySellCard: React.FC = () => {
  const buyOrder = useSelector(selectBuyOrder);
  const sellOrder = useSelector(selectSellOrder);
  const dispatch = useDispatch();
  const [buyPrice, setBuyPrice] = useState(buyOrder.price);
  const [buyAmount, setBuyAmount] = useState(buyOrder.amount);
  const [sellPrice, setSellPrice] = useState(sellOrder.price);
  const [sellAmount, setSellAmount] = useState(sellOrder.amount);

  const handleBuyPriceChange = useCallback((event) => {
    setBuyPrice(event.target.value);
    dispatch(assetsActions.buyOrderAction({ price: event.target.value, amount: buyAmount }))
  }, [dispatch, buyAmount])

  const handleBuyAmountChange = useCallback((event) => {
    setBuyAmount(event.target.value);
    dispatch(assetsActions.buyOrderAction({ price: buyPrice, amount: event.target.value }))
  }, [dispatch, buyPrice])

  const handleSellPriceChange = useCallback((event) => {
    setSellPrice(event.target.value);
    dispatch(assetsActions.sellOrderAction({ price: event.target.value, amount: sellAmount }))
  }, [dispatch, sellAmount])

  const handleSellAmountChange = useCallback((event) => {
    setSellAmount(event.target.value);
    dispatch(assetsActions.sellOrderAction({ price: sellPrice, amount: event.target.value }))
  }, [dispatch, sellPrice])

  const handleBuyOrder = useCallback(() => {
    dispatch(assetsActions.orderAction({
      direction: "Buy",
      price: buyOrder.price,
      amount: buyOrder.amount,
      createdAt: moment(new Date()).format("YYYY MMM,DD HH:MM:SS")
    }))
  }, [dispatch, buyOrder])

  const handleSellOrder = useCallback(() => {
    dispatch(assetsActions.orderAction({
      direction: "Sell",
      price: sellOrder.price,
      amount: sellOrder.amount,
      createdAt: moment(new Date()).format("YYYY MMM,DD HH:MM:SS")
    }))
  }, [dispatch, sellOrder])

  return (
    <Container border width="100%">
      <Container pd="15px 20px" width="100%">
        <Label
          text="Buy Order"
          align="left"
          bold
          mb="10px"
        />
        <Input value={buyOrder.price} onChange={handleBuyPriceChange} placeholder="Please enter buy price" style={{ width: "100%", marginBottom: "10px" }} />
        <Input value={buyOrder.amount} onChange={handleBuyAmountChange} placeholder="Please enter buy amount" style={{ width: "100%", marginBottom: "10px" }} />
        <Button style={{ width: "100%", marginBottom: "10px" }} color="green" onClick={handleBuyOrder}>Buy</Button>
        <Label text={`Total: ${(buyOrder.price * buyOrder.amount).toLocaleString()}`} align="left" bold />
      </Container>
      <Container pd="15px 20px" width="100%">
        <Label
          text="Sell Order"
          align="left"
          bold
          mb="10px"
        />
        <Input value={sellOrder.price} onChange={handleSellPriceChange} placeholder="Please enter sell price" style={{ width: "100%", marginBottom: "10px" }} />
        <Input value={sellOrder.amount} onChange={handleSellAmountChange} placeholder="Please enter sell amount" style={{ width: "100%", marginBottom: "10px" }} />
        <Button style={{ width: "100%", marginBottom: "10px" }} color="red" onClick={handleSellOrder}>Sell</Button>
        <Label text={`Total: ${(sellOrder.price * sellOrder.amount).toLocaleString()}`} align="left" bold />
      </Container>
    </Container>
  );
};
