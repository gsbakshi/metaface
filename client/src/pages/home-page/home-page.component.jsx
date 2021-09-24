import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import FaceDetectionDisplay from "../../components/face-detection-display/face-detection-display.component";
import ImageInputData from "../../components/image-input-data/image-input-data.component";
import CardContainer from "../../components/card-content/card-content.component";

const HomePage = ({ name, entries, updateRank }) => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [personsDetected, setPersonsDetected] = useState();
  const [showImageOutput, setShowImageOutput] = useState(false);
  let history = useHistory();

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
    setShowImageOutput(true);

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
        if (response) updateRank();
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
    setShowImageOutput(false);
  };

  const logout = () => {
    history.push('/signin');
  };

  const renderImageAndDetectedOutput = () => {
    return (
      showImageOutput && (
        <FaceDetectionDisplay imageUrl={imageUrl} boxes={boxes} />
      )
    );
  };

  const renderImageInputFormAndAuxiliaryData = () => {
    return (
      <ImageInputData
        input={input}
        onInputChange={onInputChange}
        onEnter={onEnter}
        onSubmit={onSubmit}
        clear={clear}
        persons={personsDetected}
      />
    );
  };

  return (
    <React.Fragment>
      <CardContainer
        title={`Hello ${name}, your current rank is ${entries ?? 0}`}
        data={renderImageInputFormAndAuxiliaryData()}
        onClickText={"Sign Out"}
        onClickAction={logout}
      />
      {renderImageAndDetectedOutput()}
    </React.Fragment>
  );
};

export default HomePage;
