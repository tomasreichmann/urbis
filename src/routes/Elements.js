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

function Elements(props) {
  const { classes } = props;
  return (
    <div className={classes.main}>
      <Typography variant="display1" gutterBottom>Elements</Typography>


      <Typography variant="headline" gutterBottom><IconFire variant="headline" /></Typography>

      <Typography gutterBottom>
        <IconFire label={1} />
        &emsp;<Chip label="Scorching ray" />&emsp;
        spell targets zones in a line 2 fields away from the caster.
      </Typography>
      <Typography gutterBottom>
        <IconFire label={2} />
        &emsp;<Chip label="Burning hands" />&emsp;
        spell targets all zones in a cone 2 fields from the caster.
      </Typography>
      <Typography gutterBottom>
        <IconFire label={3} />
        &emsp;<Chip label="Fireball" />&emsp;
        spell targets a zone 2 fields away from the caster and all it's neighbouring fields.
      </Typography>
      <Typography gutterBottom>
        <IconFire label={4} />
        &emsp;<Chip label="Meteor" />&emsp;
        spell targets a field anywhere on the battlefield and all fields up to 2 fields away from the target.
      </Typography>
      <Typography gutterBottom>
        <IconFire label={5} />
        &emsp;<Chip label="Rain of fire" />&emsp;
        spell targets all fields on the battlefield including caster's field.
      </Typography>

      <Typography gutterBottom>If zone is <IconWet />, removes <IconWet /> status from the zone.</Typography>
      <Typography gutterBottom>Otherwise adds <IconBurning /> status to the zone.</Typography>
      <Typography gutterBottom>If target is <IconWet />, removes <IconWet /> status from the target.</Typography>
      <Typography gutterBottom>Otherwise adds <IconBurning /> status to the target.</Typography>

      <Divider className={classes.divider} />


      <Typography variant="headline" gutterBottom><IconWater variant="headline" /></Typography>

      <Typography gutterBottom>
        <IconWater label={1} />
        &emsp;<Chip label="Hydraulic torrent" />&emsp;
        spell targets zones in a line 2 fields away from the caster.
      </Typography>
      <Typography gutterBottom>
        <IconWater label={2} />
        &emsp;<Chip label="Drenching spray" />&emsp;
        spell targets all zones in a cone 2 fields from the caster.
      </Typography>
      <Typography gutterBottom>
        <IconWater label={3} />
        &emsp;<Chip label="Water ball" />&emsp;
        spell targets a zone 2 fields away from the caster and spreads 1 field away from the primary target.
      </Typography>
      <Typography gutterBottom>
        <IconWater label={4} />
        &emsp;<Chip label="Drenching blast" />&emsp;
        spell targets a field anywhere on the battlefield and spreads up to 2 fields away from the primary target.
      </Typography>
      <Typography gutterBottom>
        <IconWater label={5} />
        &emsp;<Chip label="Rain" />&emsp;
        spell targets all fields on the battlefield including caster's field.
      </Typography>

      <Typography gutterBottom>Some of these spells move affected targets one field in the direction either away from the caster (Hydraulic torrent, Drenching spray) or away from the primary target (Water ball, Drenching blast). If the target cannot move because the field is occupied. The target takes 1 physical damage.</Typography>
      <Typography gutterBottom>If zone is <IconBurning />, removes <IconBurning /> status from the zone.</Typography>
      <Typography gutterBottom>Otherwise adds <IconWet /> status to the zone.</Typography>
      <Typography gutterBottom>If target is <IconBurning />, removes <IconBurning /> status.</Typography>
      <Typography gutterBottom>Otherwise adds <IconWet /> status to the target.</Typography>

      <Divider className={classes.divider} />


      <Typography variant="headline" gutterBottom><IconLightning variant="headline" /></Typography>

      <Typography gutterBottom>
        <IconLightning label={1} />
        &emsp;<Chip label="Electric jolt" />&emsp;
        spell targets one zone up to 2 fields away from the caster.
      </Typography>
      <Typography gutterBottom>
        <IconLightning label={2} />
        &emsp;<Chip label="Bouncing zap" />&emsp;
        spell targets one zone up to 2 fields away from the caster, then jumps 1 more time up to 2 fields away.
      </Typography>
      <Typography gutterBottom>
        <IconLightning label={3} />
        &emsp;<Chip label="Static discharge" />&emsp;
        spell targets one zone up to 2 fields away from the caster, then jumps 2 more times up to 2 fields away.
      </Typography>
      <Typography gutterBottom>
        <IconLightning label={4} />
        &emsp;<Chip label="Chain lightning" />&emsp;
        spell targets one zone up to 2 fields away from the caster, then jumps 3 more times up to 2 fields away.
        </Typography>
      <Typography gutterBottom>
        <IconLightning label={5} />
        &emsp;<Chip label="Lightning strike" />&emsp;
        spell targets one field anywhere on the battlefield and delivers <IconLightning label={5} /> damage instead.
      </Typography>

      <Typography gutterBottom>Damage <IconLightning label={1} /></Typography>
      <Typography gutterBottom>If target is <IconWet />, target is dealt extra <IconLightning label={1} /> damage.</Typography>
      <Typography gutterBottom>If the target zone is <IconWet />, these effects apply to all connected <IconWet /> zones.</Typography>
      <Typography gutterBottom>Spell never damages one target twice.</Typography>

      <Divider className={classes.divider} />


      <Typography variant="headline" gutterBottom><IconFrost variant="headline" /></Typography>

      <Typography gutterBottom><IconFrost label={1} />
        &emsp;<Chip label="Chilling beam" />&emsp;
        spell targets zones in a line 2 fields away from the caster.
      </Typography>
      <Typography gutterBottom><IconFrost label={2} />
        &emsp;<Chip label="Cone of cold" />&emsp;
        spell targets all zones in a cone 2 fields from the caster.
      </Typography>
      <Typography gutterBottom><IconFrost label={3} />
        &emsp;<Chip label="Frost ball" />&emsp;
        spell targets a zone 2 fields away from the caster and spreads 1 field away from the primary target.
      </Typography>
      <Typography gutterBottom><IconFrost label={4} />
        &emsp;<Chip label="Arctic blast" />&emsp;
        spell targets a field anywhere on the battlefield and spreads up to 2 fields away from the primary target.
      </Typography>
      <Typography gutterBottom><IconFrost label={5} />
        &emsp;<Chip label="Blizzard" />&emsp;
        spell targets all fields on the battlefield including caster's field.
      </Typography>

      <Typography gutterBottom>If target zone is <IconBurning />, there is no effect.</Typography>
      <Typography gutterBottom>If target zone is <IconWet />, removes <IconWet /> and adds <IconFrozen />.</Typography>
      <Typography gutterBottom>Damage <IconFrost label={1} /> ??</Typography>
      <Typography gutterBottom>If target is <IconWet />, removes <IconWet /> and adds <IconFrozen />.</Typography>

      <Divider className={classes.divider} />


      <Typography variant="headline" gutterBottom><IconRock variant="headline" /></Typography>

      <Typography gutterBottom>
        <IconRock label={1}/>-<IconRock label={5}/>
        &emsp;<Chip label="Summon rock(s)" />
      </Typography>

      <Typography gutterBottom>The spell targets 1 field per <IconRock /> spent up to 2 fields away of the caster.</Typography>
      <Typography gutterBottom>If target zone is empty, summons a rock that shields fields from line, cone and spread spells.</Typography>
      <Typography gutterBottom>Any non-permanent target statuses are removed.</Typography>
      <Typography gutterBottom>The rock is immune to the <IconBurning /> status and <IconFire /> damage.</Typography>
      <Typography gutterBottom>The rock is destroyed upon taking 1 damage.</Typography>

      <Divider className={classes.divider} />


      <Typography variant="headline" gutterBottom><IconHex variant="headline" /></Typography>

      <Typography gutterBottom>
        <IconHex label={1}/>-<IconHex label={5}/>
        &emsp;<Chip label="Curse" />
      </Typography>
      <Typography gutterBottom>1 target per <IconHex /> used up to 2 fields away or self.</Typography>
      <Typography gutterBottom>Caster steals one random element from each target and adds <IconCursed /> status to the target(s).</Typography>

      <Typography gutterBottom>
        <IconHex/> + <IconFire/>
        &emsp;<Chip label="Fire shield" />
        &emsp;Gives one target up to 2 fields away or self <IconFire /> immunity.
      </Typography>
      <Typography gutterBottom>
        <IconHex/> + <IconWater/>
        &emsp;<Chip label="Water shield" />
        &emsp;Gives one target up to 2 fields away or self <IconWater /> immunity.
      </Typography>
      <Typography gutterBottom>
        <IconHex/> + <IconLightning/>
        &emsp;<Chip label="Lightning shield" />
        &emsp;Gives one target up to 2 fields away or self <IconLightning /> immunity.
      </Typography>
      <Typography gutterBottom>
        <IconHex/> + <IconFrost/>
        &emsp;<Chip label="Frost shield" />
        &emsp;Gives one target up to 2 fields away or self <IconFrost /> immunity.
      </Typography>
      <Typography gutterBottom>
        <IconHex/> + <IconLife/>
        &emsp;<Chip label="Life shield" />
        &emsp;Gives one target up to 2 fields away or self <IconLife /> immunity.
      </Typography>
      <Typography gutterBottom>Spell provides immunity to any spells that contains the added element. This also removes any other <IconHex /> effect including <IconCursed /> from the target.</Typography>
      <Typography gutterBottom>It is not possible to be immune to the <IconCursed /> status.</Typography>

      <Divider className={classes.divider} />


      <Typography variant="headline" gutterBottom><IconLife variant="headline" /></Typography>

      <Typography variant="title" gutterBottom>Effects</Typography>
      <Typography gutterBottom>
        <IconLife label={1}/>-<IconLife label={4}/>
        &emsp;<Chip label="Healing" />
        &emsp;Spell heals a single target up to 2 fields away or self and for the amount of hitpoints equal to the amount of <IconLife /> spent.
      </Typography>
      <Typography gutterBottom>
        <IconLife label={5}/>
        &emsp;<Chip label="Resurrection" />
        &emsp;Spell brings a target up to 2 fields away back to life with full hitpoints and a new starting hand of elements.
      </Typography>
    </div>
  );
}

Elements.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Elements);