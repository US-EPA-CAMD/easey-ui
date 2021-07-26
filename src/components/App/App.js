import React, { useEffect } from "react";
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';

import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";

import Layout from "../Layout/Layout";
import config from '../../config';
import { handleActiveElementFocus } from "../../additional-functions/add-active-class";
import { AppVersion } from "@us-epa-camd/easey-design-system";

import "./App.scss";

const App = () => {
 
 useEffect(() => {
    handleActiveElementFocus();

    document
      .querySelector(".usa-banner__content")
      .classList.add("react-transition");
    document.querySelector(".usa-banner__content").classList.add("fade-in");

    // * clean up
    return () => {
      handleActiveElementFocus();
    };
  }, []);

  return (
    <div>
      <Layout>
        <Switch>
          <Redirect from="/home" to="/" />
          <Route path="/" exact component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
        <AppVersion
            publishDate={config.app.published}
            version={config.app.version}
        />
    </div>
  );
};

export default App;
