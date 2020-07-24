import React, { Component } from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import OrderItemDialog from "./OrderItemDialog";
import themeObject from "../util/theme";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme
});

class OrderItem extends Component {
  render() {
    const { orderItem } = this.props;
    return (
      <ListItem>
        <ListItemText primary={ orderItem.name + ' ' + orderItem.surname }/>
        <OrderItemDialog orderItem={ orderItem }/>
      </ListItem>
    );
  }
}

export default withStyles(styles(themeObject))(OrderItem);
