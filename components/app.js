import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    console.log(this.props.grocery_list);
    return (
      <div className="container">
        <h1>Grocery Guru</h1>
      </div>
    );
  }
}

function mapStateToProps({grocery_list}) {
  return {
    grocery_list
  }
}

export default connect(mapStateToProps, null)(App);