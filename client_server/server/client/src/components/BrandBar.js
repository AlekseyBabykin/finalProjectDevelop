import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Row, Card } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <div className="d-flex">
      {device.brands.map((el) => (
        <Card
          style={{
            cursor: "pointer",
            fontSize: 18,
            marginLeft: 6,
            border: "2px solid  black",
          }}
          border={el.id === device.selectedBrand.id ? "danger" : "light"}
          onClick={() => device.setSelectedBrand(el)}
          className="p-4 mt-3"
          key={el.id}
        >
          {el.name}
        </Card>
      ))}
    </div>
  );
});

export default BrandBar;
