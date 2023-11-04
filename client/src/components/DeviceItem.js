import React from "react";
import { Card, Col } from "react-bootstrap";
import { BsStarHalf } from "react-icons/bs";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import "../style/DeviceItem.css";

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  console.log(device);
  return (
    <div
      style={{ height: 250 }}
      onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
    >
      {/* *{ //   <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
    //     <Image
    //       width={150}
    //       height={150}
    //       // src={process.env.REACT_APP_API_URL + device.img}
    //       src={"http://localhost:5000/" + device.img}
    //     />
    //     <div className="text-black-50 d-flex justify-content-between align-items-center mt-1">
    //       <div className="d-flex align-items-center mt-1">
    //         <div>{device.rating}</div>
    //         <BsStarHalf style={{ width: 15, height: 15 }} />
    //       </div>
    //     </div>
    //     <div>{device.name}</div>
    //   </Card> */}
      {/* <div class="artboard"> */}
      <div class="card">
        <div class="card__side card__side--back">
          <div class="card__cover">
            <h4 class="card__heading">
              <span class="card__heading-span">{device.price} USD</span>
            </h4>
          </div>
          <div class="card__details">
            <ul>
              <li>
                <div>
                  {device.rating}{" "}
                  <BsStarHalf style={{ width: 15, height: 15 }} />
                </div>
              </li>
              {/* <li>JS/CSS Preprocessors</li>
              <li>JS Frameworks</li>
              <li>Advanced Animations</li>
              <li>Deployment Pipelines</li>
              <li>Large Apps Architectures</li>
              <li>Naming Conventions</li> */}
            </ul>
          </div>
        </div>

        <div class="card__side card__side--front">
          <Image
            width={200}
            height={250}
            // src={process.env.REACT_APP_API_URL + device.img}
            src={"http://localhost:5000/" + device.img}
          />
          <div class="card__theme">
            <div class="card__theme-box">
              <div class="card__title" style={{ fontSize: 40, marginTop: 200 }}>
                {device.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default DeviceItem;
