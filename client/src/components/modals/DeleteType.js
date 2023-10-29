import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Dropdown, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import { Context } from "../..";
import {
  fetchTypes,
  fetchBrands,
  createDevice,
  deleteType,
} from "../../http/deviceAPI";

const DeleteType = observer(({ show, onHide }) => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
  }, []);

  const deleteDevice = async () => {
    deleteType(device.selectedType.id).then((data) => onHide());
    const data = await fetchTypes();
    device.setTypes(data);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choice type for delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Close
        </Button>
        <Button variant={"outline-success"} onClick={deleteDevice}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteType;
