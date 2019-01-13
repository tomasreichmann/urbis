// @ts-check
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import chunk from "lodash/chunk";

import withRoot from "../src/withRoot";
import Navigation from "../src/components/Navigation";
import { pageStyles } from "../src/utils/styles";
import PrintPage from "../src/components/PrintPage";
import Specialist from "../src/components/Specialist";
import { Typography } from "@material-ui/core";

// @ts-ignore
const specialists = require("../src/model/specialists.json");

const styles = theme => ({
  ...pageStyles(theme),
  buildingList: {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "repeat(5, auto)",
    justifyContent: "flex-start",
    // gridGap: `0.5cm`,
    marginBottom: "0.5cm"
  },
  block: {
    width: "3.5cm",
    height: "3.5cm",
    border: `1mm solid ${theme.palette.secondary.main}`,
    marginBottom: "0.5mm",
    backgroundColor: `${theme.palette.secondary.light}`,
    opacity: 0.25
  }
});

class Rules extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Navigation />
        <PrintPage>
          <Typography variant="headline" color="inherit" gutterBottom>
            Setup
          </Typography>
          <Typography color="inherit" gutterBottom>
            Place the Market in easy reach for all players.
          </Typography>
          <Typography color="inherit" gutterBottom>
            Place the Town card next to the Market.
          </Typography>
          <Typography color="inherit" gutterBottom>
            Collect all the gold coins and place them near the Market.
          </Typography>
          <Typography color="inherit" gutterBottom>
            Place the Population marker on 2 on the population track on the Town
            card.
          </Typography>
          <Typography color="inherit" gutterBottom>
            Place the Happiness marker in the middle of the happiness track on
            the Town card.
          </Typography>
          <Typography color="inherit" gutterBottom>
            Pick a scenario to play. If this is your first game, pick a scenario
            #1 Greenfield.
          </Typography>
          <Typography color="inherit" gutterBottom>
            Order the Calendar deck of your scenario by the number in the bottom
            right corner with the calendar side up and place it near the Market.
          </Typography>
          <Typography color="inherit" gutterBottom>
            Collect the set of starting buildings and place them with the
            undamaged side up near the Market.
          </Typography>
          <Typography color="inherit" gutterBottom>
            Shuffle the Peasant deck and place it face down near the Market.
          </Typography>
          <Typography color="inherit" gutterBottom>
            Draw 4 Peasant cards and place them face up near the Peasant deck.
          </Typography>
          <Typography color="inherit" gutterBottom>
            Shuffle the Expedition deck and place it face down near the Market.
          </Typography>
        </PrintPage>
        <PrintPage>
          <Typography variant="headline" color="inherit" gutterBottom>
            A game round (season)
          </Typography>
          <Typography color="inherit" gutterBottom>
            First turn over the next Calendar card and read it.
          </Typography>
          <Typography color="inherit" gutterBottom>
            All players take actions untill nobody want's to make any more
            actions and the round (season) is over. Then continue with the
            cleanup phase.
          </Typography>
          <Typography variant="headline" color="inherit" gutterBottom>
            Player actions
          </Typography>
          <Typography variant="title" color="inherit" gutterBottom>
            Buy resources from the market
          </Typography>
          <Typography color="inherit" gutterBottom>
            Each unit of resource can cost different amount of gold depending on
            the supply in the market. You buy the cheapest units first and round
            up the total. Return the spent gold from your supply to the Bank.
            You must spent the resources immediately or store them in a
            Warehouse.
          </Typography>
          <Typography variant="title" color="inherit" gutterBottom>
            Sell resources to the market
          </Typography>
          <Typography color="inherit" gutterBottom>
            You can sell resources from your Warehouse or your immediate
            production. Each unit sold can earn different amount of gold. You
            must sell for the highest price first, then regular price and the
            rest for low price depending it's supply on the Market. The maximum
            amount of resource units of both high and regular priced goods is
            equal to current population. TODO: image
          </Typography>
          <Typography variant="title" color="inherit" gutterBottom>
            Construct a new building
          </Typography>
          <Typography color="inherit" gutterBottom>
            You must pay the building cost in the top right corner of the
            Building card, then place it in front of you. You can use this
            building in the same round it is constructed.
          </Typography>
          <Typography variant="title" color="inherit" gutterBottom>
            Fire, Hire and reassign Peasants (only once per Round)
          </Typography>
          <Typography color="inherit" gutterBottom>
            First you can fire any of your employees by placing them in a
            discard pile next to the Peasant deck. You can hire any employees
            from the supply and assign them to any of your buildings or ships.
            But you can never have more employees than the current Population.
            Redraw cards from the Peasant deck so that thare is 4 cards face up
            next to it at all times. If you run out of Peasant cards, shuffle
            the discard pile into a new Peasant deck. All hired employees must
            get paid and possibly produce otherwise they are fired by the end of
            the round. Buildings or Ships cannot have more employees than their
            capacity. You can reassing your employees from previous rounds if
            they haven't been used already on production, activation or
            expedition.
          </Typography>
          <Typography variant="title" color="inherit" gutterBottom>
            Produce
          </Typography>
          <Typography color="inherit" gutterBottom>
            For each employee assigned to your buildings pick a production from
            the Building card and pay the employee's wages (top right corner of
            the Peasant card). If you can't pay employees wages, they are fired
            instead immediately. For each selected production multiply the
            production cost (left side of the arrow) by number of employees
            assigned to it (rounded up). Spend the total production cost by
            either byuing it directly from the Market or removing it from your
            Warehouse. Multiply the production benefit by number of assigned
            employees (rounded down). Gain benefits (happiness), sell them
            immediately to the Market or store them in your Warehouse. TODO:
            image
          </Typography>
          <Typography variant="title" color="inherit" gutterBottom>
            Go on an expedition
          </Typography>
          <Typography color="inherit" gutterBottom>
            For each Ship with assigned employees load it with goods from the
            Market or your Warehouse, then draw a card from the Expedition deck
            and place it face up on the table next to any other face up
            expedition cards. If there are any Dangerous cards face up, you need
            to deal with them first (in any order). Compare the Threat condition
            listed on the Danger card to your expedition. If the threat applies,
            you suffer the Consequence listed on the Danger card. Resolved
            Threat cards are discarded. If there are no more healthy peasants on
            your ship you return to town immediatelly. If you can continue your
            expedition, you can select a face up expedition card and gain it's
            benefits. Settlement cards offer bonuses and allow trading of
            selected resources for fixed price, but remember your Ship has a
            limited capacity. After visiting a settlement, the ship returns to
            town and either sells it's cargo to the Market or moves it to your
            Warehouse.
          </Typography>
        </PrintPage>
        <PrintPage>
          <Typography variant="headline" color="inherit" gutterBottom>
            Cleanup phase
          </Typography>
          <Typography color="inherit" gutterBottom>
            Remove consumption from the Market based on the current season. For
            each requirement that was not completed entirely, remove the
            remainder and substract one happiness from the happiness track.
            TODO: image
          </Typography>
          <Typography color="inherit" gutterBottom>
            Add happiness bonuses with the current happiness level. If total
            hapiness is 3 or more, reset it to neutral and add one population.
            If total hapiness is -3 or less, reset it to neutral and substract
            one population.
          </Typography>
          <Typography color="inherit" gutterBottom>
            Reorder goods in marketplace to reflect new population consumption.
          </Typography>
        </PrintPage>
      </div>
    );
  }
}

Rules.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Rules));
