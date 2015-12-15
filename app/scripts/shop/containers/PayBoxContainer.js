import React                  from 'react';
import { connect }            from 'react-redux';

import PayBox                 from '../components/PayBox';

const PayBoxContainer = React.createClass({
  render: function(){
    return <PayBox {...this.props} />;
  }
});

const mapStateToProps = ({discount}) => ({...discount});

export default connect(mapStateToProps)(PayBoxContainer);
