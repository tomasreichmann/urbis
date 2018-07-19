import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconFire from './icons/IconFire';
import IconWater from './icons/IconWater';
import IconLightning from './icons/IconLightning';
import IconFrost from './icons/IconFrost';
import IconRock from './icons/IconRock';
import IconHex from './icons/IconHex';

import IconWet from './icons/IconWet';
import IconBurning from './icons/IconBurning';
import IconFrozen from './icons/IconFrozen';
import IconCursed from './icons/IconCursed';
import IconLife from './icons/IconLife';

const styles = {
  main: {
    whiteSpace: 'nowrap',
  },
};

const componentMap = {
  fire: IconFire,
  water: IconWater,
  lightning: IconLightning,
  frost: IconFrost,
  rock: IconRock,
  hex: IconHex,
  wet: IconWet,
  burning: IconBurning,
  frozen: IconFrozen,
  cursed: IconCursed,
  life: IconLife,
};

function Cost(props) {
  const { classes, cost, ...otherProps } = props;

  const costItems = Object.keys(cost)
    .filter(costKey => !!cost[costKey])
    .sort()
    .map((costKey, costIndex) => {
      const CostElement = componentMap[costKey];
      return CostElement ? <CostElement key={costIndex} count={cost[costKey]} label={null} {...otherProps}/> : null;
    });

  return (
    <span className={classes.main}>
      { costItems }
    </span>
  );
}

Cost.propTypes = {
  classes: PropTypes.object.isRequired,
  cost: PropTypes.object,
};

Cost.defaultProps = {
  cost: {},
};

export default withStyles(styles)(Cost);