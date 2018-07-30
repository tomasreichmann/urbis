import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { convertToUnit } from '../utils/helpers';

const styles = props => theme => ({
  root: {
    textAlign: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
  },
  rowOdd: {
    marginTop: convertToUnit(props.hexWidth) * -(300 / 260 / 4) + 'mm',
    marginBottom: convertToUnit(props.hexWidth) * -(300 / 260 / 4) + 'mm',
    marginLeft: convertToUnit(props.hexWidth) / 2 + 'mm',
  },
  hex: {
    flex: '0 0 auto',
  },
});

function Grid(props) {
  const { classes, className, hexGrid = [] } = props;

  return (
    <div className={classnames(className, classes.root)} >
      {hexGrid.map((hexRow, rowIndex) => <div key={rowIndex} className={classnames(classes.row, rowIndex % 2 === 0 ? classes.rowEven : classes.rowOdd)} >{
        hexRow.map((hex, hexIndex) => <div key={rowIndex + '-' + hexIndex} className={classes.hex} >{hex}</div>)
      }</div>)}
    </div>
  );
}

Grid.propTypes = {
  classes: PropTypes.object.isRequired,
  hexWidth: PropTypes.string.isRequired,
};

export default (props) => {
  const GridWithStyles = withStyles(styles(props))(Grid);
  return <GridWithStyles {...props}/>;
};