import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Image, Col } from "react-bootstrap";
import { fetchBasketDevices, fetchOneDevice } from "../http/deviceAPI";
import { deleteDeviceBasket } from "../http/deviceAPI";
import "../style/Basket.css";
import useSound from "use-sound";
import voyvoy from "../sound/voy-voy.mp3";
import DogButton from "../components/DogButton";

const Basket = () => {
  const [alldeviceId, setDevicesId] = useState();
  const [summ, setSumm] = useState(0);
  const [speed, setSpeed] = useState(5);
  const [play] = useSound(voyvoy, { volume: 0.5 });
  const [show, setShow] = useState(false);

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
    setShow(true);
  };

  const deleteDev = async (id) => {
    try {
      await deleteDeviceBasket(id);
      const data = await fetchBasketDevices(
        JSON.parse(localStorage.getItem("userInfo")).id
      );
      setDevicesId(data);
      play();
      setSpeed(speed - 1);
    } catch (err) {
      alert(err.response.data.massage);
    }
  };

  return (
    <Container>
      <Row className="d-flex flex-column m-3">
        <h1>Your animals:</h1>
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
                  src={el ? "/" + el.img : ""}
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
                <h3>name : {el.name}</h3>
                <h3>price : {el.price} 💲💲💲</h3>
                <h3>rating: {el.rating} 🦴🦴🦴</h3>
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

      {show && (
        <div style={{ textAlign: "center" }}>
          {" "}
          <DogButton />
          <h3 style={{ marginTop: 20, fontSize: 20 }}>
            purchase price: 🤑 {summ} 💰💸
          </h3>
        </div>
      )}

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
          <Button variant={"outline-light"} onClick={handle}>
            click to buy
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Basket;
