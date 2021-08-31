import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./Container";
import { Label } from "./Label";
import { selectAskBest, selectBidBest } from "../selectors/assetsSelectors";

type CardProps = {
  type: string;
  bgColor?: string;
};

export const Card: React.FC<CardProps> = ({ type, bgColor }) => {
  const bidBest = useSelector(selectBidBest);
  const askBest = useSelector(selectAskBest);

  return (
    <Container border width="50%">
      <Container pd="15px 20px" bgColor={bgColor}>
        <Label
          text={type === "bid" ? "Best Bid" : "Best Ask"}
          align="left"
          type="white-text"
          bold
        />
      </Container>
      <Container flex pd="15px 20px">
        <Container width="50%">
          <Label
            text={type === "bid" ? bidBest.bidPrice : askBest.askPrice}
            align="left"
            bold
            mb="5px"
          />
          <Label
            text={type === "bid" ? "Best Price" : "Ask Price"}
            align="left"
          />
        </Container>
        <Container width="50%">
          <Label
            text={type === "bid" ? bidBest.bidAmount : askBest.askAmount}
            align="right"
            bold
            mb="5px"
          />
          <Label
            text={type === "bid" ? "Bid Quantity" : "Ask Quantity"}
            align="right"
          />
        </Container>
      </Container>
    </Container>
  );
};
