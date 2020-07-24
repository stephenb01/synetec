import React, { Component } from 'react';
import { Box } from "@material-ui/core";
import MakeOrder from "./MakeOrder";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import themeObject from "../util/theme";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme,
  home_buttons: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Home extends Component {

  render() {

    const { classes } = this.props;

    return (
      <Box className={classes.home_buttons}>
        <MakeOrder className="buttons button"/>
        <Link to="/orders" style={{paddingLeft: '20px'}}>
          <Button className="buttons" variant="contained" color="primary">Orders</Button>
        </Link>
      </Box>
    );
  }
}

export default withStyles(styles(themeObject))(Home);
