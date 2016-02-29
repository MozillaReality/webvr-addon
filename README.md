# Mozilla WebVR Plus

Firefox extension that manages browser prefs for optimal WebVR support, avoiding the need to make about:config changes.

The latest public version of this extension lives on __[addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/mozilla-webvr-enabler/)__.


## Development

We use [`jpm`](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm), which requires `npm` (`brew install npm`, if you're on OS X).

Then to install the Node dependencies:

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

#### Testing the `.xpi` without `jpm`

1. If you'd like to test a generated `.xpi` with a different version/build of Firefox, you must first disable the check that requires only signed add-ons to be installed. In Firefox, open `about:config` and flip `xpinstall.signatures.required` to `false`.
2. Drag the generated `.xpi` from your file system onto any active browser window in Firefox.
3. Click the "Install" button!

### Publishing

To update this [extension](https://addons.mozilla.org/en-US/firefox/addon/mozilla-webvr-enabler/), first run this command:

```bash
npm run xpi
```

And then [upload the new version to the AMO](https://addons.mozilla.org/developers/addon/mozilla-webvr-enabler/versions).
