import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Divider from '@material-ui/core/Divider';

import { grey } from '@material-ui/core/colors';
import { range, shuffle } from 'lodash';
import classnames from 'classnames';

import { startingHandSize, endOfTurnDraw, maxSpells } from '../src/model/game';
import withRoot from '../src/withRoot';
import Navigation from '../src/components/Navigation';
import { resources as resourceTypes } from '../src/model/resources-modal';
import ResourceCard from '../src/components/ResourceCard';
import { paperSizes } from '../src/utils/paperSizes';
import { convertToUnit } from '../src/utils/helpers';

const DECK_SHIFT = 0.25;

const styles = theme => ({
  page: {
    '@media screen': {
      padding: theme.spacing.unit * 4,
      boxShadow: theme.shadows[5],
    },
  },
  error: {
    margin: `${theme.spacing.unit * 2}px 0`,
    backgroundColor: theme.palette.fire.dark,
    maxWidth: 'none !important',
  },
  controls: {
    margin: `0 ${-theme.spacing.unit}px`,
  },
  controlButton: {
    margin: `0 ${theme.spacing.unit}px`,
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  decks: {
    marginRight: theme.spacing.unit * 4,
  },
  decksCasting: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  deck: {
    height: paperSizes.portrait.smallCard.height,
  },
  deckTitle: {
    marginTop: theme.spacing.unit,
  },
  discardPile: {
    height: paperSizes.portrait.smallCard.height,
    marginRight: theme.spacing.unit * 2,
  },
  casting: {
    marginBottom: theme.spacing.unit * 2,
  },
  spell: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: paperSizes.portrait.smallCard.height,
  },
  spellTitle: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
  },
  hand: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  deckCard: {
    position: 'relative',
    ...paperSizes.portrait.smallCard,
    marginBottom: -convertToUnit(paperSizes.portrait.smallCard.height) - DECK_SHIFT + 'mm',
    zIndex: 1,
  },
  card: {
    ...paperSizes.portrait.smallCard,
    cursor: 'pointer',
    border: `1px solid ${grey[300]}`,
  },
  cardBackFace: {
    ...paperSizes.portrait.smallCard,
    borderRadius: 4,
    backgroundColor: grey[200],
  },
  cardButton: {
    ...paperSizes.portrait.smallCard,
  },
  selectedCard: {
    border: `1px solid ${theme.palette.fire.main}`,
  }
});

class Simulator extends React.Component {

  state = {
    message: null,
    hand: [],
    deck: shuffle(this.getResourceCards()),
    selectedHandIndexes: [],
    discardPile: [],
    casting_0: [],
    casting_1: []
  };

  constructor(props) {
    super(props)
  }

  getResourceCards() {
    const { classes } = this.props;
    return resourceTypes.reduce(
      (collection, {count, ...resource}, resourceIndex) => (
        collection.concat(
          range(count).map(
            countIndex => <Card className={classes.card} elevation={0} style={{...paperSizes.portrait.smallCard}} key={resourceIndex + '-' + countIndex}><ResourceCard {...resource} /></Card>
          )
        )
      ),
      []
    );
  }

  moveByIndex(index, from, to){
    this.setState({
      [from]: [
        ...this.state[from].slice(0, index),
        ...this.state[from].slice(index + 1),
      ],
      [to]: [
        ...this.state[to],
        this.state[from][index]
      ]
    });
  }

  move(count = 1, from, to, removeLast = true, addToEnd = true){
    this.setState({
      [from]: removeLast
        ? this.state[from].slice(0, -count)
        : this.state[from].slice(count),
      [to]: [
        ...(addToEnd ? this.state[to] : []),
        ...(removeLast
          ? this.state[from].slice(-count)
          : this.state[from].slice(count)
        ),
        ...(!addToEnd ? this.state[to] : []),
      ]
    });
  }

  draw = (count = 1) => {
    const { deck } = this.state;
    if (deck.length < count) {
      return this.error('There are not enough cards in the deck. Reshuffle the discard pile.');
    }
    this.move(count, 'deck', 'hand');
  }

  takeBack = (spellIndex, cardIndex) => {
    this.moveByIndex(cardIndex, `casting_${spellIndex}`, 'hand');
  }

  discard = (count = -1) => {
    const { hand } = this.state;
    if (hand.length < count) {
      return this.error(`Cannot discard ${count} cards from hand. There are only ${hand.length} cards left.`);
    }
    const discardCount = count < 0 ? hand.length : count;
    this.move(discardCount, 'hand', 'discardPile');
    this.setState({ selectedHandIndexes: [] });
  }

  recycleDiscardPile = () => {
    const { discardPile } = this.state;
    this.move(discardPile.length, 'discardPile', 'deck', true, false);
  }

  error = (message) => {
    this.setState({
      message: 'Error: ' + message
    });
  }

  selectHandCard = (cardIndex) => {
    const { selectedHandIndexes } = this.state;
    this.setState({
      selectedHandIndexes: selectedHandIndexes.some(index => index === cardIndex)
        ? selectedHandIndexes.filter(index => index !== cardIndex)
        : [...selectedHandIndexes, cardIndex]
    });
  }

  addToSpell = (spellIndex) => {
    const { selectedHandIndexes, hand } = this.state;
    const newHand = [];
    const selectedCards = [];
    hand.forEach((card, cardIndex) => (
      selectedHandIndexes.some(selectedCardIndex => cardIndex === selectedCardIndex)
        ? selectedCards.push(card)
        : newHand.push(card)
    ));
    const castingKey = `casting_${spellIndex}`;
    this.setState({
      selectedHandIndexes: [],
      hand: newHand,
      [castingKey]: [...this.state[castingKey], ...selectedCards]
    });
  }

  cast = (spellIndex) => {
    const castingKey = `casting_${spellIndex}`;
    this.move(this.state[castingKey].length, castingKey, 'discardPile');
  }

  render() {
    const { classes } = this.props;
    const { message, deck, hand, discardPile, selectedHandIndexes } = this.state;

    const spellKeys = range(maxSpells).map(spellIndex => `casting_${spellIndex}`);
    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.page} >
          <div className={classes.controls}>
            <Button onClick={() => this.draw(startingHandSize)} className={classes.controlButton} variant="raised" >Draw starting hand</Button>
            <Button onClick={this.discard} className={classes.controlButton} variant="raised" >Discard entire hand</Button>
            <Button onClick={() => this.draw(endOfTurnDraw)} className={classes.controlButton} variant="raised" >Draw cards ({endOfTurnDraw})</Button>
            <Button onClick={this.recycleDiscardPile} className={classes.controlButton} variant="raised" >Recycle discard pile</Button>
          </div>
          {message ? (<SnackbarContent
            className={classes.error}
            message={message}
          />) : null}

          <Divider className={classes.divider}/>
          <div className={classes.decksCasting} >
            <div className={classes.decks} >
              <div style={{
                marginTop: DECK_SHIFT * Math.max(deck.length, discardPile.length) + 'mm',
              }}>
                <div className={classes.deck}>{deck.map((card, cardIndex) => <div onClick={() => this.draw()} key={cardIndex} className={classnames(classes.card, classes.deckCard, classes.cardBackFace)} />)}</div>
                <Typography variant="title" className={classes.deckTitle} >Deck</Typography>
              </div>
              <div style={{
                marginTop: DECK_SHIFT * Math.max(deck.length, discardPile.length) + 'mm',
              }}>
                <div className={classes.discardPile}>{discardPile.map((card, cardIndex) => <div key={cardIndex} className={classes.deckCard} >{card}</div>)}</div>
                <Typography variant="title" className={classes.deckTitle} >Discard pile</Typography>
              </div>
            </div>
            <div>

              <div className={classes.casting}>
                <Typography variant="title" className={classes.deckTitle} >Casting</Typography>
                {spellKeys.map((spellKey, spellIndex) => (
                  <div key={spellKey} >
                    <Typography variant="title" className={classes.spellTitle} >Spell {spellIndex + 1}</Typography>
                    <div className={classes.spell} >
                      { this.state[spellKey].map((card, cardIndex) => (
                        <div key={cardIndex} onClick={() => this.takeBack(spellIndex, cardIndex)} >
                          {card}
                        </div>
                      )) }
                      {
                        selectedHandIndexes.length > 0 ? (
                          <Button onClick={() => this.addToSpell(spellIndex)} className={classes.cardButton} variant="raised" key="add" >Add</Button>
                        ) : null
                      }
                      {
                        this.state[spellKey].length > 0 ? (
                          <Button onClick={() => this.cast(spellIndex)} className={classes.cardButton} variant="raised" key="cast" >Cast</Button>
                        ) : null
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Typography variant="title" >Hand</Typography>
            <div className={classes.hand}>{hand.map((card, cardIndex) => (
              <div className={classnames(
                (selectedHandIndexes !== null && selectedHandIndexes.some(index => index === cardIndex))
                  ? classes.selectedCard
                  : null
                )}
                key={cardIndex}
                onClick={() => this.selectHandCard(cardIndex)}
              >{card}</div>
            ))}</div>
          </div>
        </div>
      </div>
    );
  }
}

Simulator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Simulator));
