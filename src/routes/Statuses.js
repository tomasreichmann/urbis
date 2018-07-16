import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

import IconFire from '../components/icons/IconFire';
import IconWater from '../components/icons/IconWater';
import IconLightning from '../components/icons/IconLightning';
import IconFrost from '../components/icons/IconFrost';
import IconRock from '../components/icons/IconRock';
import IconHex from '../components/icons/IconHex';

import IconWet from '../components/icons/IconWet';
import IconBurning from '../components/icons/IconBurning';
import IconFrozen from '../components/icons/IconFrozen';
import IconCursed from '../components/icons/IconCursed';
import IconLife from '../components/icons/IconLife';
import IconRegenerating from '../components/icons/IconRegenerating';

import Icon from '../components/icons/Icon';

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


      <Typography variant="headline" gutterBottom gutterTop><IconBurning variant="headline" /></Typography>

      <Typography variant="subheading" gutterBottom>Zone</Typography>
      <Typography gutterBottom>
        Any targets that are in the zone when it gets <IconBurning /> status, or targets entering a <IconBurning /> zone immediately get <IconBurning /> status themselves.
      </Typography>
      <Typography gutterBottom>
        If the target has <IconWet /> status and is about to get a <IconBurning /> status, it instead looses <IconWet /> status and doesn't get any new ones.
      </Typography>

      <Typography variant="subheading" gutterBottom>Target</Typography>
      <Typography gutterBottom>
          A target that finishes its turn having the <IconBurning /> status receives <IconFire label={1} /> damage.
      </Typography>
      <Typography gutterBottom>
          A <IconBurning /> target can also cast extra <IconFire /> element once per round.
      </Typography>
      <Typography gutterBottom>
          A <IconBurning /> target is immune to <IconFrost /> spells.
      </Typography>

      <Divider className={classes.divider} />


      <Typography variant="headline" gutterBottom gutterTop><IconWet variant="headline" /></Typography>

      <Typography variant="subheading" gutterBottom>Zone</Typography>
      <Typography gutterBottom>
        Any targets that are in the zone when it gets the <IconWet /> status, or targets entering a <IconWet /> zone immediately get the <IconWet /> status themselves.
      </Typography>
      <Typography gutterBottom>
        If the target has a <IconBurning /> status, it instead looses this status and doesn't get any new ones.
      </Typography>

      <Typography variant="subheading" gutterBottom>Target</Typography>
      <Typography gutterBottom>
        A <IconWet /> target gets double lightning damage and cannot use any lightning elements.
      </Typography>
      <Typography gutterBottom>
        A <IconWet /> target can also cast extra <IconWater /> element once per round.
      </Typography>

      <Divider className={classes.divider} />


      <Typography variant="headline" gutterBottom><IconFrozen variant="headline" /></Typography>

      <Typography variant="subheading" gutterBottom>Zone</Typography>
      <Typography gutterBottom>
        A <IconWet /> zone that is a target of a freezing spell looses the <IconWet /> status and gains a <IconFrozen /> status.
      </Typography>
      <Typography gutterBottom>
        A target that enters a <IconFrozen /> zone is moved one field in the same direction at the end of it's round, if the field is empty, or gains 1 physical damage if the field is not empty.
      </Typography>
      <Typography gutterBottom>
        A <IconFrozen /> zone that is a target of a <IconFire /> spell looses the <IconFrozen /> status and gains a <IconWet /> status instead.
      </Typography>

      <Typography variant="subheading" gutterBottom>Target</Typography>
      <Typography gutterBottom>
        A target that has the <IconWet /> status and is a target of a freezing spell looses the <IconWet /> status and gains <IconFrozen /> status.
      </Typography>
      <Typography gutterBottom>
        A target cannot move while it has the <IconFrozen /> status.
      </Typography>
      <Typography gutterBottom>
        A <IconWet /> target that enters a <IconFrozen /> zone doesn't get the <IconFrozen /> status automatically.
      </Typography>
      <Typography gutterBottom>
        A <IconFrozen /> target can also cast extra <IconFrost /> element once per round.
      </Typography>
      <Typography gutterBottom>
        A <IconFrozen /> target that is a target of a <IconFire /> spell looses the <IconFrozen /> status and gains a <IconWet /> status instead.
      </Typography>

      <Divider className={classes.divider} />

      <Typography variant="headline" gutterBottom><IconCursed variant="headline" /></Typography>

      <Typography variant="subheading" gutterBottom>Zone</Typography>
      <Typography gutterBottom>
        A zone cannot be cursed
      </Typography>

      <Typography variant="subheading" gutterBottom>Target</Typography>
      <Typography gutterBottom>
        A target that is cursed can only make spells with the total of 4 elements per round.
      </Typography>
      <Typography gutterBottom>
        The <IconCursed /> status is replaced by any other <IconHex /> statuses, like Fire Immunity.
      </Typography>
    </div>
  );
}

Statuses.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Statuses);