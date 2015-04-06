/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://gre/modules/Services.jsm");

function startup(data, reason)
{
  Services.prefs.setBoolPref("dom.vr.enabled", true);
}

function shutdown(data, reason)
{
  Services.prefs.setBoolPref("dom.vr.enabled", false);
}

function install(data, reason)
{
  const Cc = Components.classes, Ci = Components.interfaces;

  var isAlreadyEnabled = Services.prefs.getBoolPref("dom.vr.enabled", false);
  if (isAlreadyEnabled)
    return;

  var title = "Restart Required";
  var msg = "Installing the WebVR Add-On for the first time requires a restart.  Restart now?";
  let shouldProceed = Services.prompt.confirm(null, title, msg);
  if (shouldProceed) {
    let cancelQuit = Cc["@mozilla.org/supports-PRBool;1"]
                     .createInstance(Ci.nsISupportsPRBool);
    Services.obs.notifyObservers(cancelQuit, "quit-application-requested",
                                 "restart");
    shouldProceed = !cancelQuit.data;

    if (shouldProceed) {
      Services.prefs.setBoolPref("dom.vr.enabled", true);
      Services.startup.quit(Ci.nsIAppStartup.eAttemptQuit |  Ci.nsIAppStartup.eRestart);
    }
  }
}

function uninstall(data, reason)
{
  Services.prefs.setBoolPref("dom.vr.enabled", false);
}
