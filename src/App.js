import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        APP
      </div>
    );
  }
}

const mapStateToProps = (store) => {
    return { 
        //currentCity: store.currentCity
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setCityData: (id) => {
        //     dispatch(setCityData(id));
        // }
    };
}

App.propTypes = {
};

App.contextTypes = {
    store: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
