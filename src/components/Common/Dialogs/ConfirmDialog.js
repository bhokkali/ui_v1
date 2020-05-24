import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ConfirmDialog extends React.Component {
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
    const { dialogTitle, dialogContent, cancelBtnText, cancelBtnCB, confirmBtnText, confirmBtnCB } = this.props
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            { dialogContent }
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmBtnCB} color="primary">
              {confirmBtnText}
            </Button>
            <Button onClick={cancelBtnCB} color="primary">
              {cancelBtnText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}