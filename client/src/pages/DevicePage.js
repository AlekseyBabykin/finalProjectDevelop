import React, { useEffect, useState } from "react";
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
import { SHOP_ROUTE } from "../utils/consts";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const [dataCat, setDataCat] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value);

    try {
      createRating({
        user_id: JSON.parse(localStorage.getItem("userInfo")).id,
        device_id: id,
        rate: e.target.value,
      }).then((result) => console.log(result));
    } catch (err) {
      alert("err.response.data.massage");
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
      localStorage.getItem("token")
        ? createBasketDevice({
            device_id: device[0].id,
            user_id: JSON.parse(localStorage.getItem("userInfo")).id,
          }).then((data) => {
            navigate(SHOP_ROUTE);
            console.log(dataCat);
            alert(dataCat.text);
          })
        : alert("not acess");
    } catch (err) {
      alert("err.response.data.massage");
    }
  };
  const fetchDataCat = async () => {
    try {
      const response = await fetch(
        "https://uselessfacts.jsph.pl/random.json?language=en"
      ); // Replace with the URL you want to fetch
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json(); // Parse response as JSON
      setDataCat(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container className="mt-3">
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
            <h1>{device[0] ? device[0].name : ""}</h1>
            <Form style={{ marginTop: "30px", fontSize: 16 }}>
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
              {device[0] ? device[0].rating : ""}
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
            <h3>from: {device[0] ? device[0].price : ""} dollars. </h3>
            <Button
              variant={"outline-dark"}
              onClick={() => addDeviceInBasket()}
            >
              add basket
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Informations device</h1>
        {device[0] && device[0].info.length > 0 ? (
          device[0].info.map((el, index) => (
            <Row
              key={el.id}
              style={{
                background: index % 2 === 0 ? "lightgray" : "transparent",
                padding: 10,
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
