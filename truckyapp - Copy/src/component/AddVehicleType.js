import React, {Component} from "react"
import {Card, Form, Button, Col} from "react-bootstrap"
import axios from "axios"
import authHeader from "./service3/auth-header"
import Sidebar from "./sideBar"
import Navbar from "../component/Navbar/Navbar"
import "../component/MasterCss/sidebar.css"
import "../component/MasterCss/navbar.css"
import "../component/MasterCss/AddVehicleType.css"
import Footer from "./Footer"
import Grid from "@material-ui/core/Grid"

export default class AddVehicleType extends Component {
  constructor(props) {
    super(props)
    this.state = this.initialState

    this.submitVehicleType = this.submitVehicleType.bind(this)
    this.vehicleTypeChange = this.vehicleTypeChange.bind(this)
    this.resetVehicle = this.resetVehicle.bind(this)
  }

  initialState = {
    vehicleTypeId: "",
    vehicleType: "",
    vehicleName: "",
  }

  submitVehicleType = (event) => {
    event.preventDefault()
    // const submitVehicleTypes = {
    //     vehicleType: this.state.vehicleType,
    //     vehicleName: this.state.vehicleName

    // };

    const keys = ["vehicleType", "vehicleName"]
    const submitVehicleTypes = Object.entries(this.state).reduce(
      (res, [key, val]) => {
        if (keys.includes(key)) res[key] = Array.isArray(val) ? val[0] : val
        return res
      },
      {}
    )

    axios
      .post(
        "http://localhost:8082/trucky/v1/addVehicleType",
        submitVehicleTypes,
        {headers: authHeader()}
      )
      .then((response) => {
        if (response.data !== null) {
          alert(JSON.stringify(response.data.statusMessage))
          console.log(response)
        }
      })
      .catch(function (error) {
        if (error.response) {
          alert(JSON.stringify(error.response.data.error))
        }
      })
    this.setState(this.initialState)
  }

  vehicleTypeChange = (event) => {
    this.setState({
      [event.target.name]: [event.target.value],
    })
  }

  resetVehicle = () => {
    this.setState(() => this.initialState)
  }
  render() {
    return (
      <>
        <Sidebar />
        <Navbar />

        <div className="main2">
          <div className="div_vehicle_type">
            <Card.Header>{"Add New Vehicle Type"}</Card.Header>

            <Form
              onReset={this.resetVehicle}
              onSubmit={this.submitVehicleType}
              id="vehicleTypeId"
            >
              <Grid container>
                <Card.Body>
                  <Form.Row>
                    <Grid xs={12}>
                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Control
                        required
                        //autoComplete="off"
                        type="text"
                        name="vehicleType"
                        value={this.state.vehicleType}
                        onChange={this.vehicleTypeChange}
                        className={"bg-dark-text-white"}
                        placeholder="Enter Vehicle Type"
                      />
                    </Grid>
                    <Form.Label>Vehicle Name</Form.Label>
                    <Form.Control
                      required
                      //autoComplete="off"
                      type="text"
                      name="vehicleName"
                      value={this.state.vehicleName}
                      onChange={this.vehicleTypeChange}
                      className={"bg-dark-text-white"}
                      placeholder="Enter Vehicle Name"
                    />
                  </Form.Row>
                </Card.Body>
              </Grid>
              <Card.Footer style={{textAlign: "right"}}>
                <Button size="sm" variant="warning" type="submit">
                  {this.state.id ? "Update" : "Submit"}
                </Button>{" "}
                <Button size="sm" variant="warning" type="reset">
                  Reset
                </Button>{" "}
                {/* <Button size="sm" variant="success" type="button" onClick={this.serviceList.bind()}>
                        Service List
                    </Button> */}
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
