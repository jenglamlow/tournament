import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import * as routes from '../../constants/routes';

const Login = () => (
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
        <Form size='large'>
          <Segment>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username or email' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button color='teal' fluid size='large'>
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
);

export default Login;