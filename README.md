# @przemek-s/json-viewer

A beautiful, feature-rich JSON viewer and editor component for React applications.

## Features

- 🎨 Beautiful, modern UI with Tailwind CSS
- 🔍 Advanced search and filtering capabilities
- 📝 JSON editing with CodeMirror
- 🎯 Type inference and schema validation
- 🚀 Virtual scrolling for large datasets
- ⌨️ Keyboard shortcuts support
- 🎭 Multiple view modes (tree, column, etc.)
- 📱 Responsive design

## Installation

```bash
npm install @przemek-s/json-viewer
```

or

```bash
yarn add @przemek-s/json-viewer
```

## Peer Dependencies

This package requires the following peer dependencies:

```json
{
  "react": ">=17.0.0",
  "react-dom": ">=17.0.0",
  "@heroicons/react": "^1.0.0",
  "@codemirror/language": "^6.0.0",
  "@codemirror/state": "^6.5.2",
  "@codemirror/view": "^6.38.1",
  "@lezer/highlight": "^1.0.0",
  "@uiw/react-codemirror": "^4.0.0"
}
```

## Usage

```tsx
import { JsonViewer } from "@przemek-s/json-viewer";

function App() {
  const jsonData = {
    name: "Example",
    version: "1.0.0",
    data: {
      items: [1, 2, 3, 4, 5],
    },
  };

  return (
    <div className="app">
      <JsonViewer json={jsonData} />
    </div>
  );
}
```

## Props

| Prop              | Type              | Default  | Description                 |
| ----------------- | ----------------- | -------- | --------------------------- |
| `json`            | `object \| array` | required | The JSON data to display    |
| `editable`        | `boolean`         | `false`  | Enable editing mode         |
| `searchable`      | `boolean`         | `true`   | Enable search functionality |
| `defaultExpanded` | `boolean`         | `true`   | Expand all nodes by default |

## Features in Detail

### Search and Filter

The JSON viewer includes powerful search capabilities that allow you to quickly find specific keys, values, or paths within your JSON data.

### Type Inference

Automatically detects and displays data types, including:

- Strings, Numbers, Booleans
- Arrays and Objects
- Dates and Timestamps
- URLs and Email addresses
- Colors and more

### Keyboard Shortcuts

- `Cmd/Ctrl + F`: Open search
- `Cmd/Ctrl + K`: Quick command palette
- Arrow keys: Navigate through tree

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch mode for development
npm run dev
```

## License

Apache-2.0

## Author

Erth AI, Inc.

## Repository

[GitHub Repository](https://github.com/przemyslaw-sobolewski-dev/json-viewer)
