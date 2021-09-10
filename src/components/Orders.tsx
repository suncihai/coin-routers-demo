import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./Container";
import { Label } from "./Label";
import { Table, Tbody, Thead, Th, Tr, Td } from "./Table";
import { selectOrders } from "../selectors/assetsSelectors";

export const Orders: React.FC = () => {
  const orders = useSelector(selectOrders);
  return (
    <Container border width="100%" pd="10px 0 0 0">
      <Label
        type="title"
        bold
        text="User Orders"
      />
      <Container flex pd="0 20px 15px">
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Label text="Direction" />
              </Th>
              <Th>
                <Label text="Price(USD)" />
              </Th>
              <Th>
                <Label text="Amount" />
              </Th>
              <Th>
                <Label text="Ordered Time" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders &&
              orders.map((order, index) => (
                <Tr key={index}>
                  <Td>
                    <Label
                      text={order.direction}
                      type={order.direction === "Buy" ? "green-text" : "red-text"}
                    />
                  </Td>
                  <Td>
                    <Label
                      text={order.price.toLocaleString()}
                    />
                  </Td>
                  <Td><Label
                    text={String(order.amount)}
                  /></Td>
                  <Td>
                    <Label text={order.createdAt} />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Container>
    </Container>
  );
};
