export default ({ content, host, port, state }) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/build/index.css" rel="stylesheet" type="text/css"/>
    <script>
      window.__PRELOADED_STATE__ = ${ JSON.stringify( state ).replace(
        /</g,
        "\\u003c"
      ) };
      window.config = {
        DEMO_NODE_SERVER_HOST: "${ host }",
        DEMO_NODE_SERVER_PORT: "${ port }"
      };
    </script>
  </head>
  <body>
    <root>${ content }</root>    
    <script src="/build/index.js" type="text/javascript"></script>
  </body>
</html>`;
