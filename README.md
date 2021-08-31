# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Will open [http://localhost:3000/btc-usd] to view it in the browser.
When first load app, please wait for a while

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Notes

1. Use React/Redux/Typescript and rxjs
2. Use websockets to get live asset data from coinbase, create the bid/ask price chart and order book
3. latest create-react-app typescript has a bug that maybe automatically change jxs to react-jsx in tsconfig.json, can add DISABLE_NEW_JSX_TRANSFORM=true in .env
