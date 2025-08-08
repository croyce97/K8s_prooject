import React from "react";  
import './styles.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import AmenityDetailPage from "./routes/AmenityDetailPage";
import { AmenitysContextProvider } from "./context/AmenitysContext";
const App = () => {
  return (
    <AmenitysContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/amenitys/:id/update"
              component={UpdatePage}
            />
            <Route
              exact
              path="/amenitys/:id"
              component={AmenityDetailPage}
            />
          </Switch>
        </Router>
      </div>
    </AmenitysContextProvider>
  );
};

export default App;
