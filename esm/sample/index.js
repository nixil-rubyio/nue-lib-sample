"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sampleClass = require("./sample-class");

Object.keys(_sampleClass).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _sampleClass[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sampleClass[key];
    }
  });
});