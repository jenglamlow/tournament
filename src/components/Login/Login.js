import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';

import * as routes from '../../constants/routes';
import { login } from '../../redux/modules/auth';

const INITIAL_STATE = {
  login: '',
  password: ''
};

const SCHEMA = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().required().min(8),
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(value) {
    console.log(value);
    // this.props.login()
  }

  render() {
    return (
      <Formik
        initialValues={ INITIAL_STATE }
        validationSchema={ SCHEMA }
        onSubmit={ this.handleLogin }
        render={ ({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
            <div className='login-form'>
              <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>

              <Grid textAlign='center' style={ { height: '100%' } } verticalAlign='middle'>
                <Grid.Column style={ { maxWidth: 450 } }>
                  <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                  </Header>
                  <Form size='large' onSubmit={ handleSubmit }>
                    <Segment>
                    <Form.Field>
                      <Form.Input 
                          fluid 
                          icon='user' 
                          iconPosition='left' 
                          placeholder='Username or email' 
                          type="text"
                          name="login"
                          value={ values.login }
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          error={ errors.login && touched.login }
                        />
                        {errors.login && touched.login && <div style={ { color: 'red' } }>Required</div>}
                      </Form.Field>
                      <Form.Field>
                        <Form.Input
                          fluid
                          icon='lock'
                          iconPosition='left'
                          placeholder='Password'
                          type='password'
                          name="password"
                          value={ values.password }
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          error={ errors.password && touched.password }
                        />
                        {errors.password && touched.password && <div style={ { color: 'red' } }>Required</div>}
                      </Form.Field>

                      <Button color='teal' fluid size='large' type="submit" disabled={ this.props.isSubmitting }>
                        Login
                      </Button>
                    </Segment>
                  </Form>
                  <Message>
                    New to us? <Link to={ routes.SIGN_UP }>Sign Up</Link>
                  </Message>
                </Grid.Column>
              </Grid>
            </div>
          ) }
      />
    );
  }
}

Login.propTypes = {
  // signup: PropTypes.func,
  isSubmitting: PropTypes.bool,
  // error: PropTypes.bool,
  // errorMessage: PropTypes.string
};

const mapStateToProps = state => ({
  isSubmitting: state.user.submitting,
  // error: state.user.error,
  // errorMessage: state.user.errorMessage
});


export default connect(mapStateToProps, {})(Login);
