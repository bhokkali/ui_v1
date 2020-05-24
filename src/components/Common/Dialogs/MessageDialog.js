import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  dialogSucsess: {
    backgroundColor: "green",
    color: '#fff'
  },
  dialogError: {
    backgroundColor: "red",
    color: '#fff'
  }
};


export class MessageDialog extends React.Component {
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.dialogOpenStatus });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, dialogTitle, dialogContent, cancelBtnText, cancelBtnCB, variant } = this.props
    const dispBg = variant === "success" ? classes.dialogSucsess : classes.dialogError
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={cancelBtnCB}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={dispBg}>{dialogTitle}</DialogTitle>
          <DialogContent>
            { dialogContent }
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelBtnCB} color="primary">
              {cancelBtnText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(MessageDialog)