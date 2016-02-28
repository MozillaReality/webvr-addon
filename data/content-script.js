/* global createObjectIn, self, unsafeWindow */

var WEBVRPLUS = createObjectIn(unsafeWindow, {defineAs: 'WEBVRPLUS'});

function parseMsg (msg) {
  if (!msg) { return; }

  try {
    msg = JSON.parse(msg);
  } catch (e) {
    return;
  }

  return msg;
}

function stringifyMsg (type, data) {
  return JSON.stringify({
    type: type,
    data: data
  });
}

self.port.on('msg', function (msg) {
  msg = parseMsg(msg);
  if (!msg) { return; }

  var type = msg.type;
  var data = msg.data;

  switch (type) {
    case 'version':
      WEBVRPLUS.version = data;
      break;
  }
});
