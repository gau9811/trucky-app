import React from "react"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import "./Header.css"
import {makeStyles} from "@material-ui/core/styles"

const Styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "end",
  },
  explain_root: {
    flexGrow: 1,
    backgroundColor: "#373a47",
    marginTop: "40px",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

function Header() {
  const classes = Styles()
  return (
    <div className="dropdoenNon">
      <nav className="header">
        <Grid container className={classes.root}>
          <Grid xs={12} sm={3} md={3} lg={3}>
            {" "}
            <div className="dropdown">
              <span className="HeaderText">Company Overview</span>
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
          <Grid xs={12} sm={3} md={3} lg={3}>
            {" "}
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
          </Grid>
          <Grid xs={12} sm={3} md={3} lg={3}>
            {" "}
            <Link>
              <h6 className="HeaderText">Contact Us</h6>
            </Link>
          </Grid>{" "}
          <Grid xs={12} sm={3} md={3} lg={3}>
            <Link to="login">
              <h6 className="HeaderTextSignup">SignUp </h6>
            </Link>
          </Grid>{" "}
        </Grid>
      </nav>
    </div>
  )
}

export default Header
