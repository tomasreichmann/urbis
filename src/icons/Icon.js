import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import cls from 'classnames';

const styles = theme => ({
  wrapper: {
    display: 'inline-block',
  },
  icon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: theme.spacing.unit * 3,
  },
  withLabel: {
    marginRight: theme.spacing.unit / 2
  },
  circle: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    boxSizing: 'content-box',
    backgroundColor: grey[300],
    height: theme.spacing.unit * 3,
    width: theme.spacing.unit * 3,
    padding: theme.spacing.unit / 4,
    marginTop: -theme.spacing.unit / 4,
    marginBottom: -theme.spacing.unit / 4,
    borderRadius: '50%',
  },
});

const Icon = (props) => {
  const { classes, variant, label, iconSize, hasCircle, iconUri, component, className } = props;
  const iconImage = <img src={iconUri} className={cls(classes.icon, (label && !hasCircle) ? classes.withLabel : undefined)} />;
  const icon = hasCircle ? <span style={{ height: iconSize, width: iconSize }} className={cls(classes.circle, label ? classes.withLabel : undefined)}>{iconImage}</span> : iconImage;
  return (
    <Typography variant={variant} component={component} className={cls(classes.wrapper, className)}>{icon}{label}</Typography>
  );
}

Icon.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.any,
  iconHeight: PropTypes.number,
  component: PropTypes.string,
};

Icon.defaultProps = {
  variant: undefined,
  className: undefined,
  iconUri: '/static/unknown.png',
  iconHeight: 3,
  label: '?',
  component: 'span',
};

export default withStyles(styles)(Icon);