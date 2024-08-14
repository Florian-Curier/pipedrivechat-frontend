import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header'
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from '../reducers/user';
import alerts from '../reducers/alerts';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react";
import storage from 'redux-persist/lib/storage'
import { useRouter } from 'next/router';


const reducers = combineReducers({ user, alerts })
const persistConfig = { key: 'pipedrivechat', storage, blacklist: ['alerts'] }


const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

const persistor = persistStore(store);


function App({ Component, pageProps }) {

  const router = useRouter()

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>Pipedrive Chat</title>
          </Head>
        { !(router.pathname === '/' || router.pathname === '/install-confirmation') && <Header />}
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    );
  }


export default App;
