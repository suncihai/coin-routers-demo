import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./Container";
import { Label } from "./Label";
import { selectBalance } from "../selectors/assetsSelectors";

export const Balance: React.FC = () => {
  const balance = useSelector(selectBalance)

  return (
    <Container border>
      <Container pd="15px 20px" >
        <Label
          text={`User Balance: ${balance.toLocaleString()}`}
          align="left"
          bold
        />
      </Container>
    </Container>
  );
};
