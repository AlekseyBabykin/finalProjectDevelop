import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Dropdown, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import { Context } from "../..";
import { fetchBrands, deleteBrand } from "../../http/deviceAPI";

const DeleteBrand = observer(({ show, onHide }) => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const deleteButtomBrand = async () => {
    deleteBrand(device.selectedBrand.id).then((data) => onHide());
    const data = await fetchBrands();
    device.setBrands(data);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choice brand for delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown className="mt-3">
          <Dropdown.Toggle>
            {device.selectedBrand.name || "choice a brand"}
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Close
        </Button>
        <Button variant={"outline-success"} onClick={deleteButtomBrand}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteBrand;
