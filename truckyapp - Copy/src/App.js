import React, {Fragment} from "react"
import "./App.css"
import MainPage from "./component/mainPage/mainPage"
import {BrowserRouter as Router, Route} from "react-router-dom"
import routing from "./component/routing/Routes"

function App() {
  return (
    <Router>
      <Fragment>
        <Route path="/" exact component={MainPage} />
        <Route component={routing} />
      </Fragment>
    </Router>
  )
}

export default App
