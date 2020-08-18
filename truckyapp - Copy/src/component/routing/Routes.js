import React from "react"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import AddVehicleType from "../AddVehicleType"
import AddDriver from "../AddDriver"
import ManageDriver from "../ManageDriver"
import Login from "../authentication3/login.component"
import Register from "../authentication3/register.component"
import DriverProfile from "../DriverProfile"
import ManageVehicleList from "../ManageVehicleList"
import Addvehicles from "../Addvehicles"

const routing = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/manageVehicle" exact component={ManageVehicleList} />
      <Route path="/addVehicle" exact component={Addvehicles} />
      <Route path="/addVehicleType" exact component={AddVehicleType} />
      <Route path="/edit/:vehicleId" exact component={Addvehicles} />
      <Route path="/addDriver" exact component={AddDriver} />
      <Route path="/manageDriver" exact component={ManageDriver} />
      <Route path="/editDriver/:id" exact component={AddDriver} />
      <Route path="/profileDriver/:id" exact component={DriverProfile} />
    </Switch>
  )
}

export default routing
