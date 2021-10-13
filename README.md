![image](https://github.com/gsbakshi/metaface/blob/master/images/cover.png)

#

> Metaface is a face detection web application using the [Clarifai Face Detect AI Model](https://www.clarifai.com/models/ai-face-detection/). Paste the image link and submit to view the output.
> Works best with images in landscape mode. Portrait photos work, but the styling may break at times.
> Can detect multiple faces as well.

*Currently there's an issue with Live Demo, to test the app, follow the [Usage](#Usage) instructions*

![HomePage](https://github.com/gsbakshi/metaface/blob/master/images/4.png)
![HomePage](https://github.com/gsbakshi/metaface/blob/master/images/6.png)
![HomePage](https://github.com/gsbakshi/metaface/blob/master/images/7.png)
![HomePage](https://github.com/gsbakshi/metaface/blob/master/images/8.png)

### Project structure:

```
.
├── docker-compose.yaml
├── README.md
├── images                                  # All Screenshots
│   └── ...
│
├── server                                  # Express App
│   ├── Dockerfile
│   ...
│
├── postgres                                # Database
│   ├── deploy_schemas.sql                  # Creates tables with seed data during docker build
│   └── Dockerfile
│
└── client                                  # React App
    ├── ...
    └── Dockerfile

```

## Usage

#### Clone Repo

```shell
git clone https://github.com/gsbakshi/metaface.git
```
This Command will copy a full project to your local environment

Then type `cd metaface` in your terminal.

#### Run Docker

```
docker compose up
```

This command will build all the components to get your server, database, caching and frontend started.

This assumes that you already have docker & docker compose installed on your system. If you don't, go to [Docker's Website](https://docs.docker.com/get-docker/) and follow the instructions there to install it on your system.

#### Built With

- [Node JS](https://nodejs.org/en/)
- [Express JS](https://expressjs.com/)
- [Redis](https://redis.io/)
- [JWT](https://jwt.io/)
- [Postgresql](https://www.postgresql.org/)
- [Clarifai Face Detection AI](https://www.clarifai.com/models/ai-face-detection/)
- [React Native](https://facebook.github.io/react-native/)
- [SCSS](https://sass-lang.com/)
- [Docker](https://www.docker.com/)