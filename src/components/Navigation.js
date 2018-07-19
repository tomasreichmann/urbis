import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    '@media print': {
      display: 'none'
    },
  },
  home: {
    marginRight: theme.spacing.unit * 2
  }
});

function Navigation(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" ><Typography variant="title" component="a" color="inherit" className={classes.home} >Magic Mayhem</Typography></Link>
          <Link href="/resources" ><Button component="span" className={classes.button}>Resources</Button></Link>
          <Link href="/statuses" ><Button component="span" className={classes.button}>Statuses</Button></Link>
          <Link href="/spells" ><Button component="span" className={classes.button}>Spells</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);