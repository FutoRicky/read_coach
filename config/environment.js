/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'read-coach',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'default-src': "'none' *",
      'script-src': "'self' 'unsafe-eval' *",
      'font-src': "'self' *",
      'connect-src': "'self' *",
      'img-src': "'self' *",
      'style-src': "'self' 'unsafe-inline' *",
      'media-src': "'self' *"
    }
  };

  ENV['simple-auth'] = {
    authorizer: 'simple-auth-authorizer:token',
    crossOriginWhitelist: ['*']
  };

  ENV['simple-auth-token'] = {
    serverTokenEndpoint: 'token',
    identificationField: 'email',
    passwordField: 'password',
    refreshAccessTokens: true,
    timeFactor: 1000,
    refreshLeeway: 300,
    authoizationPrefix: 'Bearer',
    authorizationHeaderName: 'Authorization',
    // headers: {}
  };

  if (environment === 'development') {
    // ENV['simple-auth-token'].serverTokenEndpoint = "http://52168f9f.ngrok.io/users/sign_in";
    // ENV['simple-auth-token'].serverTokenRefreshEndpoint = "http://52168f9f.ngrok.io/users/sign_in";
    // ENV.apiURL = 'http://52168f9f.ngrok.io';

    ENV['simple-auth-token'].serverTokenEndpoint = "http://readcoach.herokuapp.com/users/sign_in";
    ENV['simple-auth-token'].serverTokenRefreshEndpoint = "http://readcoach.herokuapp.com/users/sign_in";
    ENV.apiURL = 'http://readcoach.herokuapp.com';

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV['simple-auth-token'].serverTokenEndpoint = "http://readcoach.herokuapp.com/users/sign_in";
    ENV.apiURL = 'http://readcoach.herokuapp.com';
    ENV['simple-auth'].store = 'simple-auth-session-store:ephemeral';
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV['simple-auth-token'].serverTokenEndpoint = "http://readcoach.herokuapp.com/users/sign_in";
    ENV['simple-auth-token'].serverTokenRefreshEndpoint = "http://readcoach.herokuapp.com/users/sign_in";
    ENV.apiURL = 'http://readcoach.herokuapp.com';
  }

  return ENV;
};
