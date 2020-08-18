import React, {Component} from "react"
import * as moment from "moment"
import "moment-timezone"
import axios from "axios"
import {Card, Form, Button, Col, InputGroup} from "react-bootstrap"
import Sidebar from "./sideBar"
import Navbar from "../component/Navbar/Navbar"
import "../component/MasterCss/sidebar.css"
import "../component/MasterCss/navbar.css"
import "../component/MasterCss/AddVehicleType.css"
import "../component/MasterCss/DriverProfile.css"

import Footer from "./Footer"
import Grid from "@material-ui/core/Grid"
import Contact from "../img/contact.png"
export default class DriverProfile extends Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
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
    file: null,
    images: [],
  }

  componentDidMount() {
    const driverId = +this.props.match.params.id
    if (driverId) {
      this.findDriverById(driverId)
    }
    // if(driverId){
    //     this.downloadAll(driverId);
    // }
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

  // downloadAll = (driverId) => {
  //     axios.get("http://localhost:8083/trucky/v1/"+driverId+"/image/downloadall")
  //         .then(response => {
  //                 this.setState({
  //                     images: response.data,
  //                 })

  //         }).catch((error) => {
  //             console.error("Error-  " + error);
  //         });
  // }

  driverList = () => {
    return this.props.history.push("/manageDriver")
  }

  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data)
    })
  }

  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  fileUpload(file) {
    const url = `http://localhost:8083/trucky/v1/${this.state.id}/image/upload`
    const formData = new FormData()
    formData.append("file", file)
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    return axios.post(url, formData, config)
  }

  render() {
    return (
      <>
        <Navbar />
        <Sidebar />

        <div className="main2">
          <div className="Drivermain">
            <div style={{maxWidth: "650px", margin: "0px auto"}}>
              <Grid container>
                <Grid xs={12} sm={12}>
                  <div
                    style={{
                      margin: "18px 0px",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {!this.state.id ? (
                        <img
                          style={{width: "100px", height: "100px"}}
                          src={Contact}
                        />
                      ) : (
                        <img
                          style={{width: "100px", height: "100px"}}
                          src={`http://localhost:8083/trucky/v1/${this.state.id}/image/download`}
                        />
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid container>
                  <Grid xs={12} sm={12}>
                    <div
                      style={{
                        margin: "18px 0px",
                        borderBottom: "1px solid grey",
                      }}
                    >
                      <h5 style={{color: "black"}}>Name: {this.state.name}</h5>
                      <h5 style={{color: "blaack"}}>
                        Identity Type: {this.state.identityType}
                      </h5>
                      <h5 style={{color: "black"}}>
                        Identity Number: {this.state.identityNumber}
                      </h5>
                      <h5 style={{color: "black"}}>
                        Date Of Birth: {this.state.dateOfBirth}
                      </h5>
                      <h5 style={{color: "black"}}>
                        License Number: {this.state.licenseNum}
                      </h5>
                      <h5 style={{color: "black"}}>
                        Home Address: {this.state.homeAddress}
                      </h5>
                      <h5 style={{color: "black"}}>
                        Date Of Join: {this.state.dateOfJoin}
                      </h5>
                      <h5 style={{color: "black"}}>
                        Is Allocated:{" "}
                        {this.state.isInService === true ? "Yes" : "No"}
                      </h5>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <form onSubmit={this.onFormSubmit}>
                <Grid container>
                  <Grid xs={12} sm={12}>
                    <input
                      type="file"
                      onChange={this.onChange}
                      className="Driver_profile_file"
                    />
                  </Grid>

                  <Grid xs={12} sm={12}>
                    <Button type="submit" size="lg" variant="warning">
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <br />
              <div>
                <Grid xs={12} sm={6}>
                  {!this.state.id ? (
                    <img
                      style={{width: "100px", height: "100px"}}
                      src={Contact}
                    />
                  ) : (
                    <img
                      style={{width: "100px", height: "100px"}}
                      src={`http://localhost:8083/trucky/v1/${this.state.id}/image/downloadall`}
                    />
                  )}{" "}
                  {""}
                  {!this.state.id ? (
                    <img
                      style={{width: "100px", height: "100px"}}
                      src={Contact}
                    />
                  ) : (
                    <img
                      style={{width: "100px", height: "100px"}}
                      src={`http://localhost:8083/trucky/v1/${this.state.id}/image/downloadall2`}
                    />
                  )}
                </Grid>
              </div>

              <br />
              <Grid xs={12} sm={12}>
                <Button
                  size="lg"
                  variant="warning"
                  type="button"
                  onClick={this.driverList.bind()}
                >
                  {" "}
                  Driver List{" "}
                </Button>
              </Grid>
            </div>
          </div>
        </div>
        <div className="main3">
          <Footer />
        </div>
      </>
    )
  }
}
