import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
import Joi from 'joi-browser';
// Redux
import { connect } from "react-redux";
import { makeOrderDetails } from '../redux/actions/dataActions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
// Icons

import themeObject from "../util/theme";

const styles = (theme) => ({
  ...theme,
  button: {
    float: 'right'
  }
});

class MakeOrder extends Component {
  state = {
    data: {
      firstName: '',
      surname: '',
      email: '',
      telephone: '',
      pizza: ''
    },
    pizzas: [],
    errors: {},
    open: false
  }

  schema = {
    name: Joi.string()
      .required()
      .label('First Name'),
    surname: Joi.string()
      .required()
      .label('Surname'),
    email: Joi.string()
      .email()
      .required()
      .label('Email'),
    telephone: Joi.string()
      .trim()
      .regex(/^[0-9]{7,10}$/)
      .required()
      .label('Telephone')
      .error((errors) => {
        return errors.map(error => {
            switch (error.type) {
              case "string.regex.base":
                return { message: "Please enter a valid phone number." };
              default:
                return { message: "Please enter a valid phone number." };
            }
          }
        )
      }),
    pizza: Joi.string()
      .required()
      .error(() => 'Required')
  }

  validate = () => {
    const options = { abortEarly: false };
    // Setting the abort early to false will give us all the error messages.
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details)
      errors[item.path[0]] = item.message;

    return errors;
  }

  validateProperty = ({ name, value }) => {
    // Using a computed property to set the name part of the object at runtime.
    // So [name] can become 'username' or 'password' depending on what the
    // parameter name is set to.
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  componentDidMount() {
    const { pizzas } = this.props;

    this.mapPizzaDetailsToState(pizzas);
  }

  mapPizzaDetailsToState = (pizzas) => {
    this.setState({
      data: {
        name: '',
        surname: '',
        email: '',
        telephone: '',
        pizza: '',
      },
      pizzas,
      errors: {}
    })
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
    this.mapPizzaDetailsToState(this.props.pizzas);
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleChange = (event) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.target);
    if (errorMessage) errors[event.target.name] = errorMessage;
    else delete errors[event.target.name];

    const data = { ...this.state.data };
    data[event.target.name] = event.target.value;
    this.setState({ data, errors });
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = () => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    // If there are errors we just return without calling the server.
    if (errors) return;

    const orderDetails = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      telephone: this.state.telephone,
      pizza: this.state.pizza,
      dateCreated: Date.now()
    }
    this.props.makeOrderDetails(orderDetails);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    const { data, errors } = this.state;
    return (
      <Fragment>
        <MyButton tip="Edit details" onClick={ this.handleOpen } btnClassName="primary">
          Make Order
        </MyButton>
        <Dialog open={ this.state.open } onClose={ this.handleClose }
                fullWidth
                maxWidth="sm">
          <DialogTitle>Make an order</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="name"
                type="text"
                label="First Name"
                placeholder="Your first name"
                className={ classes.textField }
                value={ data.name }
                onChange={ this.handleChange }
                error={ errors.name ? true : false }
                fullWidth
              />
              { errors.name && (
                <Typography variant="body2" className={ classes.customError }>
                  { errors.name }
                </Typography>
              ) }
              <TextField
                name="surname"
                type="text"
                label="Surname"
                placeholder="Your surename"
                className={ classes.textField }
                value={ data.surname }
                onChange={ this.handleChange }
                error={ errors.surname ? true : false }
                fullWidth
              />
              { errors.surname && (
                <Typography variant="body2" className={ classes.customError }>
                  { errors.surname }
                </Typography>
              ) }
              <TextField
                name="email"
                type="text"
                label="Email"
                placeholder="Email address"
                className={ classes.textField }
                value={ data.email }
                onChange={ this.handleChange }
                error={ errors.email ? true : false }
                fullWidth
              />
              { errors.email && (
                <Typography variant="body2" className={ classes.customError }>
                  { errors.email }
                </Typography>
              ) }
              <TextField
                name="telephone"
                type="text"
                label="Telephone"
                placeholder="Home or mobile number"
                className={ classes.textField }
                value={ data.telephone }
                onChange={ this.handleChange }
                error={ errors.telephone ? true : false }
                fullWidth
              />
              { errors.telephone && (
                <Typography variant="body2" className={ classes.customError }>
                  { errors.telephone }
                </Typography>
              ) }
              <InputLabel id="demo-simple-select-helper-label">Choose a pizza</InputLabel>
              <Select
                name="pizza"
                value={ data.pizza }
                onChange={ this.handleChange }
                displayEmpty
                className={ classes.selectEmpty }
                inputProps={ { 'aria-label': 'Without label' } }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                { this.state.pizzas.map(pizza => <MenuItem key={ pizza.name }
                                                           value={ pizza.name }>{ pizza.name }</MenuItem>) }
              </Select>
              { errors.pizza && (
                <Typography variant="body2" className={ classes.customError }>
                  { errors.pizza }
                </Typography>
              ) }
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.handleClose } color="primary">
              Cancel
            </Button>
            <Button onClick={ this.handleSubmit } color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

MakeOrder.protoTypes = {
  makeOrderDetails: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  pizzas: state.data.pizzas
});

export default connect(mapStateToProps, { makeOrderDetails })(withStyles(styles(themeObject))(MakeOrder));

