FROM node:20-bullseye-slim

RUN apt update -y && apt install -y openjdk-11-jdk bash

RUN npm install -g firebase-tools

RUN mkdir -p /data/emulator_data/firebase
VOLUME /data/emulator_data

COPY ./firebase.json /firebase.json

ARG PROJECT_ID=cards-app-dev
ENV PROJECT_ID=$PROJECT_ID

ENTRYPOINT ["sh", "-c", "firebase emulators:start --project=\"$PROJECT_ID\" --import=/data/emulator_data/firebase --export-on-exit=/data/emulator_data/firebase"]