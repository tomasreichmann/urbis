import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
  return {
    root: {
    },
  };
};

function Carousel(props) {
  const { classes, className, children } = props;

  return (
    <div className={classnames(className, classes.root)} >
      {children}
    </div>
  );
}

Carousel.propTypes = {
  classes: PropTypes.object.isRequired,
};
Carousel.defaultProps = {
};

export default withStyles(styles)(Carousel);