import React, { Component } from 'react'
import { connect } from 'react-redux'

class Academics extends Component {
  render() {
    return (
      <React.Fragment>
        Academics page comes here
      </React.Fragment>
    );
  }
}

export default connect(
  state=>({

  }),
  {}
)(Academics)
