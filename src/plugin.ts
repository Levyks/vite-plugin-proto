import path from 'path';
import { Root, type IParseOptions } from 'protobufjs';
import type { PluginOption } from 'vite';

type PluginConfig = {
  basePath?: string;
  resolvePath?: (origin: string, target: string) => string;
  parseOptions?: IParseOptions;
}

export const proto = (config: PluginConfig = {}): PluginOption => {
  
  const basePath = config.basePath || './';
  const resolvePath = config.resolvePath || 
    ((_, target) => path.resolve(basePath, target));
  
  return {
    name: 'vite-plugin-proto',
    transform: async (_, id) => {
      if (!id.endsWith(".proto")) return;

      const root = new Root();
      root.resolvePath = resolvePath;
      await root.load(id, config.parseOptions);

      const json = JSON.stringify(root.toJSON());

      return {
        code: `export default ${json};`,
      }
    }
  }
}
