class GraphiqlController < ApplicationController
  protect_from_forgery with: :null_session

  def show
    render html: graphiql_html.html_safe, layout: false
  end

  private

  def graphiql_html
    <<~HTML
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>GraphiQL</title>
        <link rel="stylesheet" href="https://unpkg.com/graphiql@3/graphiql.min.css" />
        <style>
          html, body, #root { height: 100%; margin: 0; width: 100%; overflow: hidden; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/graphiql@3/graphiql.min.js"></script>
        <script>
          const fetcher = GraphiQL.createFetcher({ url: '/graphql' });
          ReactDOM.createRoot(document.getElementById('root')).render(
            React.createElement(GraphiQL, { fetcher })
          );
        </script>
      </body>
      </html>
    HTML
  end
end
