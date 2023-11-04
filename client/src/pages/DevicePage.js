import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import {
  Button,
  Card,
  Form,
  Row,
  Col,
  Container,
  Image,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  createBasketDevice,
  createRating,
  fetchOneDevice,
} from "../http/deviceAPI";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import useSound from "use-sound";
import dogBark from "../sound/cartoon_small_dog_bark_001_72028.mp3";
import Alert from "archis-react-alert";
import "/node_modules/archis-react-alert/dist/style.css";
import AlertCastom from "../components/AlertCastom";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const [dataCat, setDataCat] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertWarning, setShowAlertWarning] = useState(false);

  const [selectedValue, setSelectedValue] = useState(null);
  const [play] = useSound(dogBark, { volume: 0.5 });

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);

    try {
      createRating({
        user_id: JSON.parse(localStorage.getItem("userInfo")).id,
        device_id: id,
        rate: e.target.value,
      }).then((result) => console.log(result));
    } catch (err) {
      setShowAlertWarning(true);
      setTimeout(() => {
        setShowAlertWarning(false);
        navigate(LOGIN_ROUTE);
      }, 2000);
    }
  };

  useEffect(() => {
    // fetchOneDevice(id).then((data) => setDevice(data));
    fetchOneDevice(id)
      .then((data) => {
        return data;
      })
      .then((data2) => {
        setDevice(data2);
        fetchDataCat();
      });
  }, []);
  const addDeviceInBasket = () => {
    try {
      if (localStorage.getItem("token")) {
        createBasketDevice({
          device_id: device[0].id,
          user_id: JSON.parse(localStorage.getItem("userInfo")).id,
        }).then((data) => {
          setShowAlertSuccess(true);
          setTimeout(() => {
            setShowAlertSuccess(false);
            navigate(SHOP_ROUTE);
          }, 4000);
          play();
        });
      } else {
        setShowAlertWarning(true);
        setTimeout(() => {
          setShowAlertWarning(false);
          navigate(LOGIN_ROUTE);
        }, 2000);
      }
    } catch (err) {
      setShowAlertWarning(true);
      setTimeout(() => {
        setShowAlertWarning(false);
        navigate(LOGIN_ROUTE);
      }, 2000);
    }
  };
  const fetchDataCat = async () => {
    try {
      const response = await fetch("https://dogapi.dog/api/v2/facts"); // Replace with the URL you want to fetch
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json(); // Parse response as JSON

      setDataCat(jsonData.data[0].attributes.body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container className="mt-3">
      <div style={{ fontSize: 25 }}>
        {showAlertSuccess && (
          <AlertCastom message={`🐕‍🦺${dataCat}♡🐾`} type="success" />
        )}
        {showAlertWarning && (
          <AlertCastom message="not access" type="warning" />
        )}
      </div>

      <Row>
        <Col xs={4} className="d-flex flex-column align-items-center">
          <Image
            width={300}
            height={300}
            src={device[0] ? "http://localhost:5000/" + device[0].img : ""}
            // src={device[0] ? process.env.REACT_APP_API_URL + device[0].img : ""}
          />
        </Col>
        <Col xs={4}>
          <div className="d-flex flex-column align-items-center">
            <h1>૮ ´• ﻌ ´• ა</h1>
            <h1>{device[0] ? device[0].name : ""}</h1>
            <Form
              style={{
                marginTop: "40px",
                fontSize: 20,
                borderBlockStyle: "dashed",
              }}
            >
              <h1>Your score is in bones:</h1>
              {["radio"].map((type) => (
                <div key={`inline-${type}`}>
                  <Form.Check
                    inline
                    label="1"
                    name="group1"
                    value={1}
                    type={type}
                    id={`inline-${type}-1`}
                    onChange={handleRadioChange}
                    checked={selectedValue === "1"}
                  />
                  <Form.Check
                    inline
                    label="2"
                    name="group1"
                    value={2}
                    type={type}
                    id={`inline-${type}-2`}
                    onChange={handleRadioChange}
                    checked={selectedValue === "2"}
                  />
                  <Form.Check
                    inline
                    label="3"
                    name="group1"
                    value={3}
                    type={type}
                    id={`inline-${type}-3`}
                    onChange={handleRadioChange}
                    checked={selectedValue === "3"}
                  />
                  <Form.Check
                    inline
                    label="4"
                    name="group1"
                    value={4}
                    type={type}
                    id={`inline-${type}-4`}
                    onChange={handleRadioChange}
                    checked={selectedValue === "4"}
                  />
                  <Form.Check
                    inline
                    label="5"
                    name="group1"
                    value={5}
                    type={type}
                    id={`inline-${type}-5`}
                    onChange={handleRadioChange}
                    checked={selectedValue === "5"}
                  />
                </div>
              ))}
            </Form>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundImage: `url(
              "https://www.pngitem.com/pimgs/m/135-1353166_star-icon-good-icon-png-transparent-png.png") no-repeat center  center`,
                width: 240,
                height: 200,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device[0] ? device[0].rating : ""}🦴
            </div>
          </div>
        </Col>

        <Col xs={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 38,
              border: "4px solid lightgray",
            }}
          >
            <h1>Price: {device[0] ? device[0].price : ""} 💲💲💲 </h1>
            <Marquee>
              {" "}
              <Button
                variant={"outline-dark"}
                onClick={() => addDeviceInBasket()}
                style={{ fontSize: 16 }}
              >
                add {device[0] ? device[0].name : ""} in bookmarks 📑
              </Button>
            </Marquee>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>About Dog:</h1>
        {device[0] && device[0].info.length > 0 ? (
          device[0].info.map((el, index) => (
            <Row
              key={el.id}
              style={{
                background: index % 2 === 0 ? "lightgray" : "transparent",
                padding: 10,
                fontSize: 16,
              }}
            >
              {el.title}: {el.description}
            </Row>
          ))
        ) : (
          <div>No info available</div>
        )}
      </Row>
    </Container>
  );
};

export default DevicePage;
