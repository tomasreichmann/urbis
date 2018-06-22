import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

import IconFire from '../icons/IconFire';
import IconWater from '../icons/IconWater';
import IconLightning from '../icons/IconLightning';
import IconFrost from '../icons/IconFrost';
import IconRock from '../icons/IconRock';
import IconHex from '../icons/IconHex';

import IconWet from '../icons/IconWet';
import IconBurning from '../icons/IconBurning';
import IconFrozen from '../icons/IconFrozen';
import IconCursed from '../icons/IconCursed';
import IconLife from '../icons/IconLife';
import IconRegenerating from '../icons/IconRegenerating';

import Icon from '../icons/Icon';

const styles = theme => ({
  main: {
  },
  icon: {
    height: theme.spacing.unit * 3,
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  divider: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  }
});

function Statuses(props) {
  const { classes } = props;
  return (
    <div className={classes.main}>
      <Typography variant="display1" gutterBottom>Statuses</Typography>


      <Typography variant="headline" gutterBottom><IconBurning variant="headline" /></Typography>

      <Typography gutterBottom>
        Zone: Any targets that are in the zone when it gets <IconBurning /> status, or targets entering a <IconBurning /> zone immediately get <IconBurning /> status themselves. If the target has <IconWet /> status, it instead looses this status and doesn't get any new ones.
      </Typography>
      <Typography gutterBottom>
        Target:
          A target that finishes its turn having the <IconBurning /> status receives <IconFire label={1} /> damage.
          A <IconBurning /> target can also cast extra <IconFire /> element once per round.
          A <IconBurning /> target is immune to <IconFrost /> spells.
      </Typography>

      <Divider className={classes.divider} />


      <Typography variant="headline" gutterBottom><IconWet variant="headline" /></Typography>

      <Typography gutterBottom>
        Zone: Any targets that are in the zone when it gets the <IconWet /> status, or targets entering a <IconWet /> zone immediately get the <IconWet /> status themselves. If the target has a <IconBurning /> status, it instead looses this status and doesn't get any new ones.
      </Typography>
      <Typography gutterBottom>
        Target: A target that has the <IconWet /> status gets double lightning damage and cannot use any lightning elements. A <IconWet /> target can also cast extra <IconWater /> element once per round.
      </Typography>

      <Divider className={classes.divider} />


      <Typography variant="headline" gutterBottom><IconFrozen variant="headline" /></Typography>

      <Typography gutterBottom>
        Zone:
          A <IconWet /> zone that is a target of a freezing spell looses the <IconWet /> status and gains a <IconFrozen /> status.
          A target that enters a <IconFrozen /> zone is moved one field in the same direction at the end of it's round, if the field is empty, or gains 1 physical damage if the field is not empty.
          A <IconFrozen /> zone that is a target of a fire spell looses the <IconFrozen /> status and gains a <IconWet /> status instead.
      </Typography>
      <Typography gutterBottom>
        Target:
          A target that has the <IconWet /> status and is a target of a freezing spell looses the <IconWet /> status and gains <IconFrozen /> status.
          A target cannot move while it has the <IconFrozen /> status.
          A wet target that enters a <IconFrozen /> zone doesn't get the <IconFrozen /> status.
          A <IconFrozen /> target can also cast extra <IconFrost /> element once per round.
          A <IconFrozen /> target that is a target of a fire spell looses the <IconFrozen /> status and gains a <IconWet /> status instead.
      </Typography>

      <Divider className={classes.divider} />
    </div>
  );
}

Statuses.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Statuses);