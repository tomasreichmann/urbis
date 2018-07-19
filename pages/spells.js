import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../src/withRoot';

import Navigation from '../src/components/Navigation';
import Spells from '../src/routes/Spells';

const styles = theme => ({
  page: {
    margin: theme.spacing.unit * 10,
    '@media print': {
      margin: 0,
    },
  },
});

class SpellsPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.page} >
          <Spells />
        </div>
      </div>
    );
  }
}

SpellsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(SpellsPage));
