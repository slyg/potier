import React                  from 'react';
import { connect }            from 'react-redux';
import PayBox                 from '../components/PayBox';

const PayBoxContainer = (props) => <PayBox {...props} />;

const mapStateToProps = ({discount}) => ({...discount});

export default connect(mapStateToProps)(PayBoxContainer);
