import React, { Component } from 'react';
import { Form, Header, Grid, Segment, Button, Message } from 'semantic-ui-react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import { signup } from '../../redux/modules/auth';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: ''
};

const SCHEMA = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.signup(values);
  }

  render() {
    return (
      <Formik
        initialValues={ INITIAL_STATE }
        validationSchema={ SCHEMA }
        onSubmit={ this.handleSubmit }
        render={ ({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
            <div className='signup-form'>
              <style>{`
                body > div,
                body > div > div,
                body > div > div > div.signup-form {
                  height: 100%;
                }
              `}</style>
              <Grid centered style={ { height: '100%' } } verticalAlign='middle'>
                <Grid.Column style={ { maxWidth: 900 } }>
                  { this.props.error && ( 
                    <Message
                      error
                      header='Sign Up Error'
                      content={ this.props.errorMessage }
                    />
                  )}
                  <Header as='h2' color='teal' textAlign='center'>
                    Sign Up
                  </Header>
                  <Segment>
                    <Form onSubmit={ handleSubmit }>
                      <Form.Field>
                        <label>Username</label>
                        <Form.Input
                          type="text"
                          name="username"
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          value={ values.username }
                          error={ errors.username && touched.username }
                        />
                        {errors.username && touched.username && <div style={ { color: 'red' } }>{errors.username}</div>}
                      </Form.Field>
                      <Form.Field>
                        <label>Email Address</label>
                        <Form.Input
                          type="email"
                          name="email"
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          value={ values.email }
                          error={ errors.email && touched.email }
                        />
                        {errors.email && touched.email && <div style={ { color: 'red' } }>{errors.email}</div>}
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <Form.Input
                          type="password"
                          name="password"
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          value={ values.password }
                          error={ errors.password && touched.password }
                        />
                        {errors.password && touched.password && <div style={ { color: 'red' } }>{errors.password}</div>}
                      </Form.Field>
                      <Button type="submit" color='teal' fluid size='large' disabled={ this.props.isSubmitting }>
                        Sign Up
                      </Button>
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid>
            </div>
          ) }
      />
    );
  }
}

SignUp.propTypes = {
  signup: PropTypes.func,
  isSubmitting: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};

const mapStateToProps = state => ({
  isSubmitting: state.user.submitting,
  error: state.user.error,
  errorMessage: state.user.errorMessage
});


export default connect(mapStateToProps, { signup })(SignUp);