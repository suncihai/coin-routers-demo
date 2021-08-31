import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { darkGray, lightGray, green, red } from "../theme";

type LabelProps = {
  text: string;
  type?: string;
  align?: string;
  inline?: boolean;
  bold?: boolean;
  uppercase?: boolean;
  nowrap?: boolean;
  maxwidth?: string;
  mr?: string;
  mb?: string;
};

const Wrapper = styled.p<{
  align?: string;
  mb?: string;
  mr?: string;
  maxwidth?: string;
}>`
  margin: 0;
  text-align: ${(props) => (props.align ? props.align : "center")};
  margin-right: ${(props) => props.mr};
  margin-bottom: ${(props) => props.mb};
  max-width: ${(props) => props.maxwidth};
  &.bold {
    font-weight: bold;
  }
  &.inline {
    display: inline-block;
  }
  &.nowrap {
    white-space: nowrap;
  }
  &.uppercase {
    text-transform: uppercase;
  }
  &.text {
    font-size: 14px;
    color: ${darkGray};
  }
  &.title {
    font-size: 18px;
    color: ${darkGray};
  }
  &.sub-text {
    font-size: 12px;
    color: ${lightGray};
  }
  &.sub-dark {
    font-size: 12px;
    color: ${darkGray};
  }
  &.green-text {
    font-size: 12px;
    color: ${green};
  }
  &.red-text {
    font-size: 12px;
    color: ${red};
  }
  &.white-text {
    color: white;
  }
`;

export const Label: React.FC<LabelProps> = ({
  text,
  type = "text",
  align,
  inline,
  bold = false,
  uppercase = false,
  nowrap = false,
  maxwidth = "none",
  mr,
  mb,
}) => {
  return (
    <Wrapper
      mb={mb}
      mr={mr}
      maxwidth={maxwidth}
      align={align}
      className={_.compact([
        type,
        bold && "bold",
        inline && "inline",
        uppercase && "uppercase",
        nowrap && "nowrap",
      ]).join(" ")}
    >
      {text}
    </Wrapper>
  );
};
