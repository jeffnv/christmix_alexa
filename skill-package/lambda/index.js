const Alexa = require('ask-sdk-core');

const STREAM_URL = 'https://christmix.gay/stream';
const STREAM_TOKEN = 'christmix-stream';

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = 'Welcome to Christ Mix Radio! Say play to start streaming.';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const PlayStreamIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    if (request.type !== 'IntentRequest') {
      return false;
    }
    return request.intent.name === 'PlayStreamIntent' ||
           request.intent.name === 'AMAZON.ResumeIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'Starting Christ Mix Radio';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .addAudioPlayerPlayDirective(
        'REPLACE_ALL',
        STREAM_URL,
        STREAM_TOKEN,
        0,
        undefined
      )
      .getResponse();
  },
};

const PauseIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    if (request.type !== 'IntentRequest') {
      return false;
    }
    return request.intent.name === 'AMAZON.PauseIntent' ||
           request.intent.name === 'AMAZON.StopIntent' ||
           request.intent.name === 'AMAZON.CancelIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .addAudioPlayerStopDirective()
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    if (request.type !== 'IntentRequest') {
      return false;
    }
    return request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'You can say play to start streaming Christ Mix Radio, or pause to stop.';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log(`Session ended with reason: ${request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const CustomErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(`Error handled: ${error.message}`);
    console.error(`Error stack: ${error.stack}`);
    const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    PlayStreamIntentHandler,
    PauseIntentHandler,
    HelpIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(CustomErrorHandler)
  .lambda();

