/* global require, exports */

const { PageMod } = require('sdk/page-mod');
const self = require('sdk/self');
const service = require('sdk/preferences/service');

const pkg = require('./package.json');

const PREFS = {
  // Enables WebVR. Not needed for Nightly, but we need to keep for other versions.
  'dom.vr.enabled': true,

  // Disables e10s (multi-process in Nightly).
  'browser.tabs.remote.autostart.2': false,

  // Enables pose prediction (for Nightly).
  'dom.vr.poseprediction.enabled': true,

  // Improves frame rate for Oculus DK2 but will break things for HMDs that
  // run at other refresh rates (e.g, 60, 90).
  'layout.frame_rate': 75,

  // Increases animation preformance.
  'layout.frame_rate.precise': true,

  // Enables mirroring. It's confusing otherwise, if you're not looking at your Rift.
  'gfx.vr.mirror-textures': true
};

function setDefaultPrefs () {
  Object.keys(PREFS).forEach(function (key) {
    service.set(key, PREFS[key]);
  });
}

function revertPrefs () {
  Object.keys(PREFS).forEach(function (key) {
    service.reset(key);
  });
}

function stringifyMsg (type, data) {
  return JSON.stringify({
    type: type,
    data: data
  });
}

function sendMsg (worker, type, data) {
  worker.port.emit('msg', stringifyMsg(type, data));
}

function startListening (worker) {
  sendMsg(worker, 'version', pkg.version);
}

PageMod({
  include: '*',
  contentScriptFile: self.data.url('content-script.js'),
  contentScriptWhen: 'ready',
  onAttach: startListening
});

// Covers startup, install, upgrade, downgrade, enable.
exports.main = setDefaultPrefs;

// Covers uninstall, disable, shutdown, downgrade, upgrade.
exports.onUnload = revertPrefs;
