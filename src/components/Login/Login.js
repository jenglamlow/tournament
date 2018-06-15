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
  email: '',
  password: ''
};

const SCHEMA = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(value) {
    this.props.login(value);
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
                  { this.props.error && ( 
                    <Message
                      error
                      header='Sign Up Error'
                      content={ this.props.errorMessage }
                    />
                  )}
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
                          placeholder='Email'
                          type="text"
                          name="email"
                          value={ values.email }
                          onChange={ handleChange }
                          onBlur={ handleBlur }
                          error={ errors.email && touched.email }
                        />
                        {errors.email && touched.email && <div style={ { color: 'red' } }> { errors.email }</div>}
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
                        {errors.password && touched.password && <div style={ { color: 'red' } }>{ errors.password }</div>}
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
  login: PropTypes.func,
  isSubmitting: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};

const mapStateToProps = state => ({
  isSubmitting: state.user.submitting,
  error: state.user.error,
  errorMessage: state.user.errorMessage
});


export default connect(mapStateToProps, { login })(Login);
