import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import withRoot from '../src/withRoot';

import Navigation from '../src/components/Navigation';
import FieldHex from '../src/components/FieldHex';
import Grid from '../src/components/Grid';
import PrintPage from '../src/components/PrintPage';

import { fieldMap } from '../src/model/fields';
import { paperSizes } from '../src/utils/paperSizes';
import { convertToUnit } from '../src/utils/helpers';

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
  clip: {
    overflow: 'hidden',
  },
});


class FieldsPage extends React.Component {
  render() {
    const { classes } = this.props;

    const hexWidth = '60mm';

    const fieldHexOptions = {
      width: hexWidth,
      iconSize: 5 ,
    };
    const EmptyField = <FieldHex width={hexWidth} />;
    const board = [
      [
        EmptyField,
        <FieldHex {...fieldHexOptions} {...fieldMap.everburningBrazier} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.grass} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.glacier} />,
      ],
      [
        <FieldHex {...fieldHexOptions} {...fieldMap.grass} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.grass} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.grass} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.grass} />,
      ],
      [
        <FieldHex {...fieldHexOptions} {...fieldMap.lightningRod} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.divineChapel} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.bottomlessAbyss} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.wizardTower} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.quarry} />,
      ],
      [
        <FieldHex {...fieldHexOptions} {...fieldMap.grass} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.grass} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.grass} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.grass} />,
      ],
      [
        EmptyField,
        <FieldHex {...fieldHexOptions} {...fieldMap.pentagram} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.grass} />,
        <FieldHex {...fieldHexOptions} {...fieldMap.pond} />,
      ],
    ];

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.main} >
          <PrintPage label={<Typography variant="headline" >Battle map left</Typography>}>
            <div className={classes.clip}>
              <Grid hexGrid={board} hexWidth={hexWidth} className={classes.grid}/>
            </div>
          </PrintPage>
          <PrintPage label={<Typography variant="headline" >Battle map right</Typography>}>
            <div className={classes.clip} >
              <div style={{
                marginLeft: -convertToUnit(hexWidth) * 2.5 + 'mm'
              }} >
                <Grid hexGrid={board} hexWidth={hexWidth} className={classes.grid} />
              </div>
            </div>
          </PrintPage>
        </div>
      </div>
    );
  }
}

FieldsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(FieldsPage));
