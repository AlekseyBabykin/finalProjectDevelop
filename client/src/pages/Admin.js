import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";
import DeleteType from "../components/modals/DeleteType";
import DeleteBrand from "../components/modals/DeleteBrand";

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typedVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
  const [deleteBrandVisible, setDeleteBrandVisible] = useState(false);
  return (
    <Container className="d-flex flex-column">
      <Row>
        <Button
          onClick={() => setTypeVisible(true)}
          variant={"outline-dark"}
          className="mt-5 p-3"
        >
          to add type
        </Button>
        <Button className="mt-1 p-3" onClick={() => setDeleteTypeVisible(true)}>
          {" "}
          delete type
        </Button>
      </Row>
      <Row>
        <Button
          onClick={() => setBrandVisible(true)}
          variant={"outline-dark"}
          className="mt-5 p-3"
        >
          to add brand
        </Button>
        <Button
          className="mt-1 p-3"
          onClick={() => setDeleteBrandVisible(true)}
        >
          {" "}
          delete brand
        </Button>
      </Row>

      <Button
        onClick={() => setDeviceVisible(true)}
        variant={"outline-dark"}
        className="mt-5 p-3"
      >
        to add device
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateType show={typedVisible} onHide={() => setTypeVisible(false)} />
      <DeleteType
        show={deleteTypeVisible}
        onHide={() => setDeleteTypeVisible(false)}
      />
      <DeleteBrand
        show={deleteBrandVisible}
        onHide={() => setDeleteBrandVisible(false)}
      />
    </Container>
  );
};

export default Admin;
