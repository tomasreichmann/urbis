import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Spell from '../components/Spell';
import { spells } from '../model/spells';
import { paperSizes } from '../utils/paperSizes';

const styles = theme => ({
  main: {
    ...paperSizes.portrait.A4,
    '@media print': {
      margin: 0,
      boxShadow: 'none',
    },
  },
  mainContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: -1/2 * theme.spacing.unit,
    marginRight: -1/2 * theme.spacing.unit,
  },
  spell: {
    padding: theme.spacing.unit * 1,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: (100 / 3) + '%'
  }
});

function Spells(props) {
  const { classes } = props;
  const spellElements = spells.map((spell, spellIndex) => <Spell className={classes.spell} key={spellIndex} {...spell} />);
  const spellElementsPage1 = spellElements.slice(0, 20);
  const spellElementsPage2 = spellElements.slice(20);
  return (
    <div>
      <Card className={classes.main}>
        <CardContent className={classes.mainContent}>
          <div className={classes.list}>
            {spellElementsPage1}
          </div>
        </CardContent>
      </Card>
      <Card className={classes.main}>
        <CardContent className={classes.mainContent}>
          <div className={classes.list}>
            {spellElementsPage2}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

Spells.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spells);