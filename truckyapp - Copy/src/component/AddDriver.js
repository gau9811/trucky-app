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

export default class AddDriver extends Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.resetDriver = this.resetDriver.bind(this)
    this.driverChange = this.driverChange.bind(this)
    this.submitDriver = this.submitDriver.bind(this)
  }

  initialState = {
    id: "",
    name: "",
    identityType: "",
    identityNumber: "",
    dateOfBirth: "",
    licenseNum: "",
    homeAddress: "",
    dateOfJoin: "",
    isInService: "",
  }

  componentDidMount() {
    const driverId = +this.props.match.params.id
    if (driverId) {
      this.findDriverById(driverId)
    }
  }

  findDriverById = (driverId) => {
    axios
      .get("http://localhost:8083/trucky/v1/driver/" + driverId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.data.id,
            name: response.data.data.name,
            identityType: response.data.data.identityType,
            identityNumber: response.data.data.identityNumber,
            dateOfBirth: moment(response.data.data.dateOfBirth).format(
              "YYYY-MM-DD"
            ),
            licenseNum: response.data.data.licenseNum,
            homeAddress: response.data.data.homeAddress,
            dateOfJoin: moment(response.data.data.dateOfJoin).format(
              "YYYY-MM-DD"
            ),
            isInService: response.data.data.isInService,
          })
        }
      })
      .catch((error) => {
        console.error("Error-  " + error)
      })
  }

  resetDriver = () => {
    this.setState(() => this.initialState)
  }

  driverChange = (event) => {
    this.setState({
      [event.target.name]: [event.target.value],
    })
  }

  submitDriver = (event) => {
    event.preventDefault()

    const keys = [
      "name",
      "identityType",
      "identityNumber",
      "dateOfBirth",
      "licenseNum",
      "homeAddress",
      "dateOfJoin",
      "isInService",
    ]
    const submitDrivers = Object.entries(this.state).reduce(
      (res, [key, val]) => {
        if (keys.includes(key)) res[key] = Array.isArray(val) ? val[0] : val
        return res
      },
      {}
    )

    axios
      .post("http://localhost:8083/trucky/v1/addDriver", submitDrivers)
      .then((response) => {
        if (response.data != null) {
          alert(response.data.statusMessage)
        }
      })
    this.setState(this.initialState)
  }

  updateDriver = (event) => {
    event.preventDefault()

    const keys = [
      "name",
      "identityType",
      "identityNumber",
      "dateOfBirth",
      "licenseNum",
      "homeAddress",
      "dateOfJoin",
      "isInService",
    ]
    const updateDriver = Object.entries(this.state).reduce(
      (res, [key, val]) => {
        if (keys.includes(key)) res[key] = Array.isArray(val) ? val[0] : val
        return res
      },
      {}
    )

    axios
      .put("http://localhost:8083/trucky/v1/editDriver", updateDriver)
      .then((response) => {
        if (response.data != null) {
          setTimeout(() => this.driverList(), 1000)
          alert(response.data.statusMessage)
        }
      })
    this.setState(this.initialState)
  }

  driverList = () => {
    return this.props.history.push("/manageDriver")
  }

  render() {
    return (
      <>
        <SideBar />
        <Navbar />

        <div className="main2">
          <div className="main_Add_Driver">
            <Card.Header>
              {this.state.id ? "Update Driver" : "Add Driver"}
            </Card.Header>

            <Form
              onReset={this.resetDriver}
              onSubmit={this.state.id ? this.updateDriver : this.submitDriver}
              id="addDriverId"
            >
              <Grid Container>
                <Card.Body className="border">
                  <Grid xs={12}>
                    <Form.Row>
                      <Form.Label>Driver Name</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="text"
                        name="name"
                        disabled={this.state.id ? true : false}
                        value={this.state.name}
                        onChange={this.driverChange}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Driver Name"
                      />
                    </Form.Row>
                  </Grid>

                  <Form.Row>
                    <Grid xs={12}>
                      <Form.Label>Identity Type</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="text"
                        name="identityType"
                        disabled={this.state.id ? true : false}
                        value={this.state.identityType}
                        onChange={this.driverChange}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Identity Type(Pan , Aadhar..)"
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Form.Label>Identity Number</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="text"
                        name="identityNumber"
                        disabled={this.state.id ? true : false}
                        value={this.state.identityNumber}
                        onChange={this.driverChange}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Identity Number"
                      />
                    </Grid>
                  </Form.Row>

                  <Form.Row>
                    <Grid xs={12}>
                      <Form.Label>Driver Date Of Birth</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="Date"
                        name="dateOfBirth"
                        disabled={this.state.id ? true : false}
                        value={this.state.dateOfBirth}
                        onChange={this.driverChange}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Date Of Birth"
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Form.Label>Driving License Number</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="text"
                        name="licenseNum"
                        disabled={this.state.id ? true : false}
                        value={this.state.licenseNum}
                        onChange={this.driverChange}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Driving License Number"
                      />
                    </Grid>
                  </Form.Row>

                  <Form.Row>
                    <Form.Label>Home Address</Form.Label>
                    <Form.Control
                      required
                      //autoComplete="off"
                      type="text"
                      name="homeAddress"
                      value={this.state.homeAddress}
                      onChange={this.driverChange}
                      className={"bg-dark-text-white"}
                      placeholder="Enter Home Address"
                    />
                  </Form.Row>

                  <Form.Row>
                    <Grid xs={12}>
                      <Form.Label>Driver Date Of Join</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="Date"
                        name="dateOfJoin"
                        disabled={this.state.id ? true : false}
                        value={this.state.dateOfJoin}
                        onChange={this.driverChange}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Date Of Join"
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Form.Label>At Work?</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        as="select"
                        name="isInService"
                        value={this.state.isInService}
                        onChange={this.driverChange}
                        className={"bg-dark-text-white"}
                        placeholder="Select"
                      >
                        <option value=""> Select</option>
                        <option value={true}>Yes </option>
                        <option value={false}>No </option>
                      </Form.Control>
                    </Grid>
                  </Form.Row>
                </Card.Body>
              </Grid>
              <Grid container>
                <Card.Footer style={{textAlign: "right"}}>
                  <Grid xs={12}>
                    <Button size="sm" variant="warning" type="submit">
                      {this.state.id ? "Update" : "Submit"}
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="warning"
                      type="button"
                      className="height:10px"
                      onClick={this.driverList.bind()}
                    >
                      Driver List
                    </Button>
                  </Grid>
                </Card.Footer>
              </Grid>
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
