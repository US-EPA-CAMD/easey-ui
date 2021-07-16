export const config = {
  app: {
    env: process.env.REACT_APP_EASEY_ECMPS_UI_ENV || "local-dev",
    published: process.env.REACT_APP_EASEY_ECMPS_UI_PUBLISHED || "local",
    version: process.env.REACT_APP_EASEY_ECMPS_UI_VERSION || "v0.0.0",
    title: process.env.REACT_APP_EASEY_ECMPS_UI_TITLE || "CAMD",
  },
  services: {
    mdm: {
      uri:
        process.env.REACT_APP_EASEY_MDM_API ||
        "https://easey-dev.app.cloud.gov/api/master-data-mgmt",
    },
    facilities: {
      uri:
        process.env.REACT_APP_EASEY_FACILITIES_API ||
        "https://easey-dev.app.cloud.gov/api/facility-mgmt",
    },
    emissions: {
      uri:
        process.env.REACT_APP_EASEY_EMISSIONS_API ||
        "https://easey-dev.app.cloud.gov/api/emissions-mgmt",
    },
    monitorPlans: {
      uri:
        process.env.REACT_APP_EASEY_MONITOR_PLAN_API ||
        "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt",
    },
    authApi: {
      uri:
        process.env.REACT_APP_EASEY_AUTH_API ||
        "https://easey-dev.app.cloud.gov/api/auth-mgmt",
    },
  },
};

export default config;
