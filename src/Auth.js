import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: 'kabiyesi.auth0.com',
      audience: 'https://kabiyesi.auth0.com/userinfo',
      clientID: 'LUft9iOEONnQilP8mFDdmiBHdNljGJ2u',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.authFlag = 'isLoggedIn';
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  isAuthenticated() {
    // return new Date().getTime() < this.expiresAt;
    return JSON.parse(localStorage.getItem(this.authFlag));
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    // clear id token, and expiration
    //this.idToken = null;
    //this.expiresAt = null;
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'LUft9iOEONnQilP8mFDdmiBHdNljGJ2u',
    });
  }

  silentAuth() {
    if(this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  }
}

const auth = new Auth();

export default auth;