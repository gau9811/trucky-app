import React, {useEffect, useState} from "react"
import {Table, ButtonGroup} from "react-bootstrap"
import {Link} from "react-router-dom"
import "moment-timezone"

import {makeStyles} from "@material-ui/core/styles"

import "./MasterCss/ManageVehicle.css"
import AuthService from "./service3/auth.service"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import "../component/MasterCss/sidebar.css"
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core"
import Collapse from "@material-ui/core/Collapse"

const Styles = makeStyles((theme) => ({
  createpaper: {
    //width:'inherit',
    background: "#131921",
    color: "white",
    marginTop: "20px",
    height: "calc(90% - 50px)",
  },
  link: {
    textDecoration: "none",
    marginTop: "5px",
    //color: theme.palette.text.primary
    color: "white",
  },
}))

const Sidebar = () => {
  const [open1, setOpen1] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  const [open3, setopen3] = React.useState(false)
  const [showHome, setShowHome] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState(undefined)
  const [showVehicle, setShowVehicle] = React.useState(false)
  const [showDriver, setShowDriver] = React.useState(false)
  const [Open, setOpen] = useState({width: "0px"})
  const [main, setMain] = useState({marginLeft: "0px"})
  const classes = Styles()

  const handleClick = () => {
    setOpen1(!open1)
  }
  const handleClick2 = () => {
    setOpen2(!open2)
  }

  React.useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setShowHome(
        user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_USER")
      )
      setShowVehicle(user.roles.includes("ROLE_ADMIN"))
      setShowDriver(
        user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_USER")
      )
    }
  }, [])

  const logOut = () => {
    AuthService.logout()
    setCurrentUser(undefined)
    setShowHome(false)
    setShowVehicle(false)
    setShowDriver(false)
  }

  return (
    <>
      <div class="sidenav">
        <div className="Sidenav_other">
          <Link to="/login" className={classes.link}>
            <ListItem button>
              <ListItemText primary={"Company Overview"} />
            </ListItem>
          </Link>

          <Link to="/login" className={classes.link}>
            <ListItem button>
              <ListItemText primary={"Success Stories"} />
            </ListItem>
          </Link>

          <li>
            <Link to="/login" className={classes.link}>
              <ListItem button>
                <ListItemText primary={"Contact Us"} />
              </ListItem>
            </Link>
          </li>
        </div>

        <li>
          {" "}
          {currentUser ? (
            <Link to="/login" className={classes.link}>
              <ListItem button onClick={logOut}>
                <ListItemText primary={"Logout"} />
              </ListItem>
            </Link>
          ) : (
            <Link to="/login" className={classes.link}>
              <ListItem button>
                <ListItemText primary={"Login"} />
              </ListItem>
            </Link>
          )}
        </li>
        <li>
          {" "}
          {!currentUser && (
            <Link to="/register" className={classes.link}>
              <ListItem button>
                <ListItemText primary={"SignUp"} />
              </ListItem>
            </Link>
          )}
        </li>
        <li>
          {showHome && (
            <Link to="" className={classes.link}>
              <ListItem button>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
          )}
        </li>
        <li>
          <a>
            {showVehicle && (
              <ListItem button onClick={handleClick}>
                <ListItemText primary="Vehicle" />
                {open1 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            )}
          </a>
        </li>
        <li>
          <a>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {showVehicle && (
                  <Link to="addVehicle" className={classes.link}>
                    <ListItem button>
                      <ListItemText primary={"Add Vehicle"} />
                    </ListItem>
                  </Link>
                )}

                {showVehicle && (
                  <Link to="addVehicleType" className={classes.link}>
                    <ListItem button>
                      <ListItemText primary={"Add Vehicle Type"} />
                    </ListItem>
                  </Link>
                )}
                {showVehicle && (
                  <Link to="manageVehicle" className={classes.link}>
                    <ListItem button>
                      <ListItemText primary={"Manage Vehicle"} />
                    </ListItem>
                  </Link>
                )}
              </List>
            </Collapse>

            {showDriver && (
              <ListItem button onClick={handleClick2}>
                <ListItemText primary="Driver" />
                {open2 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            )}

            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {showDriver && (
                  <Link to="addDriver" className={classes.link}>
                    <ListItem button>
                      <ListItemText primary={"Add Driver"} />
                    </ListItem>
                  </Link>
                )}
                {showDriver && (
                  <Link to="manageDriver" className={classes.link}>
                    <ListItem button>
                      <ListItemText primary={"Manage Driver"} />
                    </ListItem>
                  </Link>
                )}
              </List>
            </Collapse>
          </a>
        </li>
      </div>
    </>
  )
}

export default Sidebar
