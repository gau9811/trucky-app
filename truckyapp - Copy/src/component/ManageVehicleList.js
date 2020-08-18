import React, {useEffect, useState} from "react"
import {Table, ButtonGroup, Button} from "react-bootstrap"
import axios from "axios"
import {Link} from "react-router-dom"
import * as moment from "moment"
import "moment-timezone"
import SideBar from "./sideBar"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"

import CardContent from "@material-ui/core/CardContent"

import Typography from "@material-ui/core/Typography"
import "./MasterCss/ManageVehicle.css"
import Navbar from "../component/Navbar/Navbar"
import Footer from "./Footer"

import "../component/MasterCss/sidebar.css"
import "../component/MasterCss/navbar.css"
import authHeader from "./service3/auth-header"

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
    fontSize: "20px",
  },
  pos: {
    marginBottom: 12,
  },
}))

const ManageVehicleList = () => {
  const [vehicleList, setVehicleList] = useState([
    {
      VehicleId: 1,
      vehicleType: "truck",
      vehicleRegNumber: 123456789410014644,
      vehicleName: "tata",
    },

    {
      VehicleId: 2,
      vehicleType: "truck",
      vehicleRegNumber: 123456,
      vehicleName: "tata",
    },
    {
      VehicleId: 2,
      vehicleType: "truck",
      vehicleRegNumber: 123456,
      vehicleName: "tata",
    },
    {
      VehicleId: 2,
      vehicleType: "truck",
      vehicleRegNumber: 123456,
      vehicleName: "tata",
    },
    {
      VehicleId: 2,
      vehicleType: "truck",
      vehicleRegNumber: 123456,
      vehicleName: "tata",
    },
    {
      VehicleId: 2,
      vehicleType: "truck",
      vehicleRegNumber: 123456,
      vehicleName: "tata",
    },
  ])

  const [driverList, setdriverlist] = useState([])
  const classes = Styles()

  useEffect(() => {
    axios
      .get("http://localhost:8082/trucky/v1/getAllVehiclesDetails", {
        headers: authHeader(),
      })
      .then((response) => response.data)
      .then((data) => {
        setVehicleList(data)
      })

    axios
      .get("http://localhost:8083/trucky/v1/getAllDrivers", {
        headers: authHeader(),
      })
      .then((response) => response.data)
      .then((data) => {
        setdriverlist(data)
      })
  }, [])

  return (
    <>
      <Navbar />
      <SideBar />

      <div className="main2">
        <div className="Card_div">
          {/* <Card className="manage_root1" variant="outlined"> */}
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Your vehicle - | ManageVehicles
            </Typography>

            {vehicleList.length === 0 ? (
              <tr align="center">
                <td colSpan="6">{vehicleList.length} Vehicles Available</td>
              </tr>
            ) : (
              vehicleList.map((vehiclelist) => (
                <Grid
                  container
                  className="ManageVehicleList_grid"
                  key={vehicleList.id}
                >
                  <Grid sm={2} xs={12}>
                    <h6> Registration Number</h6>
                    <h7 classeName={classes.title}>
                      {vehiclelist.vehicleRegNumber}
                    </h7>
                  </Grid>
                  <Grid sm={2} xs={12}>
                    <h6>Vehicle Type</h6>
                    <h7 classeName={classes.tableText}>
                      {vehiclelist.vehicleType}
                    </h7>
                  </Grid>
                  <Grid sm={2} xs={12}>
                    <h6>Vehicle Name</h6>
                    <h7 classeName={classes.tableText}>
                      {vehiclelist.vehicleName}
                    </h7>
                  </Grid>
                  <Grid sm={2} xs={12}>
                    <h6>Driver Name</h6>
                    <h7 classeName={classes.tableText}>
                      {driverList
                        .filter((item) => {
                          return item.id === vehiclelist.vehicleDriver
                        })
                        .map((item) => {
                          return <h7>{item.name}</h7>
                        })}
                    </h7>
                  </Grid>
                  <Grid sm={2} xs={12}>
                    <h6>In Service?</h6>
                    <h7 classeName={classes.tableText}>
                      {vehiclelist.vehicleInService === false ? "No" : "Yes"}
                    </h7>
                  </Grid>
                  <Grid sm={2} xs={12}>
                    <h6>Action</h6>
                    <Button size="lg" variant="warning" type="button">
                      <Link
                        to={"edit/" + vehiclelist.vehicleId}
                        className="btn btn-sm btn-outline-dark"
                      >
                        Edit
                      </Link>{" "}
                    </Button>
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

export default ManageVehicleList
