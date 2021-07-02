import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

export const getAllControlTechnologies = async () => {
  return axios
    .get(`${config.services.mdm.uri}/control-technologies`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllFuelTypes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/fuel-types`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllUnitTypes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/unit-types`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllPrograms = async () => {
  return axios
    .get(`${config.services.mdm.uri}/programs`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllAccountTypes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/account-types`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllStates = async () => {
  return axios
    .get(`${config.services.mdm.uri}/states`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllBypassApproachCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/bypass-approach-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllSubstituteDataCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/sub-data-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllParameterCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/parameter-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllMethodCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/method-codes`)
    .then(handleResponse)
    .catch(handleError);
};
