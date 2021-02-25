import axios from "axios";

export class Http {

  static host = "http://localhost";
  static port = 3500;

  static get(url) {
    return axios.get( `${Http.getPrefix(url)}` );
  }

  static post(url, params) {
    return axios.post( `${Http.getPrefix(url)}`, params );
  }

  static getPrefix(url) {
    return `${Http.host}:${Http.port}/${url}`;
  }
}