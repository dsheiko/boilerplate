<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/build/index.css" rel="stylesheet" type="text/css"/>
  </head>
  <body>
    <root></root>
    <script>
      window.config = {
        DEMO_NODE_SERVER_HOST: "{{DEMO_NODE_SERVER_HOST}}",
        DEMO_NODE_SERVER_PORT: "{{DEMO_NODE_SERVER_PORT}}"
      };
    </script>
    <script src="/build/index.js" type="text/javascript"></script>
  </body>
</html>
