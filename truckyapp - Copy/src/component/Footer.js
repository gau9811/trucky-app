import React, {useState} from "react"
import Grid from "@material-ui/core/Grid"
import moment from "moment"
import {makeStyles} from "@material-ui/core/styles"
import {BrowserRouter as Router, Link} from "react-router-dom"

const Styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: "40px",
    marginTop: "40px",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black",
    fontSize: "15px",
  },
  root2: {
    flexGrow: 1,
    textAlign: "center",
    backgroundColor: "#58595b",
    paddingTop: "30px",
  },
  paper2: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    fontSize: "15px",
  },
}))

const Footer = () => {
  const [date, setDate] = useState({date: moment().year()})
  const classes = Styles()

  return (
    <>
      <Grid container className={classes.root}>
        <Grid xs={12} sm={3} md={3} lg={3}>
          <Link>
            <h4 className={classes.paper}>RESOURCES</h4>
          </Link>
          <Link>
            <h4 className={classes.paper}>News</h4>
          </Link>
          <Link>
            <h4 className={classes.paper}>Blog</h4>
          </Link>
          <Link>
            <h4 className={classes.paper}>Events</h4>
          </Link>
          <Link>
            <h4 className={classes.paper}>Supply Chain Visibility</h4>
          </Link>
          <Link>
            <h4 className={classes.paper}>Software</h4>
          </Link>
          <Link>
            <h4 className={classes.paper}>ROI of Real-Time Visibility</h4>
          </Link>
        </Grid>
        <Grid xs={12} sm={3} md={3} lg={3}>
          <Link>
            <h4 className={classes.paper}>TRUCKY CAREERS</h4>
          </Link>
          <Link>
            <h4 className={classes.paper}> Chicago</h4>
          </Link>
          <Link>
            <h4 className={classes.paper}>Chennai</h4>
          </Link>
          <Link>
            <h4 className={classes.paper}>Current Openings</h4>
          </Link>
        </Grid>
        <Grid xs={12} sm={3} md={3} lg={3}>
          <Link>
            <h4 className={classes.paper}> CONNECT WITH TRUCKY</h4>
          </Link>
          <Link>
            <h4 className={classes.paper}>Contact</h4>
          </Link>
          <Link>
            <h4 className={classes.paper}>Login</h4>
          </Link>
        </Grid>
        <Grid xs={12} sm={3} md={3} lg={3}>
          <Link>
            <h4 className={classes.paper}>FOLLOW TRUCKY</h4>
          </Link>
        </Grid>
      </Grid>
      <Grid container className={classes.root2}>
        <Grid xs={12} sm={4} md={4} lg={4}>
          <Link>
            <h5 className={classes.paper2}>Insert Address</h5>
          </Link>
        </Grid>
        <Grid xs={12} sm={4} md={4} lg={4}>
          <Link>
            <h5 className={classes.paper2}>
              PRIVACY POLICY TERMS OF USE COPYRIGHT POLICY
            </h5>
          </Link>
        </Grid>
        <Grid xs={12} sm={4} md={4} lg={4}>
          <Link>
            <h5 className={classes.paper2}>
              © {date.date} & {date.date + 1} TRUCKY, Inc. All rights reserved.
            </h5>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

export default Footer
