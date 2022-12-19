"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sample = require("./sample");

Object.keys(_sample).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _sample[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sample[key];
    }
  });
});