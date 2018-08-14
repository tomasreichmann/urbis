import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import withRoot from '../src/withRoot';

import Navigation from '../src/components/Navigation';
import FieldHex from '../src/components/FieldHex';
import Grid from '../src/components/Grid';
import { fieldMap } from '../src/model/fields';
import PrintPage from '../src/components/PrintPage';

import { paperSizes } from '../src/utils/paperSizes';
import IconHex from '../src/components/icons/IconHex';
import IconFire from '../src/components/icons/IconFire';
import IconBurning from '../src/components/icons/IconBurning';
import IconWet from '../src/components/icons/IconWet';
import IconFrozen from '../src/components/icons/IconFrozen';
import IconCursed from '../src/components/icons/IconCursed';
import IconLightning from '../src/components/icons/IconLightning';
import IconWound from '../src/components/icons/IconWound';
import { richText } from '../src/utils/richText';
import { statuses } from '../src/model/statuses';
import {
  startingHandSize,
  endOfTurnDraw,
  maxSpells,
  maxComponentsPerRound,
  playerWounds,
  victoryKillCount,
  victoryTeamKillCount,
  cursedSpellCountReduction
} from '../src/model/game';

const styles = theme => ({
  page: {
    padding: theme.spacing.unit * 10,
  },
  lead: {
    marginTop: theme.spacing.unit * 2,
  },
  heading: {
    marginTop: theme.spacing.unit * 2,
  },
  lightning: {
    color: theme.palette.lightning.main,
  },
  fire: {
    color: theme.palette.fire.main,
  },
  grid: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  section: {
    marginBottom: theme.spacing.unit * 4,
  },
  statuses: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    marginTop: theme.spacing.unit * 2,
  },
});

class Index extends React.Component {
  render() {
    const { classes } = this.props;
    const hexWidth = '15mm';
    const fieldHexOptions = {
      width: hexWidth,
      iconSize: 2,
      labelVariant: 'body2'
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
        <div className={classes.page} >
          <PrintPage page={paperSizes.portrait.A4} >
            <Typography variant="display2" >Magic Mayhem</Typography>
            <Typography variant="title" gutterBottom className={classes.lead}>Magic Mayhem is a 1 to 4 player cooperative or competetive tactical game where magicians massacre each other with spells like elemental spells like <span className={classes.lightning} >Chain lightning</span> or <span className={classes.fire} >Floor is Lava</span>.</Typography>

            <Typography variant="display1" className={classes.heading} >Deathmatch</Typography>
            <Typography variant="subheading" gutterBottom>In deathmatch, players fight against each other one on one or in teams.</Typography>
            <Typography >For each kill, you get a point for yourself or for your team. The first player to reach <strong>{victoryKillCount} kills</strong> or team to reach <strong>{victoryTeamKillCount} kills</strong> in total is the winner.</Typography>

            <Typography variant="headline" className={classes.heading} >
              Setup
            </Typography>
            <Typography gutterBottom>Assemble field tiles into a board like this.</Typography>
            <Grid hexGrid={board} hexWidth={hexWidth} className={classes.grid}/>
            <Typography gutterBottom>Shuffle component cards and place the deck face down near the board</Typography>
            <Typography gutterBottom>Pick an avatar for each player.</Typography>
            <Typography gutterBottom>Pick a starting player and place a Starting player token in front of the player.</Typography>
            <Typography gutterBottom>Take turns placing your avatars on any unoccupied grass fields.</Typography>
            <Typography gutterBottom>Each player draws a starting hand of {startingHandSize} component cards.</Typography>

            <Typography variant="headline" className={classes.heading} >
              Turn
            </Typography>

            <Typography gutterBottom >00&emsp;All players simulanously place face down elements in front of them to cast their spells.</Typography>
            <Typography gutterBottom >00&emsp;Players can cast up to two spells with up to 5 component cards in total.</Typography>
            {/* <Typography gutterBottom >00&emsp;First player who is done with spellcasting receives a free component card and starts the hourglass.</Typography> */}
            {/* <Typography gutterBottom >00&emsp;When the hourglass is finished, all players must stop changing the cast elements.</Typography> */}
            <Typography gutterBottom >00&emsp;Reveal cast component cards one by one from left to right starting with the starting player until one of the spells is fully revealed and cast it.</Typography>
            <Typography gutterBottom >00&emsp;The caster can move to a surrounding unoccupied field right before casting a spell.</Typography>
            <Typography gutterBottom >00&emsp;If a player's avatar gains <IconWound label={`${playerWounds} wounds`}/>, he is immediately slain and cannot cast any more spells this round.</Typography>
            <Typography gutterBottom >00&emsp;Continue revealing elements and casting spells untill all remaining spells are cast.</Typography>
            <Typography gutterBottom >00&emsp;Move the first player marker to the person who finished casting first.</Typography>
            <Typography gutterBottom >00&emsp;At the end of the round all living players draw {endOfTurnDraw} component cards</Typography>
            <Typography gutterBottom >00&emsp;Players with slain avatars discard all their component cards and wound markers, draw a new hand of {startingHandSize} component cards and respawn their avatar on any unoccupied grass field.</Typography>

            <Typography variant="headline" className={classes.heading} >
              Spellcasting
            </Typography>
            <Typography gutterBottom>You cast a spell by combining component cards.</Typography>
            <Typography gutterBottom>You can cast up to {maxSpells} spells ({maxSpells - cursedSpellCountReduction} spell{maxSpells - cursedSpellCountReduction > 1 ? 's' : null} when [cursed]) consisting of up to {maxComponentsPerRound} component cards in total. Place component cards of each spell face down in rows and start revealing elements from the left.</Typography>
            <Typography gutterBottom>Each spell can have only one type of element. Each element has it's own effect. You can overcharge your spell with more elements of the same type to get more effects.</Typography>
            <Typography gutterBottom>By default you can target one surrounding field, but you can change this by adding a shape card and modifiers. Each spell can have maximum of one shape card and any number of modifiers.</Typography>
            <Typography gutterBottom>A shape changes the target from just one field to Line, Cone, Circle and even the whole battlefield.</Typography>
            <Typography gutterBottom>You can add modifiers to expand range, jump to more targets, add extra damage and more. One spell can also have more than one modifier of the same type.</Typography>
          </PrintPage>

          <PrintPage page={paperSizes.portrait.A4} >
            <Typography gutterBottom variant="headline" component="h1">
              Statuses
            </Typography>
            <div className={classes.statuses} >
              {statuses.map(({name, effects}, index) => (<div key={index} className={classnames(classes.section, classes.status)}>
                <Typography gutterBottom variant="title" component="h2">
                  {richText(name, {iconSize: 3})}
                </Typography>

                <Typography variant="subheading" gutterBottom>Effects</Typography>
                {effects.map((effect, effectIndex) => (<Typography key={effectIndex} gutterBottom >
                  {richText(effect)}
                </Typography>) )}
              </div>))}
            </div>
          </PrintPage>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
