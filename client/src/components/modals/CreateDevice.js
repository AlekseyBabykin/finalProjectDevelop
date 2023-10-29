import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Dropdown, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import { Context } from "../..";
import { fetchTypes, fetchBrands, createDevice } from "../../http/deviceAPI";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    console.log("sss");
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((el) => el.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("img", file);
    formData.append("brand_id", device.selectedBrand.id);
    formData.append("type_id", device.selectedType.id);
    formData.append("info", JSON.stringify(info));
    console.log(formData);
    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          to add new Device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-3">
            <Dropdown.Toggle>
              {device.selectedType.name || "choice a type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((el) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(el)}
                  key={el.id}
                >
                  {el.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-3">
            <Dropdown.Toggle>
              {device.selectedBrand.name || "choice brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((el) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(el)}
                  key={el.id}
                >
                  {el.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="write name device"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            type="number"
            placeholder="write price device"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button onClick={addInfo} variant={"outline-dark"}>
            to add new proporties
          </Button>
          {info.map((el) => (
            <Row className="mt-2" key={el.number}>
              <Col xs={4}>
                <Form.Control
                  value={el.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, el.number)
                  }
                  placeholder="Write name proporty"
                />
              </Col>
              <Col xs={4}>
                <Form.Control
                  value={el.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, el.number)
                  }
                  placeholder="Write description proporty"
                />
              </Col>
              <Col xs={4}>
                <Button
                  onClick={() => removeInfo(el.number)}
                  variant={"outline-danger"}
                >
                  delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Close
        </Button>
        <Button variant={"outline-success"} onClick={addDevice}>
          add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
