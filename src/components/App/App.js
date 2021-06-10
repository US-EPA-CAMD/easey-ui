import React, { useEffect, useRef, useState, useCallback } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { config } from "../../config";
import Modal from "../Modal/Modal";

import Home from "../mp-viewer/Home/Home";
import NotFound from "../NotFound/NotFound";

import Layout from "../Layout/Layout";
import MonitoringPlanHome from "../MonitoringPlanHome/MonitoringPlanHome";
import RuleEditor from "../RuleEditor/RuleEditor";
import Login from "../Login/Login";

import "./App.scss";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";

function App() {
  const [timeInactive, setTimeInactive] = useState(0);
  const [showInactiveModal, setShowInactiveModal] = useState(false);

  const resetUserInactivityTimer = () => {
    setTimeInactive(0);
    setShowInactiveModal(false);
    window.countdownInitiated = false;
  };

  const extendUserInactivityTimer = useCallback(() => {
    if (window.countdownInitiated !== true) {
      resetUserInactivityTimer();
    }
  }, []);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // *** remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    // *** open modal
    if (
      config.app.inactivityDuration - timeInactive <=
      config.app.countdownDuration
    ) {
      // *** make sure countdown has started
      if (window.countdownInitiated === false) {
        window.countdownInitiated = true;
        setShowInactiveModal(true);
      }
    }

    setTimeInactive(timeInactive + config.app.activityPollingFrequency);
  }, config.app.activityPollingFrequency);

  // *** assign / un-assign activity event listeners
  useEffect(() => {
    window.countdownInitiated = false;
    config.app.activityEvents.forEach((activityEvent) => {
      window.addEventListener(activityEvent, extendUserInactivityTimer);
    });

    // * clean up
    return () => {
      config.app.activityEvents.forEach((activityEvent) => {
        window.removeEventListener(activityEvent, extendUserInactivityTimer);
      });
    };
  }, [extendUserInactivityTimer]);

  return (
    <div>
      <div className={`usa-overlay ${showInactiveModal ? "is-visible" : ""}`} />
      <div>time inactive: {timeInactive / 1000} seconds</div>
      <Layout>
        <Switch>
          <Redirect from="/home" to="/" />
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/monitoring-plans"
            exact
            component={MonitoringPlanHome}
          />
          <Route
            path="/workspace/monitoring-plans/"
            exact
            component={MonitoringPlanHome}
          />
          <Route path="/admin/rules" exact component={RuleEditor} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
      {showInactiveModal ? (
        <Modal
          show={showInactiveModal}
          close={resetUserInactivityTimer}
          showCancel={true}
          cancelButtonText="OK"
          children={
            <CountdownTimer duration={config.app.countdownDuration / 1000} />
          }
        />
      ) : null}
    </div>
  );
}

export default App;
