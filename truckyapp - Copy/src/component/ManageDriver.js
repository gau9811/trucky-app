import React, {Component} from "react"
import {Card, Table, ButtonGroup, Button} from "react-bootstrap"
import axios from "axios"
import {Link} from "react-router-dom"
import * as moment from "moment"
import "moment-timezone"

import {makeStyles} from "@material-ui/core/styles"
// import Card from "@material-ui/core/Card"
// import CardActions from "@material-ui/core/CardActions"
// import CardContent from "@material-ui/core/CardContent"
// import Button from "@material-ui/core/Button"
// import Typography from "@material-ui/core/Typography"

import authHeader from "./service3/auth-header"
import Sidebar from "./sideBar"
import Navbar from "../component/Navbar/Navbar"
import "../component/MasterCss/sidebar.css"
import "../component/MasterCss/navbar.css"
import "../component/MasterCss/AddVehicleType.css"
import Footer from "./Footer"
import Grid from "@material-ui/core/Grid"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const Styles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginBottom: "30px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}))

export default class ManageDriver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drivers: [{id: 1234, name: "gaurav"}],
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:8083/trucky/v1/getAllDrivers", {
        headers: authHeader(),
      })
      // axios.get("http://localhost:8083/trucky/v1/getAllDrivers")
      .then((response) => response.data)
      .then((data) => {
        this.setState({drivers: data})
      })
  }

  render() {
    var root = {
      minWidth: 275,
      marginBottom: "30px",
    }

    var title = {
      fontSize: "14px",
    }

    return (
      <>
        <Navbar />
        <Sidebar />
        <div className="main2">
          <div className={title}>
            {/* <Card style={root}> */}
            <CardContent>
              <Typography style={title} color="textSecondary" gutterBottom>
                Your vehicle - | ManageDriver
              </Typography>

              {this.state.drivers.length == 0 ? (
                <Grid xs={12} sm={12}>
                  <tr align="center">
                    <td colSpan="6">{this.state.drivers.length} Drivers </td>
                  </tr>
                </Grid>
              ) : (
                this.state.drivers.map((drivers) => (
                  <Grid
                    container
                    className="ManageVehicleList_grid"
                    key={drivers.id}
                  >
                    <Grid sm={2} xs={12}>
                      <h6>Driver Name</h6>
                      <h7>
                        <Link
                          to={"profileDriver/" + drivers.id}
                          variant="link"
                          className="text-warning"
                        >
                          {drivers.name}
                        </Link>
                      </h7>
                    </Grid>
                    <Grid sm={2} xs={12}>
                      <h6>ID Type</h6>
                      <h7>{drivers.identityType}</h7>
                    </Grid>
                    <Grid sm={2} xs={12}>
                      <h6>ID Number</h6>
                      <h7>{drivers.identityNumber}</h7>
                    </Grid>

                    <Grid sm={2} xs={12}>
                      <h6>Driver License Number</h6>
                      <h7>{drivers.licenseNum}</h7>
                    </Grid>
                    <Grid sm={2} xs={12}>
                      <h6>Is Available?</h6>
                      <h7>{drivers.isInService === true ? "Yes" : "No"}</h7>
                    </Grid>

                    <Grid sm={2} xs={12}>
                      <h6>Action</h6>
                      <h7>
                        <Button className="btn-warning">
                          <Link
                            to={"editDriver/" + drivers.id}
                            className="btn btn-sm btn-outline-dark"
                          >
                            Edit
                          </Link>{" "}
                          {/* <Button size="sm" variant="outline-danger" onClick={this.deleteService.bind(this, service.id)}>Delete</Button> */}
                        </Button>
                      </h7>
                    </Grid>
                  </Grid>
                ))
              )}
            </CardContent>
            {/* </Card> */}
          </div>
        </div>
        <div className="main3">
          <Footer />
        </div>
      </>
    )
  }
}
