import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./Container";
import { Label } from "./Label";
import { selectBalance, selectFrozen } from "../selectors/assetsSelectors";

export const Balance: React.FC = () => {
  const balance = useSelector(selectBalance)
  const fronzen = useSelector(selectFrozen)

  return (
    <Container border>
      <Container pd="5px 20px" width="100%">
        <Label
          text={`User Total Balance: ${balance.toLocaleString()} `}
          align="left"
          bold
        />
      </Container>
      <Container pd="5px 20px" width="100%">
        <Label
          text={`User Available Balance: ${(balance - fronzen).toLocaleString()} `}
          align="left"
          bold
        />
      </Container>
      <Container pd="5px 20px" width="100%">
        <Label
          text={`User Frozen Balance: ${fronzen.toLocaleString()} `}
          align="left"
          bold
        />
      </Container>
    </Container>
  );
};
