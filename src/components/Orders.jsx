import React, { Component } from 'react';
import OrderItem from './OrderItem';
import { Box } from "@material-ui/core";
import List from '@material-ui/core/List';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import themeObject from "../util/theme";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  ...theme,
  button: {
    padding: '20px',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'table',
    paddingTop: '20px',
    margin: 'auto'
  },
  page: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Orders extends Component {

  render() {
    const { classes, orders } = this.props;

    const orderList = () => (orders.length) ? (
      <List style={ { width: '300px' } }>
        { orders.map(order => <OrderItem key={ order.dateCreated } orderItem={ order }/>) }
      </List>
    ) : (
      <Typography>Sorry there are no orders are present.</Typography>
    );

    return (
      <Box m="auto" className={ classes.page }>
        <Paper elevation={ 3 }>
          <h1 className={ classes.header }>Orders</h1>
          { orderList() }
          <span className={ classes.button }>
          <Link to="/">
            <Button className="buttons" variant="contained" color="primary">Home</Button>
          </Link>
          </span>
        </Paper>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.data.orders
});

export default connect(mapStateToProps)(withStyles(styles(themeObject))(Orders));

