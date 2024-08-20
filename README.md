# @ddgond/data-store

A simple utility for storing state in the user's data directory. Please don't use this in production, this is literally as minimal as can be and for myself.

## Installation

```bash
npm install @ddgond/data-store
```

## Usage

```javascript
const DataStore = require('@ddgond/data-store');

// Create a new DataStore instance
const dataStore = new DataStore('MyApp', 'state.json', { defaultKey: 'defaultValue' });

// Read state
dataStore.readState().then(state => {
  console.log(state);
});

// Write state
dataStore.writeState({ defaultKey: 'newValue' }).then(() => {
  console.log('State saved successfully');
});
```

## API

### `new DataStore(appName, fileName, getDefault)`

Creates a new DataStore instance.

- `appName`: The name of your application (used for creating the data directory)
- `fileName`: The name of the file to store the state in
- `getDefault`: A function that returns the default state, or a default state object

### `dataStore.readState()`

Reads the current state from the file. If the file doesn't exist, it returns the default state.

Returns a Promise that resolves with the state object.

### `dataStore.writeState(state)`

Writes the given state to the file. Overwrites existing state entirely, does not perform any merging.

- `state`: The state object to write

Returns a Promise that resolves when the write is complete.

## Features

- Stores data in the user's local data directory (`~/.local/share` on Linux, or the equivalent on other platforms)
- Automatically creates the data directory if it doesn't exist
- Provides default state if the state file doesn't exist
- Uses promises for asynchronous operations

## License

ISC
