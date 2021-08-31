import styled from "styled-components";
import { bitGray, darkBlue } from "../theme";

export const Table = styled.table`
  width: 100%;
`;

export const Thead = styled.thead`
  width: 100%;
`;

export const Tbody = styled.tbody`
  width: 100%;
`;

export const Th = styled.th`
  padding: 10px;
  color: ${bitGray};
`;

export const Tr = styled.tr`
  border-bottom: 1px solid ${bitGray};
`;

export const Td = styled.td`
  padding: 10px;
  color: ${darkBlue};
`;
