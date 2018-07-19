import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../src/withRoot';

import Navigation from '../src/components/Navigation';
import Statuses from '../src/routes/Statuses';
import Spells from '../src/routes/Spells';
import Resources from '../src/routes/Resources';

const styles = theme => ({
  page: {
    padding: theme.spacing.unit * 10,
  },
});

class Index extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.page} >
          <Statuses />
          <Spells />
          <Resources />
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
