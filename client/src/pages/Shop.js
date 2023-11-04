import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";
import { Image } from "react-bootstrap";
import "../style/Shop.css";

const Shop = observer(() => {
  const { device } = useContext(Context);
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1, 3).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);
  useEffect(() => {
    if (device.selectedType && device.selectedBrand) {
      fetchDevices(
        device.selectedType.id,
        device.selectedBrand.id,
        device.page,
        2
      ).then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
    }
  }, [device.page, device.selectedType, device.selectedBrand]);
  return (
    <div className="bg">
      <Container>
        <Row className="">
          <Col xs={3}>
            <TypeBar />
            <br />
            <Image
              width="100%"
              src="https://image.petmd.com/files/inline-images/2023-07-Dog-Life-Spans-Infographic-Desktop.jpg?VersionId=I5EaE1wvDj156XG3JXr7sSMUMmFueXfl"
            />
          </Col>
          <Col xs={9}>
            <BrandBar />
            <DeviceList />
            <Pages />
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default Shop;
