import React, { Component } from 'react'
// import './LoadingHOC.css'
import { isEmpty } from '../Utility/Utils'

const LoadingHOC = (loadingProp) => (WrappedComponent) => {
  return class LoadingHOC extends Component {
    componentDidMount () {
      this.startTimer = Date.now()
    }

    componentWillUpdate (nextProps) {
      if (!isEmpty(nextProps[loadingProp])) {
        this.endTimer = Date.now()
      }
    }

    render () {
      const myProps = {
        loadingTime: ((this.endTimer - this.startTimer) / 1000).toFixed(2),
      }
      return isEmpty(this.props[loadingProp]) ? <div className="loader" /> : <WrappedComponent {...this.props} {...myProps} />
    }
  }
}

export default LoadingHOC