declare module "*.png" { const value: any; export default value; }
declare module "*.jpg" { const value: any; export default value; }
declare module "*.jpeg" { const value: any; export default value; }
declare module "*.gif" { const value: any; export default value; }
declare module "*.webp" { const value: any; export default value; }

declare var require: any;
declare var console: {
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
};

declare module "@react-native-async-storage/async-storage" {
  const AsyncStorage: {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
  };
  export default AsyncStorage;
}
