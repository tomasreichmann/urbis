import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../src/withRoot';

import Navigation from '../src/components/Navigation';
import Resources from '../src/routes/Resources';

const styles = theme => ({
  page: {
    '@media screen': {
      padding: theme.spacing.unit * 10,
      boxShadow: theme.shadows[5],
    },
  },
});

class ResourcesPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.page} >
          <Resources />
        </div>
      </div>
    );
  }
}

ResourcesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ResourcesPage));
