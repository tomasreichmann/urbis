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

import withRoot from '../src/withRoot';
import Navigation from '../src/components/Navigation';
import ResourceCard from '../src/components/ResourceCard';
import FieldHex from '../src/components/FieldHex';
import Grid from '../src/components/Grid';

import { fieldMap } from '../src/model/fields';
import { startingHandSize, endOfTurnDraw, maxSpells } from '../src/model/game';
import { resources as resourceTypes } from '../src/model/resources-modal';
import { paperSizes } from '../src/utils/paperSizes';
import { convertToUnit, getSpellDescription } from '../src/utils/helpers';
import { richText } from '../src/utils/richText';

const DECK_SHIFT = 0.25;

const styles = theme => ({
  page: {
    '@media screen': {
      padding: theme.spacing.unit * 4,
      boxShadow: theme.shadows[5],
    },
  },
  message: {
    margin: `${theme.spacing.unit * 2}px 0`,
    maxWidth: 'none !important',
  },
  error: {
    backgroundColor: theme.palette.fire.dark,
  },
  primary: {
    backgroundColor: theme.palette.primary,
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
  grid: {
    marginLeft: theme.spacing.unit * 4,
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
  cardBackFaceHighlight: {
    backgroundColor: theme.palette.primary.main,
  },
  cardButton: {
    ...paperSizes.portrait.smallCard,
  },
  selectedCard: {
    border: `1px solid ${theme.palette.fire.main}`,
  },
  selectableField: {
    cursor: 'pointer',
  },
});

const SELECT_SPAWN = 'SELECT_SPAWN'; // draw starting hand
const DRAW_STARTING_HAND = 'DRAW_STARTING_HAND'; // draw starting hand
const PREPARE_SPELLS = 'PREPARE_SPELLS'; // compose spells
const MOVE = 'MOVE'; // move 1 field before casting
const TARGET_SPELL = 'TARGET_SPELL'; // target next spell
const DISCARD_CARDS = 'DISCARD_CARDS'; // select cards to be discarded
const DIE = 'DIE';
const CLEANUP = 'CLEANUP'; // draw cards, or respawn and draw starting hand

const EMPTY = 'EMPTY';

const phases = {
  [SELECT_SPAWN]: {
    message: {
      type: 'primary',
      text: 'Select a grass field to spawn onto',
    },
  },
  [DRAW_STARTING_HAND]: {
    message: {
      type: 'primary',
      text: `Draw ${startingHandSize} cards`,
    },
  },
  [PREPARE_SPELLS]: {
    message: {
      type: 'primary',
      text: 'Prepare spells by selecting cards from your hand and adding them to spells.',
    },
  },
  [MOVE]: {
    message: {
      type: 'primary',
      text: 'You can move one field right before casting your spell.',
    },
  },
};

const getCastingKey = (index) => (`casting_${index}`);

const castingKeys = range(maxSpells).reduce((castingKeyMap, spellIndex) => ({...castingKeyMap, [getCastingKey(spellIndex)]: []}), {});

class Simulator extends React.Component {

  constructor(props) {
    super(props)
  }

  getDefaultState = () => ({
    message: null,
    hand: [],
    deck: shuffle(this.getSpellComponents()),
    selectedHandIndexes: [],
    discardPile: [],
    ...castingKeys,
    currentPhase: SELECT_SPAWN,
    currentPlayer: 0,
    board: [
      [
        { row: 0, column: 0, key: EMPTY },
        { row: 0, column: 1, ...fieldMap.everburningBrazier },
        { row: 0, column: 2, ...fieldMap.grass },
        { row: 0, column: 3, ...fieldMap.glacier },
      ],
      [
        { row: 1, column: 0, ...fieldMap.grass },
        { row: 1, column: 1, ...fieldMap.grass },
        { row: 1, column: 2, ...fieldMap.grass },
        { row: 1, column: 3, ...fieldMap.grass },
      ],
      [
        { row: 2, column: 0, ...fieldMap.lightningRod },
        { row: 2, column: 1, ...fieldMap.divineChapel },
        { row: 2, column: 2, ...fieldMap.bottomlessAbyss },
        { row: 2, column: 3, ...fieldMap.wizardTower },
        { row: 2, column: 4, ...fieldMap.quarry },
      ],
      [
        { row: 3, column: 0, ...fieldMap.grass },
        { row: 3, column: 1, ...fieldMap.grass },
        { row: 3, column: 2, ...fieldMap.grass },
        { row: 3, column: 3, ...fieldMap.grass },
      ],
      [
        { row: 4, column: 0, key: EMPTY },
        { row: 4, column: 1, ...fieldMap.pentagram },
        { row: 4, column: 2, ...fieldMap.grass },
        { row: 4, column: 3, ...fieldMap.pond },
      ],
    ]
  })

  state = this.getDefaultState();

  getComponentCard = ({key, ...componentInstance}) => <Card className={this.props.classes.card} elevation={0} style={{...paperSizes.portrait.smallCard}} key={key}><ResourceCard {...componentInstance} /></Card>

  getSpellComponents() {
    return resourceTypes.reduce(
      (collection, {count, ...resource}) => (
        collection.concat(
          range(count).map((countIndex) => ({
            ...resource,
            key: resource.slug + '-' + countIndex
          }))
        )
      ),
      []
    );
  }

  spawn = (row, column) => {
    const newState = {
      board: [
        ...this.state.board
      ],
      currentPhase: DRAW_STARTING_HAND
    };
    newState.board[row] = [
      ...this.state.board[row]
    ];
    newState.board[row][column] = {
      ...this.state.board[row][column],
      player: this.state.currentPlayer,
    };
    this.setState(newState);
  }

  moveByIndex(index, from, to) {
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

  move(count = 1, from, to, removeLast = true, addToEnd = true) {
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

  reset = () => {
    this.setState(this.getDefaultState());
  }

  drawStartingHand = () => {
    this.draw(startingHandSize);
    this.setState({
      currentPhase: PREPARE_SPELLS
    });
  }

  finishPreparingSpells = () => {
    this.setState({
      currentPhase: MOVE,
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
      message: {
        type: 'error',
        text: message,
      }
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
    const { message: stateMessage, deck, hand, discardPile, selectedHandIndexes, currentPhase, board } = this.state;

    const spellKeys = range(maxSpells).map(spellIndex => getCastingKey(spellIndex));
    const phase = phases[currentPhase];
    const messages = [];
    if (phase.message) {
      messages.push(phase.message);
    }
    if (stateMessage) {
      messages.push(stateMessage);
    }

    const hexWidth = '35mm';
    const spawnableFieldProps = ({key}, row, column) => (key === 'grass' && currentPhase === SELECT_SPAWN ? {
      className: classes.selectableField,
      color: 'primary',
      onClick: () => this.spawn(row, column) // TODO: make board abstract, pass spawn params
    } : {});
    const fieldHexOptions = {
      width: hexWidth,
      iconSize: 4,
      // labelVariant: 'body2'
    };
    const EmptyField = () => <FieldHex width={hexWidth} />;
    const hexGrid = board.map(boardRow => boardRow.map(({ row, column, ...field }) => field.key === EMPTY
      ? <EmptyField key={`${row}-${column}`} />
      : <FieldHex
        {...field}
        key={`${row}-${column}`}
        {...fieldHexOptions}
        {...spawnableFieldProps(field, row, column)}
      />
    ))
    // const board = [
    //   [
    //     EmptyField,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.everburningBrazier} />,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.grass} {...spawnableFieldProps(0, 2)}/>,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.glacier} />,
    //   ],
    //   [
    //     <FieldHex {...fieldHexOptions} {...fieldMap.grass} {...spawnableFieldProps(1, 0)}/>,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.grass} {...spawnableFieldProps(1, 1)}/>,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.grass} {...spawnableFieldProps(1, 2)}/>,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.grass} {...spawnableFieldProps(1, 3)}/>,
    //   ],
    //   [
    //     <FieldHex {...fieldHexOptions} {...fieldMap.lightningRod} />,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.divineChapel} />,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.bottomlessAbyss} />,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.wizardTower} />,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.quarry} />,
    //   ],
    //   [
    //     <FieldHex {...fieldHexOptions} {...fieldMap.grass} {...spawnableFieldProps(3, 0)} />,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.grass} {...spawnableFieldProps(3, 1)} />,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.grass} {...spawnableFieldProps(3, 2)} />,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.grass} {...spawnableFieldProps(3, 3)} />,
    //   ],
    //   [
    //     EmptyField,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.pentagram} />,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.grass} {...spawnableFieldProps(4, 2)}/>,
    //     <FieldHex {...fieldHexOptions} {...fieldMap.pond} />,
    //   ],
    // ];

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.page} >
          <div className={classes.controls}>
            <Button onClick={() => this.draw(startingHandSize)} className={classes.controlButton} variant="raised" >Draw starting hand ({startingHandSize})</Button>
            <Button onClick={this.discard} className={classes.controlButton} variant="raised" >Discard entire hand</Button>
            <Button onClick={() => this.draw(endOfTurnDraw)} className={classes.controlButton} variant="raised" >Draw cards ({endOfTurnDraw})</Button>
            <Button onClick={this.recycleDiscardPile} className={classes.controlButton} variant="raised" >Recycle discard pile</Button>
            <Button onClick={this.reset} className={classes.controlButton} variant="raised" color="secondary" >Reset</Button>
          </div>
          {messages.length ? messages.map((message, messageIndex) => (<SnackbarContent
            key={messageIndex}
            className={classnames(classes.message, classes[message.type])}
            message={message.text}
          />)) : null}

          <Divider className={classes.divider}/>
          <div className={classes.decksCasting} >
            <div className={classes.decks} >
              <div style={{
                marginTop: DECK_SHIFT * Math.max(deck.length, discardPile.length) + 'mm',
              }}>
                <div className={classes.deck}>{deck.map((card, cardIndex) => <div
                  {...(currentPhase === DRAW_STARTING_HAND ? { onClick: this.drawStartingHand() } : {})}
                  key={cardIndex}
                  className={classnames(classes.card, classes.deckCard, classes.cardBackFace, currentPhase === DRAW_STARTING_HAND && classes.cardBackFaceHighlight)}
                />)}</div>
                <Typography variant="title" className={classes.deckTitle} >Deck</Typography>
              </div>
              <div style={{
                marginTop: DECK_SHIFT * Math.max(deck.length, discardPile.length) + 'mm',
              }}>
                <div className={classes.discardPile}>{discardPile.map((card, cardIndex) => <div key={cardIndex} className={classes.deckCard} >{this.getComponentCard(card)}</div>)}</div>
                <Typography variant="title" className={classes.deckTitle} >Discard pile</Typography>
              </div>
            </div>
            <div>
              <div className={classes.casting}>
                <Typography variant="title" className={classes.deckTitle} >Casting</Typography>
                {spellKeys.map((spellKey, spellIndex) => (
                  <div key={spellKey} >
                    <Typography variant="title" className={classes.spellTitle} >Spell {spellIndex + 1}: {richText(getSpellDescription(this.state[spellKey]))}</Typography>
                    <div className={classes.spell} >
                      { this.state[spellKey].map((card, cardIndex) => (
                        <div key={cardIndex} onClick={() => this.takeBack(spellIndex, cardIndex)} >
                          {this.getComponentCard(card)}
                        </div>
                      )) }
                      {
                        (currentPhase === PREPARE_SPELLS && selectedHandIndexes.length > 0) ? (
                          <Button onClick={() => this.addToSpell(spellIndex)} className={classes.cardButton} variant="raised" key="add" color="primary" >Add to spell</Button>
                        ) : null
                      }
                    </div>
                  </div>
                ))}
                { currentPhase === PREPARE_SPELLS ? <Button onClick={() => this.finishPreparingSpells()} className={classes.cardButton} variant="raised" color="secondary" key="cast" >Finish Casting</Button> : null }
              </div>
            </div>
            <div className={classes.grid}>
              <Grid hexGrid={hexGrid} hexWidth={hexWidth} />
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
              >{this.getComponentCard(card)}</div>
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
