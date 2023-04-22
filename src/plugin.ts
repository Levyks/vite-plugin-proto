import path from 'path';
import protobuf, { type IParseOptions } from 'protobufjs';

type PluginConfig = {
  basePath?: string;
  resolvePath?: (origin: string, target: string) => string;
  parseOptions?: IParseOptions;
}

export default (config: PluginConfig = {}) => {
  
  const basePath = config.basePath || './';
  const resolvePath = config.resolvePath || 
    ((_, target) => path.resolve(basePath, target));
  
  return {
    name: 'vite-plugin-proto',
    transform: async (_code: string, id: string) => {
      if (!id.endsWith(".proto")) return;

      const root = new protobuf.Root();
      root.resolvePath = resolvePath;
      await root.load(id, config.parseOptions);

      const json = JSON.stringify(root.toJSON());

      return {
        code: `export default ${json};`,
        map: null,
      }
    }
  }
}
