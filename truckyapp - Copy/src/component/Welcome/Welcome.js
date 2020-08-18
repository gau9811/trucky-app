import React from "react"
import {Jumbotron} from "react-bootstrap"
import "./welcome.css"
import Carousel from "react-bootstrap/Carousel"
import Grid from "@material-ui/core/Grid"

class Welcome extends React.Component {
  render() {
    return (
      <>
        <Grid container>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <h1 className="welcome">Trucky</h1>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default Welcome
