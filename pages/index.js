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
            <Typography >Pick an avatar for each player and distribute target markers of the same color.</Typography>
            <Typography >TODO: avatar, target marker graphic</Typography>

            <Typography >Pick a starting player.</Typography>
            <Typography >Each player draws a starting hand of 7 element cards.</Typography>
            <Typography >Take turns placing your avatars on any unoccupied grass fields.</Typography>

            <Typography variant="headline" className={classes.heading} >
              Turn
            </Typography>
            <Typography >All players simulanously place face down elements in front of them to cast their spells.</Typography>
            <Typography >Players can cast up to two spells with up to 5 element cards in total.</Typography>
            <Typography >First player who is done with spellcasting receives a free element card and starts the hourglass.</Typography>
            <Typography >When the hourglass is finished, all players must stop changing the cast elements.</Typography>
            <Typography >Now players can adjust facing of their avatars and place their target markers.</Typography>
            <Typography >Reveal cast element cards one by one from left to right starting with the starting player until a spell is fully revealed and cast it.</Typography>
            <Typography >If a player casts his last spell, he can move to a surrounding unoccupied field.</Typography>
            <Typography >If a player's avatar gains 4 wounds, he is immediately slain and cannot cast any more spells this round.</Typography>
            <Typography >Continue revealing elements and casting spells untill there are no more left.</Typography>
            <Typography >Move the first player marker to the person who cast the last spell.</Typography>
            <Typography >Players with slain avatars discard all their element cards and wound markers, draw a new hand of 7 cards and respawn their avatar on any unoccupied grass field.</Typography>

            <Typography variant="headline" className={classes.heading} >
              Spellcasting
            </Typography>
            <Typography >Combination of elements that does not exatly match any spells have no effect.</Typography>
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
