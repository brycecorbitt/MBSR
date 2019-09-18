const config = require('./config.json').api_config;

class API {
  constructor() {
    this.url = `${config.protocol}://${config.host}:${config.port}`;
    this.user = null;

    // Check to see if cached cookie matches a logged in session on the server side
    // this.check_session();
  }

  async check_session() {
    let response = await this.get('/account').catch(err => {return {error: err}});
    if(response.data)
        this.user = response.data;
    return response;
  }

  get_user() {
    return this.user;
  }

  async post(path, params) {
    let call = await fetch(`${this.url}/api${path}`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).catch(err => {return {error: err}});

    if(!call.json)
      return call;

    return await call.json();
  }

  async get(path) {
    let call = await fetch(`${this.url}/api${path}`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch(err => {return {error: err}});

    if(!call.json)
      return call;

    return await call.json();
  }

  async login(username, password) {
    let response = await this.post("/login", {username: username, password: password});

    // save user data to instance if login was successful
    if(!response.error && response.data)
      this.user = response.data;
    
    return response;
  }

  async logout() {
    this.user = null;
    return await this.get("/logout");

  }
}

export default new API();
