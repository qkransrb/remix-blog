import { Outlet, LiveReload, Link, Links, Meta } from "@remix-run/react";
import globalStyles from "~/styles/global.css";

export const meta = () => {
  const description = "A cool blog built with Remix";
  const keywords = "remix, react, javascript";

  return {
    description,
    keywords,
  };
};

export const links = () => [{ rel: "stylesheet", href: globalStyles }];

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children, title }) {
  return (
    <html>
      <head>
        <Meta />
        <Links />
        <title>{title ? title : "Remix Blog"}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV !== "production" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>

        <ul className="nav">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>

      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}

export function ErrorBoundary({ error }) {
  console.log(error);

  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
}
