export default ({ content, host, port, state }) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/build/index.css" rel="stylesheet" type="text/css"/>
  </head>
  <body>
    <root>${ content }</root>
    <script>
      window.REDUX_DATA = ${ JSON.stringify( state ) }
      window.config = {
        DEMO_NODE_SERVER_HOST: "${ host }",
        DEMO_NODE_SERVER_PORT: "${ port }"
      };
    </script>
    <script src="/build/index.js" type="text/javascript"></script>
  </body>
</html>`;
