import React from "react"
import "../MasterCss/navbar.css"
import Grid from "@material-ui/core/Grid"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles"
import "../MasterCss/sidebar.css"
import "../MasterCss/navbar.css"

const Styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  explain_root: {
    flexGrow: 1,
    backgroundColor: "#373a47",
    marginTop: "40px",
    width: "100%",
  },
  root3: {
    marginTop: "0px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  createpaper: {
    //width:'inherit',
    background: "#131921",
    color: "white",
    marginTop: "86px",
    height: "calc(90% - 50px)",
  },
  link: {
    textDecoration: "none",
    //color: theme.palette.text.primary
    color: "white",
    width: "50px",
    paddingLeft: "0px",
  },
  arrow: {
    textDecoration: "none",
    //color: theme.palette.text.primary
    color: "white",

    paddingLeft: "10px",
  },
}))

const Navbar = () => {
  const classes = Styles()
  return (
    <div className="navbar_grid">
      <div className="navbar-nav">
        <Grid
          container
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Grid sm={6}></Grid>
          <Grid sm={2}>
            <div className="dropdown">
              <span className="HeaderText">Company Success</span>
              <div className="dropdown-content">
                <Link>
                  <p>link 1</p>
                </Link>
                <Link>
                  <p>link 1</p>
                </Link>
                <Link>
                  <p>link 1</p>
                </Link>
              </div>
            </div>
          </Grid>
          <Grid sm={2}>
            <div className="dropdown">
              <span className="HeaderText">Success Stories</span>
              <div className="dropdown-content">
                <Link>
                  <p>link 1</p>
                </Link>
                <Link>
                  <p>link 1</p>
                </Link>
                <Link>
                  <p>link 1</p>
                </Link>
              </div>
            </div>
          </Grid>{" "}
          <Grid sm={2}>
            <Link>
              <h6 className="navHeaderTextContact">Contact Us</h6>
            </Link>
          </Grid>{" "}
        </Grid>
      </div>
    </div>
  )
}

export default Navbar
