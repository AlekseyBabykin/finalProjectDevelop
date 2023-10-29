import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Image, Col } from "react-bootstrap";
import { fetchBasketDevices, fetchOneDevice } from "../http/deviceAPI";
import { deleteDeviceBasket } from "../http/deviceAPI";
import "../style/Basket.css";

const Basket = () => {
  const [alldeviceId, setDevicesId] = useState();
  const [summ, setSumm] = useState(0);
  const [speed, setSpeed] = useState(5);

  useEffect(() => {
    fetchBasketDevices(JSON.parse(localStorage.getItem("userInfo")).id).then(
      (data) => {
        setDevicesId(data);
        setSpeed(speed + data.length);
      }
    );
  }, []);
  const handle = () => {
    setSpeed(0);
    let sum1 = 0;
    alldeviceId.map((el) => {
      sum1 = el.price + sum1;
    });
    setSumm(sum1);
  };

  const deleteDev = async (id) => {
    try {
      await deleteDeviceBasket(id);
      const data = await fetchBasketDevices(
        JSON.parse(localStorage.getItem("userInfo")).id
      );
      setDevicesId(data);
      setSpeed(speed - 1);
    } catch (err) {
      alert(err.response.data.massage);
    }
  };

  return (
    <Container>
      <Row className="d-flex flex-column m-3">
        <h1>Your devices:</h1>
        <br />
        {alldeviceId ? (
          alldeviceId.map((el, index) => (
            <Row
              key={el.id}
              style={{
                background: index % 2 === 0 ? "lightgray" : "transparent",
                padding: 10,
              }}
            >
              <Col xs={3}>
                <Image
                  width={100}
                  height={100}
                  src={el ? "http://localhost:5000/" + el.img : ""}
                  // src={el ? process.env.REACT_APP_API_URL + el.img : ""}
                ></Image>
              </Col>
              <Col
                style={{
                  fontSize: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {" "}
                <div>name : {el.name}</div>
                <div>price : {el.price}</div>
              </Col>
              <Col className="m-4" xs={2}>
                <Button
                  style={{ fontSize: 14 }}
                  variant={"outline-dark"}
                  onClick={() => deleteDev(el.id)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))
        ) : (
          <div>No info available</div>
        )}
      </Row>

      <h3>Basic Linear Bounce</h3>
      <div class="stage">
        <div
          class="box bounce-1"
          style={{
            animationDuration: `${speed}s`,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: "10px",
          }}
        >
          <button
            style={{ fontSize: 14 }}
            variant={"outline-dark"}
            onClick={handle}
          >
            SUMM
          </button>
          <h2 style={{ textAlign: "center" }}>{summ}</h2>
        </div>
      </div>
    </Container>
  );
};

export default Basket;
