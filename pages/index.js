import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import Icon from "../src/components/icons/Icon";
import resources from "../src/model/resources";
import {
  marketResourceOrder,
  priceRanges,
  seasons
} from "../src/model/general";

import withRoot from "../src/withRoot";

import Navigation from "../src/components/Navigation";
import { pageStyles } from "../src/utils/styles";
import { getPrice } from "../src/utils/price";
import MarketItem from "../src/components/MarketItem";
import Resources from "../src/components/Resources";

const styles = theme => ({
  ...pageStyles(theme),
  lead: {
    marginTop: theme.spacing.unit * 2
  },
  heading: {
    marginTop: theme.spacing.unit * 2
  },
  inline: {
    display: "inline"
  },
  market: {
    display: "grid",
    gridTemplateColumns: "auto repeat(4, minmax(110px, auto)) 1fr",
    gridGap: theme.spacing.unit * 2 + "px",
    alignItems: "flex-start",
    marginTop: theme.spacing.unit * 2
  },
  viewContent: {
    marginTop: theme.spacing.unit * 2
  }
});

const getInitialMarket = () => {
  return marketResourceOrder.reduce(
    (hash, resourceKey) => ({
      ...hash,
      [resourceKey]: {
        ...resources[resourceKey],
        resource: resourceKey,
        amount: 10
      }
    }),
    {}
  );
};

const getInitialStorage = () => {
  return Object.keys(resources).reduce(
    (hash, resourceKey) => ({
      ...hash,
      [resourceKey]: 5
    }),
    {}
  );
};

const getInitialExchangeAmounts = () => {
  return Object.keys(resources).reduce(
    (hash, resourceKey) => ({
      ...hash,
      [resourceKey]: 0
    }),
    {}
  );
};

class Index extends React.Component {
  state = {
    view: "overview",
    population: 20,
    exchangeAmounts: getInitialExchangeAmounts(),
    storage: getInitialStorage(),
    market: getInitialMarket(),
    currentSeason: seasons[0],
    currentYear: 0
  };

  changeExchangeAmounts = (
    marketGoods,
    priceRanges,
    priceBlockSize
  ) => event => {
    const inStock = this.state.storage[marketGoods.resource];
    const exchangeAmount = event.target.value;
    const cost = getPrice(
      marketGoods,
      exchangeAmount,
      priceRanges,
      priceBlockSize
    );
    if (exchangeAmount > 0 && cost > this.state.storage.gold) {
      return;
    }
    this.setState({
      exchangeAmounts: {
        ...this.state.exchangeAmounts,
        [marketGoods.resource]: Math.max(
          Math.min(exchangeAmount, marketGoods.amount),
          -inStock
        )
      }
    });
  };

  updatePopulation = delta => _event => {
    this.setState({
      population: this.state.population + delta
    });
  };

  nextSeason = _event => {
    const { currentSeason, currentYear } = this.state;
    const nextSeasonIndex = seasons.indexOf(currentSeason) + 1;
    const isNextYear = nextSeasonIndex > seasons.length - 1;
    const nextSeason = seasons[nextSeasonIndex % seasons.length];
    this.setState({
      currentSeason: nextSeason,
      currentYear: isNextYear ? currentYear + 1 : currentYear
    });
  };

  switchView = (_event, view) => {
    console.log("view", view);
    this.setState({
      view
    });
  };

  exchange = (resourceKey, priceRanges, priceBlockSize) => event => {
    const { market, exchangeAmounts, storage } = this.state;
    const marketGoods = market[resourceKey];
    const exchangeAmount = exchangeAmounts[resourceKey];
    const cost = getPrice(
      marketGoods,
      exchangeAmount,
      priceRanges,
      priceBlockSize
    );
    this.setState({
      exchangeAmounts: {
        ...this.state.exchangeAmounts,
        [resourceKey]: 0
      },
      storage: {
        ...storage,
        [resourceKey]: storage[resourceKey] + exchangeAmount,
        gold: storage.gold + cost * (exchangeAmount > 0 ? -1 : 1)
      },
      market: {
        ...market,
        [resourceKey]: {
          ...market[resourceKey],
          amount: market[resourceKey].amount - exchangeAmount
        }
      }
    });
  };

  renderOverview = () => {
    const { classes } = this.props;
    const {
      storage,
      market,
      population,
      currentSeason,
      currentYear
    } = this.state;
    return (
      <div>
        <Typography variant="title">
          It's {currentSeason} of year {currentYear}
          &ensp;
          <Button color="primary" size="small" onClick={this.nextSeason}>
            Next
          </Button>
          &emsp;| Population &emsp;
          <Button
            color="secondary"
            size="small"
            variant="raised"
            onClick={this.updatePopulation(-1)}
          >
            &minus;
          </Button>
          &ensp;
          {population}
          &ensp;
          <Button
            color="primary"
            size="small"
            variant="raised"
            onClick={this.updatePopulation(1)}
          >
            +
          </Button>
          &ensp;| Happiness: n/a
        </Typography>
        <Typography>
          <Resources
            items={["gold", ...marketResourceOrder].map(resourceKey => {
              return {
                resourceKey,
                amount: storage[resourceKey]
              };
            })}
          />
        </Typography>
      </div>
    );
  };

  renderMarket = () => {
    const { classes } = this.props;
    const {
      exchangeAmounts,
      storage,
      market,
      population,
      currentSeason
    } = this.state;
    const priceBlockSize = Math.ceil(population / 4);
    return (
      <div className={classes.market}>
        <Typography variant="title">Resource</Typography>
        <Typography variant="title">
          <Icon {...resources.gold} label={priceRanges[0]} />
        </Typography>
        <Typography variant="title">
          <Icon {...resources.gold} label={priceRanges[1]} />
        </Typography>
        <Typography variant="title">
          <Icon {...resources.gold} label={priceRanges[2]} />
        </Typography>
        <Typography variant="title">
          Amount&emsp;
          <Icon {...resources.gold} label={storage.gold} />
        </Typography>
        <Typography variant="title">Storage</Typography>

        {marketResourceOrder.map(resourceKey => {
          const marketGoods = market[resourceKey];
          return (
            <MarketItem
              key={resourceKey}
              resourceKey={resourceKey}
              marketGoods={marketGoods}
              priceRanges={priceRanges}
              priceBlockSize={priceBlockSize}
              currentSeason={currentSeason}
              storage={storage[resourceKey]}
              exchangeAmount={exchangeAmounts[resourceKey]}
              changeExchangeAmounts={this.changeExchangeAmounts}
              exchange={this.exchange}
            />
          );
        })}
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const { population, view } = this.state;

    const priceBlockSize = Math.ceil(population / 4);

    const views = {
      overview: this.renderOverview,
      market: this.renderMarket
    };

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.page}>
          <Paper>
            <Tabs
              value={view}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.switchView}
            >
              <Tab label="Overview" value="overview" />
              <Tab
                label={
                  <Icon
                    iconSize={3}
                    iconUri="http://scalesofjusticeacademy.org/wp-content/uploads/2017/04/cropped-scalesicon.png"
                    label="Market"
                  />
                }
                value="market"
              />
            </Tabs>
          </Paper>
          <div className={classes.viewContent}>{views[view]()}</div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Index));
