import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import cls from 'classnames';

const styles = ({ iconSize = 2 }) => theme => ({
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
  const iconImage = (index) => {
    const isFirst = index === 0;
    return (<img key={index} src={iconUri} className={cls(
      classes.icon,
      isFirst ? classes.iconFirst : undefined,
      (label && !hasCircle) ? classes.withLabel : undefined
    )} />);
  }
  const iconImages = new Array(count).fill(null).map( (_, index) => iconImage(index) );
  const icon = hasCircle
    ? <span className={cls(classes.circle, label
      ? classes.withLabel
      : undefined)}>{iconImages}</span>
    : iconImages;

  return (
    <span className={cls(classes.wrapper, className)}>{icon}{label}</span>
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
  iconSize: 2,
  count: 1,
  label: '?',
  component: 'span',
};

export default (props) => {
  const IconWithStyles = withStyles(styles(props))(Icon);
  return <IconWithStyles {...props}/>;
};