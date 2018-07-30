import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { convertToUnit } from '../utils/helpers';

const styles = ({width = '1in', height = '2in', color}) => theme => {
  const calcWidth = convertToUnit(width, 'mm');
  const calcHeight = convertToUnit(height, 'mm');
  return {
    root: {
      width,
      height: (calcHeight * 2 + calcWidth) + 'mm',
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
    pointer: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      border: '0px solid white',
      borderWidth: '0 0 0.2in 0.5in',
      borderColor: 'transparent transparent white transparent',
    }
  };
};

function PaperMini(props) {
  const { classes, className, hasPointer = false, imageUri = 'https://i.imgur.com/puSgvt0.png' } = props;

  return (
    <div className={classnames(className, classes.root)} >
      <div className={classes.stand} >
        { hasPointer ? <div className={classes.pointer} /> : null }
      </div>
      <img src={imageUri} className={classnames(classes.image, classes.flipped)} />
      <img src={imageUri} className={classes.image} />
      <div className={classnames(classes.stand, classes.flipped)} >
        { hasPointer ? <div className={classes.pointer} /> : null }
      </div>
    </div>
  );
}

PaperMini.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (props) => {
  const PaperMiniWithStyles = withStyles(styles(props))(PaperMini);
  PaperMiniWithStyles.defaultProps = {
    width: '1in',
    height: '2in',
  }
  return <PaperMiniWithStyles {...props}/>;
};