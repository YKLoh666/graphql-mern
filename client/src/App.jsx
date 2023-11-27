import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { verifyAuth } from "./utils/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge: (existing, incoming) => {
            return incoming;
          },
        },
        projects: {
          merge: (existing, incoming) => {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  const [authState, setAuthState] = useState(null);
  useEffect(() => {
    verifyAuth(null, 0)
      .then(({ verified }) => {
        console.log(verified);
        setAuthState(verified);
      })
      .catch((err) => {
        throw new Error({ message: err.message });
      });
  }, []);

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header authState={authState} setAuthState={setAuthState} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={<Login setAuthState={setAuthState} />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
