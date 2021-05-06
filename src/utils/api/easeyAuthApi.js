import axios from "axios";
// import { handleError } from "./apiUtils";
import config from "../../config";

export async function authenticate(data_payload) {
  // return axios
  //   .post(`${config.services.authApi.uri}/authentication/authenticate`, data_payload)
  //   .then(response => {
  //       const { data } = response;
  //       sessionStorage.setItem('cdx_user', JSON.stringify(data));
  //       window.location.reload();
  //   })
  //   .catch(handleError);

    // return await axios({
    //     method: 'POST',
    //     url: `${config.services.authApi.uri}/authentication/authenticate`,
    //     data: data_payload
    // }).then(data_response => data_response.data).catch(e => e);

    try {
        return await axios({
            method: 'POST',
            url: `${config.services.authApi.uri}/authentication/authenticate`,
            data: data_payload
        }).then(data_response => {
            const { data } = data_response;
            sessionStorage.setItem('cdx_user', JSON.stringify(data));
            window.location.reload();
        })
        .catch(e => {
            throw e;
        });
    } catch (e) {
        return {
            success: false,
            message: e.response.data.message,
            statusCode: e.response.data.statusCode,
            error: e.response.data,
        };
    }
}
