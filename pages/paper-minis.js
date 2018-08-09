import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { range, chunk } from 'lodash';

import withRoot from '../src/withRoot';

import Navigation from '../src/components/Navigation';
import PrintPage from '../src/components/PrintPage';
import PaperMini from '../src/components/PaperMini';

import { paperSizes } from '../src/utils/paperSizes';
import { minis } from '../src/model/minis';

const styles = theme => ({
  main: {
    '@media screen': {
      padding: theme.spacing.unit * 10,
      // boxShadow: theme.shadows[5],
    },
  },
  page: {
    ...paperSizes.portrait.A4,
    border: `10mm solid ${grey[100]}`,
    '@media print': {
      margin: 0,
      boxShadow: 'none',
    },
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  label: {
    color: 'white',
  },
});


class PaperMinis extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.main} >

              {
                chunk(
                  minis.reduce( (collection, {count = 1, ...mini}) => [...collection, ...range(count).fill(mini)], []),
                  7 * 3
                )
                .map( (itemPage, itemPageindex, pages) => (
                  <PrintPage margin="5mm" label={<Typography >Paper minis {itemPageindex + 1} / {pages.length}</Typography>}>
                    <div className={classes.list} >
                      { itemPage.map( ({ width, height, imageUri, color, hasPointer}, itemIndex) => (
                        <div key={itemPageindex + '-' + itemIndex} className={classes.item}>
                          <PaperMini
                            width={width}
                            height={height}
                            imageUri={imageUri}
                            color={color}
                            hasPointer={hasPointer}
                          />
                        </div>
                      )) }
                    </div>
                  </PrintPage>
                ) )

              }

        </div>
      </div>
    );
  }
}

PaperMinis.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(PaperMinis));
