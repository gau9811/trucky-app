import React, {Component} from "react"
import Form from "react-validation/build/form"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import Grid from "@material-ui/core/Grid"
import "../MasterCss/login.css"
import SideBar from "../sideBar"
import AuthService from "../service3/auth.service"
import Welcome from "../Welcome/Welcome"
import Cube from "../../img/menu.png"

const required = (value) => {
  if (!value) {
    return (
      <div className="Form_alerts" role="alert">
        <h7 className="Form_alerts_h7">This field is required!</h7>
      </div>
    )
  }
}

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  handleLogin(e) {
    e.preventDefault()

    this.setState({
      message: "",
      loading: true,
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/")
          window.location.reload()
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          this.setState({
            loading: false,
            message: resMessage,
          })
        }
      )
    } else {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    return (
      <>
        <Grid container>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Welcome />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c
              }}
            >
              <div className="form_div">
                <div className="form-group">
                  <label className="Form_username">Username</label>
                  <Input
                    type="text"
                    className="Login_Input"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label className="Form_password">Password</label>
                  <Input
                    type="password"
                    className="Login_Input"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <button className="Form_button" disabled={this.state.loading}>
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>
                <h7>No SignUp?</h7>{" "}
                <Link to="/register">
                  <h7 className="Form_password">Signup</h7>
                </Link>
              </div>
              {this.state.message && (
                <div className="form-group">
                  <div className="form_message" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{display: "none"}}
                ref={(c) => {
                  this.checkBtn = c
                }}
              />
            </Form>
          </Grid>
        </Grid>
      </>
    )
  }
}
