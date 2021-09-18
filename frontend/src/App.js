import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import FaceRecognition from './components/FaceRecognition/face_recognition';
import Logo from './components/Logo/logo';
import ImageLinkForm from "./components/ImageLinkForm/image_link";
import Rank from "./components/Rank/rank";
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particleOptions = {
  "particles": {
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};

const app = new Clarifai.App({
  apiKey: '38c1ae70de274862bfc707525d54e2c8'
});

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',

    };
  }

  onInputChange = (event) => {
    this.setState({
      // input: event.target.value,
    });
  }

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
    });
    app.models
      .predict(
        // Clarifai.FACE_DETECT_MODEL,
        Clarifai.COLOR_MODEL,
        this.state.input)
      .then(
        function (response) {
          console.log(response);
        },
        function (err) {
        }
      );
  }

  render() {
    return (
      <div className="App">
        <Particles className="particle" params={ particleOptions } />
        <div className="flex justify-between items-start">
          <Logo />
          <Navigation />
        </div>
        <Rank />
        <ImageLinkForm
          onInputChange={ this.onInputChange }
          onSubmit={ this.onSubmit }
        />
        <FaceRecognition imageUrl={ this.state.imageUrl } />
      </div>
    );
  }
}

export default App;
