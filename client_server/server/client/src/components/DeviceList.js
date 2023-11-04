import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import Row from "react-bootstrap/Row";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {device.devices.map((el) => (
        <DeviceItem key={el.id} device={el} />
      ))}
    </div>
  );
});

export default DeviceList;
