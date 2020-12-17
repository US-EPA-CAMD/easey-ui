//import axios from "./axiosSetup";
import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

export async function getMonitoringPlans(orisCode) {
  return axios
    .get(`${config.services.monitorPlans.uri}/monitor-plans?orisCode=${orisCode}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getMonitoringMethods(locationId) {
  return axios
    .get(`${config.services.monitorPlans.uri}/monitoring-locations/${locationId}/methods`)
    .then(handleResponse)
    .catch(handleError);
}
