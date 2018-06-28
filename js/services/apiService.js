'use strict';
import axios from 'axios/index';

export class ApiService {
  static config = {
    headers: {
      'Accept': '*/*',
      'OCS-APIREQUEST': true,
      'requesttoken': window.oc_requesttoken,
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

  static Get = (url) => axios.get(url, ApiService.config);
  static Post = (url, data) => axios.post(url, data, ApiService.config);
}
