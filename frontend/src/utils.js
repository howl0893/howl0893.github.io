import Vue from "vue";
const EventBus = new Vue();

import * as filestack from 'filestack-js';
const FILESTACK_API_KEY = "AE6CALIxDTcGlqslL0QZ4z";

function openFilePicker() {
  const client = filestack.init(FILESTACK_API_KEY);
  return client;
}

function reportError(err) {
  // Broadcast an error on the global event bus.
  try {
    EventBus.$emit("error", err.request.response);
  } catch {
    EventBus.$emit("error", err);
  }
}

export { openFilePicker, EventBus, reportError };
