import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from "./components/Home";
import Orders from "./components/Orders";
import NotFound from "./components/NotFound";
// MUI
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObject from './util/theme';
import desktopImage from './images/pizza-desktop.jpg';
import mobileImage from './images/pizza-mobile.jpg';
import withStyles from "@material-ui/core/styles/withStyles";
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

const theme = createMuiTheme(themeObject);
const styles = (theme) => ({
  ...theme,
  button: {
    float: 'right'
  }
});

const App = () => {
  const imageUrl = useWindowWidth() >= 650 ? desktopImage : mobileImage;

  return (
    <MuiThemeProvider theme={ theme }>
      <Provider store={ store }>
        <div className="App" style={ { backgroundImage: `url(${ imageUrl })` } }>
          <div className="App-content">
            <Router>
              <Switch>
                <Route path="/orders" component={ Orders }/>
                <Route exact path="/" component={ Home }/>
                <Redirect exact from="/" to="/movies"/>
                <Route path="/not-found" component={ NotFound }/>
                <Redirect to="/not-found"/>
              </Switch>
            </Router>
          </div>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return windowWidth;
};

export default withStyles(styles(themeObject))(App);
