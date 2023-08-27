import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://578e66014fcd9489c44800e518bb319e@o4505778605391872.ingest.sentry.io/4505778626494464",

  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
});

export default Sentry;
