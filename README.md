# vite-plugin-proto

[![npm](https://img.shields.io/npm/v/vite-plugin-proto.svg)](https://www.npmjs.com/package/vite-plugin-proto)

> Allows you to import proto files as a parsed object directly in your code, uses protobufjs under the hood.

```ts
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

import greeterNamespace from './proto/greeter.proto';

const packageDefinition = protoLoader.fromJSON(greeterNamespace);
const packageObject = grpc.loadPackageDefinition(packageDefinition);
```

### Usage

```ts
import proto from 'vite-plugin-proto';

export default {
  plugins: [
    proto(),
  ]
}
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| basePath | `string` | `./` | The base path that will be used to resolve other .proto files in `import` statements, useless if you define `resolvePath` |
| resolvePath | `(origin: string, target: string) => string` | `(_, target) => path.resolve(basePath, target)` | A function that will be used to resolve other .proto files in `import` statements |
| parseOptions | `import('protobufjs').IParseOptions` | `undefined` | Options that will be passed to protobufjs's `load` method |
