# Mozilla WebVR Enabler

Enables WebVR support in recent Firefox Nightly builds, avoiding the need to make `about:config` changes.

The latest public version of this extension lives on __[addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/mozilla-webvr-enabler/)__.


## Development

We use [jpm](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm), which requires npm (`brew install npm`, if you're on OS X).

Then to install the dependencies:

```bash
npm install
```

### Building

```bash
npm run xpi
```

### Running

```bash
npm run run
```

### Publishing

To update this [extension](https://addons.mozilla.org/en-US/firefox/addon/mozilla-webvr-enabler/), first run this command:

```bash
npm run xpi
```

And then [upload the new version to the AMO](https://addons.mozilla.org/developers/addon/mozilla-webvr-enabler/versions).
