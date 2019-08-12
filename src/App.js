import React, { Component } from 'react';
import {Provider} from "react-redux";
import { Jumbotron, Container } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import TypeOfUser from "./components/TypeOfUser";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Store from "./Store";


class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <div>
            <Container fluid>
              <Switch>
                <Route exact path="/" render={() => (
                    this.props.token ? (
                      <Redirect to="/dashboard" />
                    ) : (
                      <Redirect to="/login" />
                    )
                  )} />
                // <Route path="/dashboard" component={Dashboard} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </Switch>
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
