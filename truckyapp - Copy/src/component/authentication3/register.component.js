import React, {Component} from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import {isEmail} from "validator"
import SideBar from "../sideBar"
import Grid from "@material-ui/core/Grid"
import Cube from "../../img/menu.png"
import "../MasterCss/login.css"

import AuthService from "../service3/auth.service"
import Welcome from "../Welcome/Welcome"

const required = (value) => {
  if (!value) {
    return (
      <div className="Form_alerts" role="alert">
        <h7 className="Form_alerts_h7">This field is required!</h7>
      </div>
    )
  }
}

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    )
  }
}

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="Form_alerts" role="alert">
        <h7 className="Form_alerts_h7">
          The username must be between 3 and 20 characters.
        </h7>
      </div>
    )
  }
}

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  handleRegister(e) {
    e.preventDefault()

    this.setState({
      message: "",
      successful: false,
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          })
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          this.setState({
            successful: false,
            message: resMessage,
          })
        }
      )
    }
  }

  render() {
    return (
      <div className="dropdoenNon">
        <Grid container>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Welcome />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Form
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c
              }}
            >
              <div className="form_div">
                {!this.state.successful && (
                  <div>
                    <div className="form-group">
                      <label className="Form_username">Username</label>
                      <Input
                        type="text"
                        className="Login_Input"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required, vusername]}
                      />
                    </div>

                    <div className="form-group">
                      <label className="Form_password">Email</label>
                      <Input
                        type="text"
                        className="Login_Input"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
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
                        validations={[required, vpassword]}
                      />
                    </div>

                    <div className="form-group">
                      <button className="Form_button">Sign Up</button>
                    </div>
                  </div>
                )}
              </div>
              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful ? "Login_In" : "Form_alerts_h7"
                    }
                    role="alert"
                  >
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
      </div>
    )
  }
}
