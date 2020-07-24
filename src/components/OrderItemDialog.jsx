import React, { Component, Fragment } from 'react';
import dayjs from 'dayjs';
import MyButton from "../util/MyButton";
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import ReceiptIcon from '@material-ui/icons/Receipt';
import themeObject from "../util/theme";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme,
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    padding: '0',
    left: '75%'
  },
});

class OrderItemDialog extends Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  render() {
    const {
      classes,
      orderItem:
        {
          name,
          surname,
          email,
          telephone,
          pizza,
          dateCreated
        }
    } = this.props;

    const dialogMarkup =
      <Grid container spacing={ 5 }>
        <Grid item sm={ 5 }>
          <h2>Customer Details</h2>
          <Typography>Name: { name } { surname }</Typography>
          <Typography>Email: { email }</Typography>
          <Typography>Tel: { telephone }</Typography>
        </Grid>
        <Grid item sm={ 7 }>
          <h2>Order Details</h2>
          <Typography>{ pizza }</Typography>
          <Typography>Date { dayjs(dateCreated)
            .format('h:mm a. DD MMMM YYYY') }</Typography>
        </Grid>
      </Grid>
    ;

    return (
      <Fragment>
        <MyButton
          tip="View Order Details"
          onClick={ this.handleOpen }
          tipClassName={ classes.expandButton }
        >
          <ReceiptIcon color="primary"/>
        </MyButton>
        <Dialog
          open={ this.state.open }
          onClose={ this.handleClose }
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={ this.handleClose }
            tipClassName={ classes.closeButton }
          >
            <CloseIcon/>
          </MyButton>
          <DialogContent className={ classes.dialogContent }>
            { dialogMarkup }
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles(themeObject))(OrderItemDialog);
