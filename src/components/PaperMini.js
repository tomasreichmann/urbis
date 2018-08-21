import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { convertToUnit } from '../utils/helpers';

const styles = ({width = '1in', height = '2in', color}) => theme => {
  const calcWidth = convertToUnit(width, 'mm');
  return {
    root: {
      width,
    },
    image: {
      width,
      height,
      display: 'block',
    },
    flipped: {
      transform: 'rotateX(180deg)',
    },
    stand: {
      position: 'relative',
      backgroundColor: color ? theme.palette[color].dark : grey[100],
      width,
      height: (calcWidth / 2) + 'mm',
      borderRadius: `${calcWidth}mm ${calcWidth}mm 0 0`,
    },
  };
};

function PaperMini(props) {
  const { classes, className, print, imageUri = 'https://i.imgur.com/puSgvt0.png' } = props;

  return (
    <div className={classnames(className, classes.root)} >
      { print ? <div className={classes.stand} /> : null }
      { print ? <img src={imageUri} className={classnames(classes.image, classes.flipped)} /> : null }
      <img src={imageUri} className={classes.image} />
      <div className={classnames(classes.stand, classes.flipped)} />
    </div>
  );
}

PaperMini.propTypes = {
  classes: PropTypes.object.isRequired,
};
PaperMini.defaultProps = {
  width: '1in',
  height: '2in',
  print: true,
};

export default (props) => {
  const extendedProps = {
    ...PaperMini.defaultProps,
    ...props
  };
  console.log('default props', extendedProps);
  const PaperMiniWithStyles = withStyles(styles(extendedProps))(PaperMini);
  return <PaperMiniWithStyles {...extendedProps}/>;
};