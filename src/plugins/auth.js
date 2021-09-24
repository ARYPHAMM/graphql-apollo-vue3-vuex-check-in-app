import axios from "axios";
import {login,fetchUser}  from "../graphql/user.query";

// eslint-disable-next-line no-unused-vars

class Auth {
  constructor(obj) {
    this.fetchPath = obj.fetchPath || null;
    this.path = obj.path || null;
    this.fetchTime = obj.fetchTime || null;
    if (obj.autoFetch)
      this.fetch();
  }

  async login(user) {
    return new Promise((resolve, reject) => {
      login(user).then((response) => {
        localStorage.setItem("user",response.login.token_type+' '+response.login.access_token);
        return resolve(response.login.user);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => reject(false));
    });
  }
  logout() {
    localStorage.removeItem("user");
    
  }
  async fetch() {
    setInterval(
      () => {
        if (this.token() != null) {
          // eslint-disable-next-line no-unused-vars
          const item = axios
            .post(
              this.path + this.fetchPath,
              {},
              {
                headers: {
                  Authorization:this.token(),
                },
              }
            )
            // eslint-disable-next-line no-unused-vars
            .then((response) => {
              // this.user = response.data;
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
              // this.user = false;
              localStorage.removeItem("user");
            });
        } else {
          // this.user = false;
          localStorage.removeItem("user");
        }
      },
      this.fetchTime == null ? 10000 : this.fetchTime
    );
  }
  token() {
    return localStorage.getItem("user");
  }
  async user() {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      fetchUser()
        .then((response) => {
            resolve(response.user);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          // this.user = false;
          // localStorage.removeItem("user");
          reject(false);
        });
    });
  }
  async register(user, path) {
    const item = await axios.post(this.path + path, user);
    return item;
  }
}

export default Auth;
//export default new Auth();
