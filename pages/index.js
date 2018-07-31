import React from 'react';
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

const styles = theme => (console.log('theme', theme), {
  page: {
    padding: theme.spacing.unit * 10,
  },
  lead: {
    marginTop: theme.spacing.unit * 2,
  },
  heading: {
    marginTop: theme.spacing.unit * 2,
  },
  water: {
    color: theme.palette.water.main,
  },
  fire: {
    color: theme.palette.fire.main,
  },
  grid: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

class Index extends React.Component {
  render() {
    const { classes } = this.props;
    const hexWidth = '20mm';
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
            <Typography variant="title" gutterBottom className={classes.lead}>Magic Mayhem is a 1 to 4 player cooperative or competetive tactical game where magicians massacre each other with spells like <span className={classes.water} >Tsunami</span> or <span className={classes.fire} >Floor is Lava</span>.</Typography>

            <Typography variant="display1" className={classes.heading} >Deathmatch</Typography>
            <Typography variant="subheading" gutterBottom>In deathmatch, players fight against each other one on one or in teams.</Typography>
            <Typography >For each kill, you get a point for yourself or for your team. The first player to reach <strong>7 kills</strong> or team to reach <strong>10 kills</strong> is the winner.</Typography>

            <Typography variant="headline" className={classes.heading} >
              Setup
            </Typography>
            <Typography >Assemble field tiles into a board like this.</Typography>
            <Grid hexGrid={board} hexWidth={hexWidth} className={classes.grid}/>
            <Typography >Shuffle element cards and place the deck face down near the board</Typography>
            <Typography >Pick an avatar for each player.</Typography>
            <Typography >Pick a starting player and place a Starting player marker in front of the player.</Typography>
            <Typography >Each player draws a starting hand of 7 element cards.</Typography>
            <Typography >Take turns placing your avatars on any unoccupied grass fields.</Typography>

            <Typography variant="headline" className={classes.heading} >
              Turn
            </Typography>
            <Typography gutterBottom >All players simulanously place face down elements in front of them to cast their spells.</Typography>
            <Typography gutterBottom >Players can cast up to two spells with up to 5 element cards in total.</Typography>
            <Typography gutterBottom >First player who is done with spellcasting receives a free element card and starts the hourglass.</Typography>
            <Typography gutterBottom >When the hourglass is finished, all players must stop changing the cast elements.</Typography>
            <Typography gutterBottom >Reveal cast element cards one by one from left to right starting with the starting player until a spell is fully revealed and cast it.</Typography>
            <Typography gutterBottom >If a player casts his last spell, he can move to a surrounding unoccupied field.</Typography>
            <Typography gutterBottom >If a player's avatar gains <IconWound label={4}/>, he is immediately slain and cannot cast any more spells this round.</Typography>
            <Typography gutterBottom >Continue revealing elements and casting spells untill there are no more left.</Typography>
            <Typography gutterBottom >Move the first player marker to the person who cast the last spell.</Typography>
            <Typography gutterBottom >Players with slain avatars discard all their element cards and wound markers, draw a new hand of 7 cards and respawn their avatar on any unoccupied grass field.</Typography>

            <Typography variant="headline" className={classes.heading} >
              Spellcasting
            </Typography>
            <Typography >Combination of elements that does not exatly match any spells have no effect.</Typography>
          </PrintPage>

          <PrintPage page={paperSizes.portrait.A4} >
            <Typography gutterBottom variant="headline" component="h1">
              Statuses
            </Typography>

            <Typography gutterBottom variant="title" component="h2" className={classes.heading} >
              <IconBurning label="Burning" iconSize={3} />
            </Typography>
            <Typography gutterBottom >Any targets that are in a <IconBurning /> zone at the end of the round receive <IconFire label="1" /> damage.</Typography>
            <Typography gutterBottom >If the zone has <IconWet /> status and is about to get a <IconBurning /> status, it instead looses this status and does not get any new ones.</Typography>

            <Typography gutterBottom variant="title" component="h2" className={classes.heading} >
              <IconWet label="Wet" iconSize={3} />
            </Typography>
            <Typography gutterBottom >Any targets in the <IconWet /> zone that are are about to receive <IconLightning /> damage receive 1 extra <IconLightning /> damage.</Typography>
            <Typography gutterBottom >If the zone has a <IconBurning /> status and is about to receive a <IconWet /> status, it instead looses this status and does not get any new ones.</Typography>

            <Typography gutterBottom variant="title" component="h2" className={classes.heading} >
              <IconFrozen label="Frozen" iconSize={3} />
            </Typography>
            <Typography gutterBottom >A <IconWet /> zone that is a target of a freezing spell looses the <IconWet /> status and gains a <IconFrozen /> status instead.</Typography>
            <Typography gutterBottom >A target cannot move while the zone is <IconFrozen />.</Typography>
            <Typography gutterBottom >A <IconFrozen /> zone that is a target of a <IconFire /> spell looses the <IconFrozen /> status and gains a <IconWet /> status instead.</Typography>

            <Typography gutterBottom variant="title" component="h2" className={classes.heading} >
              <IconCursed label="Cursed" iconSize={3} />
            </Typography>
            <Typography gutterBottom >A zone can not become cursed.</Typography>
            <Typography gutterBottom >A target that is cursed can only make spells with the total of 4 elements per round.</Typography>
            <Typography gutterBottom >The <IconCursed /> status is replaced by any other <IconHex /> statuses, like Fire Immunity.</Typography>

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
