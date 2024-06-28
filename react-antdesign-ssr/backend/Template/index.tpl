<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link href="/build/index.css" rel="stylesheet" type="text/css"/>

    {{__LINK_TAGS__}}

    <style>
    .ant-avatar-image img {
      width: 32px;
      height: 32px;
    }
    </style>

    <script>
      window.config = {
        DEMO_NODE_SERVER_HOST: "{{DEMO_NODE_SERVER_HOST}}",
        DEMO_NODE_SERVER_PORT: "{{DEMO_NODE_SERVER_PORT}}"
      };
      window.__PRELOADED_STATE__ = {{__PRELOADED_STATE__}};
      {{JS}}
    </script>

    
  </head>
  <body>
    <root>    
      {{ROOT}}
    </root>   
    <script src="/build/index.js" type="text/javascript"></script>
  </body>
</html>
