import React from "react";
import "../style/DogButton.css";
import Image from "react-bootstrap/Image";

const DogButton = () => {
  return (
    <div id="contaner1">
      <div class="dog-head">
        <Image
          style={{ width: 75 }}
          src="http://www.clker.com/cliparts/j/3/Z/Y/D/5/dog-head-md.png"
        />
      </div>
    </div>
  );
};

export default DogButton;
