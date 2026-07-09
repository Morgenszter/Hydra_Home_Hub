$ErrorActionPreference = "Stop"
npm run hydra:android:clean
npm install --legacy-peer-deps
npm install --save-dev --legacy-peer-deps @babel/core@^7.20.0 @babel/parser@^7.20.0 @babel/runtime@^7.20.0 babel-preset-expo@~9.2.0 metro@0.70.3 metro-config@0.70.3 @types/node@16.18.126 typescript@~4.9.5
npm run hydra:android:doctor
npx tsc --noEmit --skipLibCheck
