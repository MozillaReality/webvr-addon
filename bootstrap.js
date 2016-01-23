/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://gre/modules/Services.jsm");

const PREFS = {
  // Enables WebVR. Not needed for Nightly, but we need to keep for other versions.
  "dom.vr.enabled": true,

  // Disables e10s (multi-process in Nightly).
  "browser.tabs.remote.autostart.2": false,

  // Enables pose prediction (for Nightly).
  "dom.vr.poseprediction.enabled": true,

  // Improves frame rate for Oculus DK2 but will break things for HMDs that
  // run at other refresh rates (e.g, 60, 90).
  "layout.frame_rate": 75,

  // Enable mirroring. It's confusing otherwise, if you're not looking at your Rift.
  "gfx.vr.mirror-textures": true
};

function setDefaultPrefs () {
  let branch = Services.prefs.getDefaultBranch(null);
  for (let [key, val] in Iterator(PREFS)) {
    switch (typeof val) {
      case "boolean":
        branch.setBoolPref(key, val);
        break;
      case "number":
        branch.setIntPref(key, val);
        break;
      case "string":
        branch.setCharPref(key, val);
        break;
    }
  }
}

function startup (data, reason) {
  setDefaultPrefs();
}

function shutdown (data, reason) {
}

function install (data, reason) {
  startup(data, reason);
}

function uninstall (data, reason) {
  // Prefs will be reverted automatically upon browser restart.
}
