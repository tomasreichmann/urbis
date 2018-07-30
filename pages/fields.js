import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { range } from 'lodash';

import withRoot from '../src/withRoot';

import Navigation from '../src/components/Navigation';
import FieldHex from '../src/components/FieldHex';
import Icon from '../src/components/icons/Icon';
import PrintPage from '../src/components/PrintPage';

import { fields } from '../src/model/fields';
import { paperSizes } from '../src/utils/paperSizes';

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


class FieldsPage extends React.Component {
  render() {
    const { classes } = this.props;

    const hexWidth = '45mm';

    const list = fields.reduce((collection, {count, ...fieldType}, fieldTypeIndex) => {
      return [
        ...collection,
        ...range(count).map(fieldIndex => (<FieldHex width={hexWidth} key={fieldTypeIndex + '-' + fieldIndex} {...fieldType} />))
      ]
    }, []);

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.main} >
          <PrintPage label={<Typography variant="headline" >Fields</Typography>}>
            <div className={classes.list}>
              {list.map((hex, hexIndex) => <div key={hexIndex} className={classes.hex} >{hex}</div>)}
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
