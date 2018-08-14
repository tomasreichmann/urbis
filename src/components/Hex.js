import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { convertToUnit } from '../utils/helpers';

const styles = ({color}) => theme => {
  return {
    root: {
      textAlign: 'center',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    svg: {
      display: color ? 'block' : 'none',
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 1,
    },
    shapeOuter: {
      fill: color ? theme.palette[color].light : 'none',
    },
    shapeInner: {
      fill: color ? theme.palette[color].main : 'none',
    },
    content: {
      position: 'relative',
      zIndex: 2,
    }
  };
};

const getHexPoints = (multiplier = 1) => {
  const width = 280;
  const height = 300;
  const shift = [
    width * (1-multiplier) / 2,
    height * (1-multiplier) / 2
  ];
  return [[150,300], [280,225], [280,75], [150,0], [20,75], [20,225]].map(
    points => points.map((coor, coorIndex) => coor * multiplier + shift[coorIndex]).join(',')
  ).join(' ');
};

function Hex(props) {
  const { classes, width, height, className, children, hasInner, hasOuter, insetMultiplier, ...otherProps } = props;
  const calcWidthFromHeight = height ? (convertToUnit(height) * 260 / 300) + 'mm' : undefined;
  const calcHeigthFromWidth = width ? (convertToUnit(width) * 300 / 260) + 'mm' : undefined;
  const calcWidth = width ? (convertToUnit(width) + 'mm') : calcWidthFromHeight;
  const calcHeight = height ? (convertToUnit(height) + 'mm') : calcHeigthFromWidth;

  return (
    <div className={classnames(className, classes.root)} style={{
      width: calcWidth,
      height: calcHeight,
    }} {...otherProps}>
      { children ? <div className={classes.content}>{children}</div> : null }
      <svg className={classes.svg} viewBox="20 0 260 300" style={{width: calcWidth, height: calcHeight}}>
        { hasOuter ? <polygon points={getHexPoints()} className={classes.shapeOuter} /> : null}
        { hasInner ? <polygon points={getHexPoints(insetMultiplier)} className={classes.shapeInner} /> : null}
      </svg>
    </div>
  );
}

Hex.propTypes = {
  classes: PropTypes.object.isRequired,
  hasInner: PropTypes.bool,
  hasOuter: PropTypes.bool,
  insetMultiplier: PropTypes.number,
};
Hex.defaultProps = {
  color: 'rock',
  hasInner: false,
  hasOuter: true,
  insetMultiplier: 0.9,
};

export default (props) => {
  const HexWithStyles = withStyles(styles(props))(Hex);
  return <HexWithStyles {...props}/>;
};