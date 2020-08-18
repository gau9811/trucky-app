import React, {Component} from "react"
import {Card, Form, Button, Col} from "react-bootstrap"
import axios from "axios"
import * as moment from "moment"
import "moment-timezone"
import SideBar from "./sideBar"
import Navbar from "../component/Navbar/Navbar"
import "../component/MasterCss/sidebar.css"
import "../component/MasterCss/navbar.css"
import "../component/MasterCss/AddDriver.css"
import Footer from "./Footer"
import Grid from "@material-ui/core/Grid"

import authHeader from "./service3/auth-header"
import Sidebar from "./sideBar"

export default class Addvehicles extends Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.vehicleChange = this.vehicleChange.bind(this)
    this.resetVehicle = this.resetVehicle.bind(this)
    this.submitVehicle = this.submitVehicle.bind(this)
    this.vehicleNameChange = this.vehicleNameChange.bind(this)
    this.vehicleDriverNameChange = this.vehicleDriverNameChange.bind(this)
    this.updateVehicle = this.updateVehicle.bind(this)
  }

  initialState = {
    vehicleId: "",
    vehicleRegNumber: "",
    vehicleChassisNumber: "",
    vehicleEngineNumber: "",
    vehicleDateOfReg: "",
    vehicleYearOfMfg: "",
    vehicleName: [],
    vehicleNameOnChamge: [],
    vehicleDriverName: [],
    vehicleInService: "",
    vehicleDriverNameOnChange: [],
  }

  resetVehicle = () => {
    this.setState(() => this.initialState)
  }

  vehicleChange = (event) => {
    this.setState({
      [event.target.name]: [event.target.value],
    })
  }

  // vehicleNameChange = event => {
  //     if(this.state.vehicleId){
  //     this.setState({
  //         vehicleName: JSON.parse(event.target.value)

  //     })
  // }else {
  //     this.setState({
  //         vehicleNameOnChamge: JSON.parse(event.target.value)
  //     })

  // }
  // }

  vehicleNameChange = (event) => {
    this.setState({
      vehicleNameOnChamge: JSON.parse(event.target.value),
    })
  }

  vehicleDriverNameChange = (event) => {
    this.setState({
      vehicleDriverNameOnChange: JSON.parse(event.target.value),
    })
  }

  submitVehicle = (event) => {
    event.preventDefault()

    const submitVehicles = {
      vehicleRegNumber: this.state.vehicleRegNumber[0],
      vehicleChassisNumber: this.state.vehicleChassisNumber[0],
      vehicleEngineNumber: this.state.vehicleEngineNumber[0],
      vehicleDateOfReg: this.state.vehicleDateOfReg[0],
      vehicleYearOfMfg: this.state.vehicleYearOfMfg[0],
      vehicleTypeId: this.state.vehicleNameOnChamge.vehicleTypeId,
      vehicleDriver: this.state.vehicleDriverNameOnChange.id,
      vehicleInService: this.state.vehicleInService[0],
    }

    axios
      .post("http://localhost:8082/trucky/v1/addVehicle", submitVehicles, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.data != null) {
          alert("Vehicle Added Successfully")
        }
      })
    this.setState(this.initialState)

    console.log(submitVehicles)
  }

  componentDidMount() {
    axios
      .get("http://localhost:8082/trucky/v1/getAllVehicleTypes", {
        headers: authHeader(),
      })
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          vehicleName: data,
        })
      })

    axios
      .get("http://localhost:8083/trucky/v1/getAllDrivers", {
        headers: authHeader(),
      })
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          vehicleDriverName: data,
        })
      })

    const vehicleId = +this.props.match.params.vehicleId
    if (vehicleId) {
      this.findVehicleById(vehicleId)
    }
  }

  findVehicleById = (vehicleId) => {
    axios
      .get("http://localhost:8082/trucky/v1/vehicle/" + vehicleId, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.data != null) {
          this.setState({
            vehicleId: response.data.data.id,
            vehicleRegNumber: response.data.data.regNumber,
            vehicleChassisNumber: response.data.data.vehicleChassisNumber,
            vehicleEngineNumber: response.data.data.engineNumber,
            vehicleDateOfReg: moment(
              response.data.data.vehicleDateOfReg
            ).format("YYYY-MM-DD"),
            vehicleYearOfMfg: response.data.data.yearOfMfg,
            vehicleName: this.state.vehicleName
              .filter((item) => {
                return item.vehicleTypeId === response.data.data.vehicleTypeId
              })
              .map((item) => {
                return item
              }),
          })
        }
      })
      .catch((error) => {
        console.error("Error-  " + error)
      })
  }

  updateVehicle = (event) => {
    event.preventDefault()

    const updateService = {
      vehicleRegNumber: this.state.vehicleRegNumber,
      vehicleChassisNumber: this.state.vehicleChassisNumber,
      vehicleEngineNumber: this.state.vehicleEngineNumber,
      vehicleDateOfReg: this.state.vehicleDateOfReg,
      vehicleYearOfMfg: this.state.vehicleYearOfMfg,
      vehicleTypeId: this.state.vehicleName[0].vehicleTypeId,
      vehicleDriver: this.state.vehicleDriverNameOnChange.id,
      vehicleInService: this.state.vehicleInService[0],
    }

    axios
      .put("http://localhost:8082/trucky/v1/editVehicle", updateService, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.data != null) {
          setTimeout(() => this.vehicleList(), 1000)
          alert(response.data.statusMessage)
        }
      })
    this.setState(this.initialState)
  }

  vehicleList = () => {
    return this.props.history.push("/manageVehicle")
  }

  render() {
    return (
      <>
        <Sidebar />
        <Navbar />
        <div className="main2">
          <div className="main_Add_Driver">
            <Card.Header>
              {this.state.vehicleId ? "Update Vehicle" : "Add New Vehicle"}
            </Card.Header>
            <Form
              onReset={this.resetVehicle}
              onSubmit={
                this.state.vehicleId ? this.updateVehicle : this.submitVehicle
              }
              id="addVehicleId"
            >
              <Grid container>
                <Card.Body>
                  <Grid xs={12}>
                    <Form.Row>
                      <Form.Label>Registration Number</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="text"
                        name="vehicleRegNumber"
                        value={this.state.vehicleRegNumber}
                        onChange={this.vehicleChange}
                        disabled={this.state.vehicleId ? true : false}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Registration Number"
                      />

                      <Form.Label>Chassis Number</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="text"
                        name="vehicleChassisNumber"
                        disabled={this.state.vehicleId ? true : false}
                        value={this.state.vehicleChassisNumber}
                        onChange={this.vehicleChange}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Chassis Number"
                      />
                    </Form.Row>
                  </Grid>
                  <Grid xs={12}>
                    <Form.Row>
                      <Form.Label>Engine Number</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="text"
                        name="vehicleEngineNumber"
                        disabled={this.state.vehicleId ? true : false}
                        value={this.state.vehicleEngineNumber}
                        onChange={this.vehicleChange}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Engine Number"
                      />

                      <Form.Label>Registration Date</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="Date"
                        disabled={this.state.vehicleId ? true : false}
                        name="vehicleDateOfReg"
                        value={this.state.vehicleDateOfReg}
                        onChange={this.vehicleChange}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Date Of Registration"
                      />
                    </Form.Row>
                  </Grid>
                  <Grid xs={12}>
                    <Form.Row>
                      <Form.Label>Year Of Mfg</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="Number"
                        name="vehicleYearOfMfg"
                        disabled={this.state.vehicleId ? true : false}
                        value={this.state.vehicleYearOfMfg}
                        onChange={this.vehicleChange}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Manufacturing Year"
                      />

                      <Form.Label>Vehicle Name</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        as="select"
                        multiple={false}
                        name="vehicleName"
                        disabled={this.state.vehicleId ? true : false}
                        onChange={this.vehicleNameChange}
                        className={"bg-dark-text-white"}
                      >
                        {this.state.vehicleId ? (
                          ""
                        ) : (
                          <option value=""> Select</option>
                        )}
                        {this.state.vehicleName.map((vehicleName, index) => (
                          <option
                            key={index}
                            value={JSON.stringify(vehicleName)}
                          >
                            {vehicleName.vehicleName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Row>
                  </Grid>
                  <Grid xs={12}>
                    <Form.Row>
                      <Form.Label>Driver Name</Form.Label>
                      <Form.Control
                        required
                        as="select"
                        name="vehicleDriverName"
                        onChange={this.vehicleDriverNameChange}
                        className={"bg-dark-text-white"}
                      >
                        <option value=""> Select</option>
                        {this.state.vehicleDriverName.map(
                          (vehicleDriverName, index) => (
                            <option
                              key={index}
                              value={JSON.stringify(vehicleDriverName)}
                            >
                              {vehicleDriverName.name}
                            </option>
                          )
                        )}
                      </Form.Control>

                      <Form.Label>In Service?</Form.Label>
                      <Form.Control
                        required
                        as="select"
                        name="vehicleInService"
                        onChange={this.vehicleChange}
                        className={"bg-dark-text-white"}
                        placeholder="In Service?"
                      >
                        <option value=""> Select</option>
                        <option value={true}>Yes </option>
                        <option value={false}>No </option>
                      </Form.Control>
                    </Form.Row>
                  </Grid>
                </Card.Body>
              </Grid>
              <Card.Footer style={{textAlign: "right"}}>
                <Button size="sm" variant="warning" type="submit">
                  {this.state.vehicleId ? "Update" : "Submit"}
                </Button>{" "}
                <Button
                  size="sm"
                  variant="warning"
                  type="button"
                  onClick={this.vehicleList.bind()}
                >
                  Vehicle List
                </Button>
              </Card.Footer>
            </Form>
          </div>
        </div>
        <div className="main3">
          <Footer />
        </div>
      </>
    )
  }
}
