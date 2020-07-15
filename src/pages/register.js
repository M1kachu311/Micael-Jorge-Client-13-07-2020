import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import {Link} from 'react-router-dom';
import {authRegister} from '../api/auth'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Herolo Mailer '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const onSubmit = (event)=>{
    event.preventDefault();
    setError(null);
    setMessage(null);
    if(!username || !password || !passwordVerify){
      setError('All fields are mandatory');

      return
    }
    if(password !==passwordVerify){
      setError('Passwords must match');

      return
    }
    authRegister(username, password)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(null);
          setUsername('');
          setPassword('');
          setPasswordVerify('');
          setMessage('User Created Successfully :)');
        }
      })
      .catch((err) => {
        setError(err);
      });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onInput={ e=>setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onInput={ e=>setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="verifyPassword"
            label="Verify Password"
            type="password"
            id="verifyPassword"
            autoComplete="current-password"
            value={passwordVerify}
            onInput={ e=>setPasswordVerify(e.target.value)}
          />
          {error ? <Alert severity="error">{error}</Alert> : ""}
          {message ? <Alert severity="info">{message}</Alert> : ""}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link to={'/login'}>
                {"Already registered? Sign In Here"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}