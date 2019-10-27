const config = require('../config.json').mbsr_connection;
//NOTE: Make sure the settings in config.json match the configuration needed to connect to your deployed MBSR server.

class API {
  constructor() {
    this.url = `${config.protocol}://${config.host}:${config.port}`;
    this.user = null;

    // Check to see if cached cookie matches a logged in session on the server side
    // this.check_session();
  }

  async check_session() {
    let response = await this.get('/account').catch(err => {
      return {error: err};
    });
    if (response.data) this.user = response.data;
    return response;
  }

  get_user() {
    return this.user;
  }

  async post(path, params) {
    let call = await fetch(`${this.url}/api${path}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).catch(err => {
      return {error: err};
    });

    if (!call.ok) return {error: call.statusText};

    if (!call.json) return call;

    return await call.json();
  }

  async get(path) {
    let call = await fetch(`${this.url}/api${path}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch(err => {
      return {error: err};
    });
    if(!call.ok)
      return {error: `${call.status}`};

    if (!call.json) return call;

    return await call.json().catch(err => {
      return {error: err};
    });
  }

  async get_page(path, page_size, page_number) {
    url = `${path}?limit=${page_size}&start=${page_number * page_size}`;
    const result = await this.get(url);
    return result;
  }

  async login(username, password) {
    let response = await this.post('/login', {
      username: username,
      password: password,
    });

    // save user data to instance if login was successful
    if (!response.error && response.data) this.user = response.data;

    return response;
  }

  async logout() {
    this.user = null;
    return await this.get('/logout');
  }

  /**
   * Takes the relative url path for a file conatined within a strapi content entry
   * and converts it to a url that can be read by the MBSR Server
   * (which then routes the desired file to the user)
   */
  convert_file_url(path) {
    const base_path = '/uploads/';
    if (path.startsWith(base_path)) path = path.slice(base_path.length);
    return `${this.url}/api/content/file/${path}`;
  }
}

export default new API();
