import React, {useState, useEffect} from "react"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

import Undraw from "../../img/undraw.svg"
import Grid from "@material-ui/core/Grid"
import Trucky from "../../img/trucky.png"

import Circle from "../../img/Circle.png"
import Clock from "../../img/Clock.png"
import Dollar from "../../img/Dollar.png"
import Supply from "../../img/Supply.jpg"
import Laptop from "../../img/laptop.jpg"
import Integration from "../../img/Integration.jpg"
import Customer from "../../img/customer.jpg"
import Ipad from "../../img/ipad.png"
import Footer from "../Footer"

// import Trucky from "../../img/t.png"
import AuthService from "../service3/auth.service"
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import "../MasterCss/sidebar.css"

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

const MainPage = () => {
  const [ActiveLoad, SetActiveLoad] = useState({activeLoad: "40,000"})
  const [Shipping, SetShipping] = useState({shippings: "140,000"})
  const [Money, SetMoney] = useState({activeLoad: "74,40,000"})
  const [num, setNum] = useState({state: 0})
  const [num2, setNum2] = useState({state: 0})
  const [num3, setNum3] = useState({state: 0})
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

  var OpenBar = (e) => {
    e.preventDefault()

    setOpen({width: "250px"})
    setMain({marginLeft: "250px"})
  }

  var CloseBar = (e) => {
    e.preventDefault()
    setOpen({width: "0px"})
    setMain({marginLeft: "0px"})
  }

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

  // useEffect(() => {
  //   setInterval(() => {
  //     if (num.state < 10) {
  //       setNum({state: num.state++})
  //     }
  //   }, 10)
  // }, [])

  // useEffect(() => {
  //   setInterval(() => {
  //     if (num2.state < 50) {
  //       setNum2({state: num2.state++})
  //     }
  //   }, 1)
  // }, [])

  // useEffect(() => {
  //   setInterval(() => {
  //     if (num3.state < 40) {
  //       setNum3({state: num3.state++})
  //     }
  //   }, 1)
  // }, [])

  const MainSection = () => {
    return (
      <>
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <h1 className="welcome_h1">Trucky</h1>
            <h4 className="welcome_Tagline">
              Let's begin with your Happiness and Our responsiblity{" "}
            </h4>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <img className="undraw_img" src={Undraw} />
          </Grid>
        </Grid>
      </>
    )
  }

  const ExplainSection = () => {
    return (
      <>
        <div className={classes.root}>
          <Grid container className={classes.explain_root}>
            <Grid xs={12} sm={3} md={3} lg={3}>
              <h1 className="explain_text">Happing Now</h1>
            </Grid>
            <Grid xs={12} sm={3} md={3} lg={3}>
              <h2 className="explain_text">
                <img src={Circle} /> {ActiveLoad.activeLoad} Active Loads
              </h2>
            </Grid>
            <Grid xs={12} sm={3} md={3} lg={3}>
              <h2 className="explain_text">
                <img src={Clock} /> {Shipping.shippings} Shipment Delays Predict
                Today
              </h2>
            </Grid>
            <Grid xs={12} sm={3} md={3} lg={3}>
              <h2 className="explain_text">
                <img src={Dollar} /> {Money.activeLoad} Potential Execption
                Management Savings
              </h2>
            </Grid>
          </Grid>
        </div>
      </>
    )
  }

  const SupplySection = () => {
    return (
      <>
        <Grid container className={classes.root}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <div className="supply_div">
              <h1 className="supply_h1">
                Supply Chain Management Starts with Real-time Visibility
              </h1>
              <h3 className="supply_h3">
                Combining powerful machine learning with the world’s largest
                data network, Trucky optimizes global supply chains for
                industry-leading brands. Through real-time visibility and
                data-driven insights, we give you the power to take control like
                never before. Together, we’re not just transforming your supply
                chain – we’re redefining supply chain management to give you a
                distinct competitive advantage.
              </h3>
            </div>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid>
            <button className="supply_button">CONTACT US</button>
          </Grid>
        </Grid>
      </>
    )
  }

  const EcoSystem = () => {
    return (
      <>
        <Grid container className={classes.root}>
          <Grid xs={12} sm={6} md={6} lg={6}>
            <h1 className="Eco_h1">chain ecosystem from a trusted resource</h1>
            <h3 className="Eco_h2">
              Trucky drives efficiency across your entire supply chain
              operation, turning blind spots into opportunities for endless
              visibility and collaboration.
            </h3>
            <div className="Eco_button_div">
              <button className="Eco_button">NETWORK SOLUTIONS</button>
            </div>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={6}>
            <div className="Eco_Img_div">
              <img className="Eco_Img" src={Supply} />
            </div>
          </Grid>
        </Grid>
      </>
    )
  }

  const RealTimeSystem = () => {
    return (
      <>
        <Grid container className={classes.root}>
          <Grid xs={12} sm={6} md={6} lg={6}>
            <div className="Real_Img_div">
              <img className="Real_Img" src={Laptop} />
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={6}>
            <h1 className="Real_h1">
              Real-time, predictive insights, right at your fingertips
            </h1>
            <h3 className="Real_h2">
              With the largest network of supply chain data on the planet,
              Trucky empowers the world’s leading shippers, carriers and 3PLs
              with end-to-end real-time predictive visibility. Put our platform
              to work for you to deliver increased utilization, automation and
              cost savings across your entire supply chain
            </h3>
            <div className="Real_button_div">
              <button className="Real_button">PlatForms</button>
            </div>
          </Grid>
        </Grid>
      </>
    )
  }

  const GreaterEnterPriceSystem = () => {
    return (
      <>
        <div className={classes.root}>
          <Grid container>
            <Grid xs={12} sm={6}>
              <div className="Eco_Img_div">
                <img className="Eco_Img" src={Integration} />
              </div>
            </Grid>
            <Grid xs={12} sm={6}>
              <h1 className="Greater_h1">Greater enterprise compatibility</h1>
              <h3 className="Eco_h2">
                Trucky interfaces with your existing ERP, TMS and dispatch
                systems to get you up and running – and realizing value – in no
                time. Experience a seamless onboarding process with FourKites’
                90+ out-of-the-box integrations with ERP, TMS and dispatch
                systems, and 200+ ELD connections.
              </h3>
              <div className="Eco_button_div">
                <button className="Eco_button">LEARN MORE</button>
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    )
  }

  const ChangingSystem = () => {
    return (
      <>
        <Grid container className={classes.root}>
          <Grid xs={12} sm={4} md={4} lg={4}>
            <h1 className="change_h1">{num.state}+</h1>
            <h5 className="Real_h2">TMS/ERP INTEGRATIONS</h5>
          </Grid>

          <Grid xs={12} sm={4} md={4} lg={4}>
            <h1 className="change_h1">{num2.state}+</h1>
            <h5 className="Real_h2">ELD/TELEMATICS INTEGRATIONS</h5>
          </Grid>
          <Grid xs={12} sm={4} md={4} lg={4}>
            <h1 className="change_h1">{num3.state}+</h1>
            <h5 className="Real_h2">CARRIER DISPATCH SYSTEMS</h5>
          </Grid>
        </Grid>
      </>
    )
  }

  const CustomerServiceSystem = () => {
    return (
      <>
        <Grid container className={classes.root}>
          <Grid xs={12} sm={6} md={6} lg={6}>
            <div className="Customer_div">
              <h1 className="Customer_h1">
                helping our customers solve their most complex challenges
              </h1>
              <h3 className="Customer_h2">
                We believe in putting data to work to make our platform and your
                ecosystem work better for you. With a platform that covers all
                modes, all loads, in 55 countries, and the largest proprietary
                network of GPS/ELD devices, you can always find the solutions
                you need.
              </h3>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={6}>
            <div className="Customer_Img_div">
              <img className="Customer_Img" src={Customer} />
            </div>
          </Grid>
        </Grid>
      </>
    )
  }

  const MarginSystem = () => {
    return (
      <>
        <Grid container className={classes.root}>
          <Grid xs={12} sm={6} md={6} lg={6}>
            <div className="Real_Img_div">
              <img className="change_Img" src={Ipad} />
            </div>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={6}>
            <h1 className="Real_h1">Start Enhancing Margins Today</h1>
            <h3 className="Real_h2">
              Explore how real-time tracking and predictive insights can quickly
              convert into real business value for your company. Use our ROI
              Calculator to check how much your company can save.
            </h3>
            <div className="Real_button_div">
              <button className="Real_button">CALCULATE SAVINGS</button>
            </div>
          </Grid>
        </Grid>
      </>
    )
  }

  const ChainSystem = () => {
    return (
      <>
        <Grid container className={classes.root}>
          <Grid xs={12} sm={12} md={12} lg={12}></Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <h1 className="Real_h1">
              End-to-end supply chain orchestration starts with real-time
              visibility
            </h1>
            <h3 className="Real_h2">
              Together, we are redefining supply chain management. Contact our
              team to learn more.
            </h3>
            <div className="Real_button_div">
              <button className="Real_button">CONTACT US</button>
            </div>
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <>
      <nav className="navbar">
        <span className="open-slide">
          <a href="" onClick={(e) => OpenBar(e)}>
            <svg width="30" height="30">
              <path d="M0,5 30,5" stroke="#fff" strokeWidth="5" />
              <path d="M0,14 30,14" stroke="#fff" strokeWidth="5" />
              <path d="M0,23 30,23" stroke="#fff" strokeWidth="5" />
            </svg>
          </a>
        </span>
        <div>
          <img className="header_logo" src={Trucky} />
        </div>

        <div className="navbar-nav">
          <Grid container className={classes.root3}>
            <Grid sm={3}>
              <div className="dropdown">
                <span className="HeaderText">Company Overview</span>
                <div className="dropdown-content">
                  <Link>
                    <a>link 1</a>
                  </Link>
                  <Link>
                    <a>link 1</a>
                  </Link>
                  <Link>
                    <a>link 1</a>
                  </Link>
                </div>
              </div>
            </Grid>
            <Grid sm={3}>
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
            <Grid sm={3}>
              <Link>
                <h6 className="HeaderTextContact">Contact Us</h6>
              </Link>
            </Grid>{" "}
            <Grid sm={3}>
              <Link to="login">
                <h6 className="HeaderTextSignup">SignUp </h6>
              </Link>
            </Grid>
          </Grid>
        </div>
      </nav>

      <div style={Open} className="side-nav">
        <a href="" onClick={(e) => CloseBar(e)} className="btn-close">
          &times;
        </a>
        <div className="side-3-field">
          <li>
            <Link>
              <ListItem button>
                <ListItemText
                  primary={"Comapny Overview"}
                  className={classes.link}
                />
              </ListItem>
            </Link>
          </li>
          <li>
            <Link>
              <ListItem button>
                <ListItemText
                  primary={"Success Stories"}
                  className={classes.link}
                />
              </ListItem>
            </Link>
          </li>
        </div>
        <li>
          {/* <a href=""> */}{" "}
          {currentUser ? (
            <Link to="/login">
              <ListItem button onClick={logOut}>
                <ListItemText primary={"Logout"} className={classes.link} />
              </ListItem>
            </Link>
          ) : (
            <Link to="/login">
              <ListItem button>
                <ListItemText primary={"Login"} className={classes.link} />
              </ListItem>
            </Link>
          )}
          {/* </a> */}
        </li>
        <li>
          {!currentUser && (
            <Link to="/register">
              <ListItem button>
                <ListItemText primary={"SignUp"} className={classes.link} />
              </ListItem>
            </Link>
          )}
        </li>
        <li>
          {showHome && (
            <Link to="">
              <ListItem button>
                <ListItemText primary={"Home"} className={classes.link} />
              </ListItem>
            </Link>
          )}
        </li>
        <li>
          {showVehicle && (
            <ListItem button onClick={handleClick} className={classes.arrow}>
              <ListItemText primary="Vehicle" className={classes.link} />
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          )}
        </li>
        <li>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div">
              {showVehicle && (
                <Link to="addVehicle">
                  <ListItem button>
                    <ListItemText primary={"Add Vehicle"} />
                  </ListItem>
                </Link>
              )}

              {showVehicle && (
                <Link to="addVehicleType">
                  <ListItem button>
                    <ListItemText primary={"Add Vehicle Type"} />
                  </ListItem>
                </Link>
              )}
              {showVehicle && (
                <Link to="manageVehicle">
                  <ListItem button>
                    <ListItemText primary={"Manage Vehicle"} />
                  </ListItem>
                </Link>
              )}
            </List>
          </Collapse>

          {showDriver && (
            <ListItem button onClick={handleClick2} className={classes.arrow}>
              <ListItemText primary="Driver" className={classes.link} />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          )}

          <Collapse
            in={open2}
            timeout="auto"
            unmountOnExit
            className={classes.link}
          >
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
        </li>
      </div>

      <div style={main}>
        <MainSection />
        <ExplainSection />
        <SupplySection />
        <EcoSystem />
        <RealTimeSystem />
        <GreaterEnterPriceSystem />
        <ChangingSystem />
        <CustomerServiceSystem />
        <MarginSystem />
        <ChainSystem />
        <Footer />
      </div>
    </>
  )
}

export default MainPage
