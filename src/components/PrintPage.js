import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { grey } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import { paperSizes } from '../utils/paperSizes';
import { convertToUnit } from '../utils/helpers';


const styles = props => theme => {
  const {
    page = paperSizes.portrait.A4,
    margin = '10mm',
  } = props;
  const calcWidth = convertToUnit(page.width, 'mm');
  const calcHeight = convertToUnit(page.height, 'mm');
  const calcMargin = convertToUnit(margin, 'mm');
  return ({
    page: {
      width: calcWidth - calcMargin * 2 + 'mm',
      height: calcHeight - calcMargin * 2 + 'mm',
      pageBreakInside: 'avoid',
      position: 'relative',
      boxSizing: 'content-box',
      margin: 0,
      '@media screen': {
        margin: `${theme.spacing.unit * 4}px auto`,
        border: `${calcMargin}mm solid ${grey[100]}`,
        boxShadow: theme.shadows[5],
        padding: '0 !important',
      },
    },
    content: {
      boxSizing: 'border-box',
      width: '100%',
      height: '100%'
    },
    label: {
      position: 'absolute',
      left: '50%',
      bottom: `${-calcMargin}mm`,
      transform: 'translate(-50%, 50%)',
      boxShadow: theme.shadows[1],
      '@media print': {
        display: 'none'
      },
    }
  })
};

class PrintPage extends React.Component {

  static defaultProps = {
    page: paperSizes.portrait.A4,
    margin: '10mm',
    label: null,
  }

  render() {
    const { classes, label, children } = this.props;
    return (<div className={classes.root}>
      <Paper elevation={0} className={classes.page} >
        <div className={classes.content} >{children}</div>
        { label ? <Chip label={label} className={classes.label} /> : null }
      </Paper>
    </div>);
  }
}

export default (props) => {
  const PrintPageWithStyles = withStyles(styles(props))(PrintPage);
  return <PrintPageWithStyles {...props}/>;
};