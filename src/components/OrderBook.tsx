import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Container } from "./Container";
import { Label } from "./Label";
import { Table, Tbody, Thead, Th, Tr, Td } from "../components/Table";
import * as assetsActions from "../actions/assetsActions";
import { BidProps, AskProps } from "../types/Asset";

type OrderBookProps = {
  type: string;
  orderBook: (BidProps | AskProps)[];
  asset: string;
};

export const OrderBook: React.FC<OrderBookProps> = ({
  type,
  orderBook,
  asset,
}) => {
  const dispatch = useDispatch();

  const handleBuySell = useCallback((order) => (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    type === "bid" && dispatch(assetsActions.buyOrderAction({
      price: Number((order as BidProps).bidPrice), amount: Number((order as BidProps).bidAmount)
    }))
    type === "ask" && dispatch(assetsActions.sellOrderAction({
      price: Number((order as AskProps).askPrice), amount: Number((order as AskProps).askAmount)
    }))
  }, [dispatch, type])

  return (
    <Container border width="50%" pd="10px 0 0 0">
      <Label
        type="title"
        bold
        text={`Order Book ${type === "bid" ? "Bid" : "Ask"}`}
      />
      <Container flex pd="0 20px 15px">
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Label text="Market Size" />
              </Th>
              <Th>
                <Label text="Price(USD)" />
              </Th>
              <Th>
                <Label text="My Size" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderBook &&
              orderBook.map((order, index) => (
                <Tr key={index} onClick={handleBuySell(order)}>
                  <Td>
                    <Label
                      text={
                        type === "bid"
                          ? (order as BidProps).bidAmount
                          : (order as AskProps).askAmount
                      }
                      type={type === "bid" ? "red-text" : "green-text"}
                    />
                  </Td>
                  <Td>
                    <Label
                      text={
                        type === "bid"
                          ? (order as BidProps).bidPrice
                          : (order as AskProps).askPrice
                      }
                      type={type === "bid" ? "red-text" : "green-text"}
                    />
                  </Td>
                  <Td>{ }</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Container>
    </Container>
  );
};
