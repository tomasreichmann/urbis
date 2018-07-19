import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../src/withRoot';

import Navigation from '../src/components/Navigation';
import Statuses from '../src/routes/Statuses';

const styles = theme => ({
  page: {
    margin: theme.spacing.unit * 10,
    '@media print': {
      margin: 0,
    },
  },
});

class StatusesPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.page} >
          <Statuses />
        </div>
      </div>
    );
  }
}

StatusesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(StatusesPage));
