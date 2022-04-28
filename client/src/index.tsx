//npx create-react-app . --template typescript
//npm i mobx mobx-react-lite
//npm i axios @types/axios
//npm i dotenv




import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthStore from "./store/AuthStore";


interface State {
    authStore: AuthStore,
}

const authStore = new AuthStore();

export const Context = createContext<State>({
    authStore
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Context.Provider value={{
      authStore
  }}>
    <App />
  </Context.Provider>
);
