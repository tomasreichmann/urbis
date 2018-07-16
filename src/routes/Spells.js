import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Spell from '../components/Spell';
import { spells } from '../model/spells';

const styles = theme => ({
  main: {
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: -4 * theme.spacing.unit,
    marginRight: -4 * theme.spacing.unit,
  },
  spell: {
    margin: theme.spacing.unit * 2
  }
});

function Spells(props) {
  const { classes } = props;
  return (
    <div className={classes.main}>
      <Typography variant="display1" gutterBottom>Spells</Typography>
      <div  className={classes.list}>
        {spells.map(spell => <div className={classes.spell}>
          <Spell key={spell.label} {...spell} />
        </div>)}
      </div>
    </div>
  );
}

Spells.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spells);