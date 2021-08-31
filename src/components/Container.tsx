import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { bitGray } from "../theme";

type ContainerProps = {
  children: any;
  className?: string;
  flex?: boolean;
  width?: string;
  pd?: string;
  mr?: string;
  mb?: string;
  margin?: string;
  bgColor?: string;
  border?: boolean;
  borderBottom?: boolean;
};

const Wrapper = styled.div<{
  flex?: boolean;
  width?: string;
  pd?: string;
  mb?: string;
  mr?: string;
  margin?: string;
  bgColor?: string;
}>`
  margin: 0;
  display: ${(props) => (props.flex ? "flex" : "")};
  width: ${(props) => props.width};
  padding: ${(props) => props.pd};
  margin-right: ${(props) => props.mr};
  margin-bottom: ${(props) => props.mb};
  margin: ${(props) => (props.margin ? props.margin : "")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "")};
  &.border {
    border: 1px solid ${bitGray};
  }
  &.border-bottom {
    border-bottom: 1px solid ${bitGray};
  }
`;

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  flex,
  width,
  mr,
  mb,
  margin,
  pd,
  border,
  borderBottom,
  bgColor,
}) => {
  return (
    <Wrapper
      flex={flex}
      mb={mb}
      mr={mr}
      margin={margin}
      pd={pd}
      width={width}
      bgColor={bgColor}
      className={_.compact([
        className,
        border && "border",
        borderBottom && "border-bottom",
      ]).join(" ")}
    >
      {children}
    </Wrapper>
  );
};
