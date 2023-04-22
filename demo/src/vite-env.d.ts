/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.proto' {
  import type { INamespace } from "protobufjs";

  const namespace: INamespace;
  export default namespace;
}