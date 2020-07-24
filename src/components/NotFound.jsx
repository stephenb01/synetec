import React, { Component } from 'react';
import { Box } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import themeObject from "../util/theme";
import Paper from "@material-ui/core/Paper";
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
    padding: '40px',
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

class NotFound extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Box m="auto" className={ classes.page }>
        <Paper elevation={ 3 }>
          <h1 className={ classes.header }>Page Not Found</h1>
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

export default withStyles(styles(themeObject))(NotFound);


