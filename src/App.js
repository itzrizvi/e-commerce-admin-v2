import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import store from './redux/store';
import Admin from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './utility/apollo';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/es/modal/style';
// import 'antd/es/slider/style';
import './config/customTable.css'
import AuthVerify from './utility/auth_verify';
import ResetPassword from './container/profile/authentication/overview/ResetPassword';
import NotFound404 from './container/noFound/404';
import Pool from './components/pool/Pool';

const { theme } = config;

const ProviderConfig = () => {
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector(state => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);
  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
        <ApolloProvider client={apolloClient} >
          <Router basename={process.env.PUBLIC_URL}>
            <AuthVerify />
            <Pool/>
            {
              path.split("/")[1] === "reset-password" ? <Route exact path="/reset-password/:codeHashed" component={ResetPassword} /> :
              !isLoggedIn ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/admin" component={Admin} />}
              {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
                <Redirect to="/admin" />
              )
            }
          </Router>
        </ApolloProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);
