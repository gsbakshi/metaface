import React, { useState } from "react";

import "./content-container.styles.scss";

import ContentData from "../content-data/content-data.component";
import FaceDetectionDisplay from "../face-detection-display/face-detection-display.component";
import CardContainer from "../card-container/card-container.component";
import ImageInputData from "../image-input-data/image-input-data.component";

const ContentContainer = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [personsDetected, setPersonsDetected] = useState();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const onInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
  };

  const onEnter = async (event) => {
    const value = input.trim();
    try {
      if (event.which === 13 && value.length !== 0) onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const calculateFaceCoordinates = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return data.outputs[0].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  };

  const detectAllFacesWithCoordinates = (boxes) => setBoxes(boxes);

  const onSubmit = () => {
    const value = input.trim();
    setImageUrl(value);

    // Trigger detection logic
    fetch("http://localhost:3001/imageurl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: value,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => setUser({ ...user, entries: count }))
            .catch(console.log);
        }
        detectAllFacesWithCoordinates(calculateFaceCoordinates(response));
      })
      .catch((error) => console.log(error));
    setPersonsDetected(boxes.length);
  };

  const clear = () => {
    setInput("");
    setImageUrl("");
    setBoxes([]);
    setPersonsDetected();
  };

  return (
    <div className="content-container">
      <div className="content">
        {/* <ContentData
          input={input}
          onInputChange={onInputChange}
          onEnter={onEnter}
          onSubmit={onSubmit}
          clear={clear}
          name={user.name}
          rank={user.entries}
          persons={personsDetected}
        /> */}
        <CardContainer
          title={`Hello ${user.name ?? "user"}, your current rank is ${
            user.entries ?? 0
          }`}
          data={
            <ImageInputData
              input={input}
              onInputChange={onInputChange}
              onEnter={onEnter}
              onSubmit={onSubmit}
              clear={clear}
              persons={personsDetected}
            />
          }
          onClickText={"Sign Out"}
          onClickAction={() => console.log("abs")}
        />
        {input && <FaceDetectionDisplay imageUrl={imageUrl} boxes={boxes} />}
      </div>
    </div>
  );
};

export default ContentContainer;
