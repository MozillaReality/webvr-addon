/* global require, exports */

const { Cc, Ci, Cu, Cm } = require('chrome');
const { PageMod } = require('sdk/page-mod');
const self = require('sdk/self');
const prefs = require('sdk/preferences/service');

Cu.import('resource://gre/modules/Services.jsm');

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
  'layout.frame_rate': 0,

  // Increases animation preformance.
  'layout.frame_rate.precise': true,

  // Enables mirroring. It's confusing otherwise, if you're not looking at your Rift.
  'gfx.vr.mirror-textures': true
};

function setDefaultPrefs () {
  var needsReset = false;

  Object.keys(PREFS).forEach(function (key) {
    if (prefs.get(key) === PREFS[key]) { return; }
    prefs.set(key, PREFS[key]);
    needsReset = true;
  });

  if (!needsReset) { return; }

  var title = 'Restart Required';
  var msg = 'Installing the WebVR Plus add-on for the first time requires a restart. Restart now?';
  let shouldProceed = Services.prompt.confirm(null, title, msg);
  if (!shouldProceed) { return; }

  let cancelQuit = Cc['@mozilla.org/supports-PRBool;1'].createInstance(Ci.nsISupportsPRBool);
  Services.obs.notifyObservers(cancelQuit, 'quit-application-requested', 'restart');
  shouldProceed = !cancelQuit.data;
  if (!shouldProceed) { return; }

  Services.startup.quit(Ci.nsIAppStartup.eAttemptQuit |  Ci.nsIAppStartup.eRestart);
}

function revertPrefs () {
  Object.keys(PREFS).forEach(function (key) {
    prefs.reset(key);
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
exports.main = function (opts) {
  if (opts.loadReason === 'startup') { return; }
  setDefaultPrefs();
};

// Covers uninstall, disable, shutdown, downgrade, upgrade.
exports.onUnload = function (reason) {
  if (reason === 'shutdown') { return; }
  revertPrefs();
};
