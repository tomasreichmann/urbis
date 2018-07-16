import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import cls from 'classnames';

const styles = ({ iconSize = 3 }) => theme => ({
  wrapper: {
    display: 'inline-block',
  },
  icon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: theme.spacing.unit * iconSize,
    marginLeft: theme.spacing.unit * -iconSize / 2
  },
  iconFirst: {
    marginLeft: 0
  },
  withLabel: {
    marginRight: theme.spacing.unit / 2
  },
  circle: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    boxSizing: 'content-box',
    backgroundColor: grey[300],
    height: theme.spacing.unit * iconSize,
    minWidth: theme.spacing.unit * iconSize,
    padding: theme.spacing.unit / 4,
    marginTop: -theme.spacing.unit / 4,
    marginBottom: -theme.spacing.unit / 4,
    borderRadius: theme.spacing.unit * iconSize + 'px',
  },
});

const Icon = (props) => {
  const { classes, variant, label, iconSize, hasCircle, iconUri, component, className, count } = props;
  const iconImage = (isFirst) => <img src={iconUri} className={cls(
    classes.icon,
    isFirst ? classes.iconFirst : undefined,
    (label && !hasCircle) ? classes.withLabel : undefined
  )} />;
  const iconImages = new Array(count).fill(null).map( (_, index) => iconImage(index === 0) );
  const icon = hasCircle
    ? <span className={cls(classes.circle, label
      ? classes.withLabel
      : undefined)}>{iconImages}</span>
    : iconImages;

  return (
    <Typography variant={variant} component={component} className={cls(classes.wrapper, className)}>{icon}{label}</Typography>
  );
}

Icon.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.any,
  count: PropTypes.number,
  iconSize: PropTypes.number,
  component: PropTypes.string,
};

Icon.defaultProps = {
  variant: undefined,
  className: undefined,
  iconUri: '/static/unknown.png',
  iconSize: 3,
  count: 1,
  label: '?',
  component: 'span',
};

export default (props) => {
  const IconWithStyles = withStyles(styles(props))(Icon);
  return <IconWithStyles {...props}/>;
};