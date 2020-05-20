// @ts-check
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import chunk from "lodash/chunk";
import PropTypes from "prop-types";
import React from "react";
import Icon from "../src/components/icons/Icon";
import Navigation from "../src/components/Navigation";
import Stockpile, { stockpileDimensions } from "../src/components/Stockpile";
import PrintPage from "../src/components/PrintPage";
import { marketResourceOrder, priceRanges } from "../src/model/general";
import { pageStyles } from "../src/utils/styles";
import withRoot from "../src/withRoot";
import { duplicateItems } from "../src/utils/helpers";

// @ts-ignore
const resources = require("../src/model/resources");

const styles = theme => ({
  ...pageStyles(theme),
  goods: {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "4cm auto auto 1fr",
    justifyContent: "flex-start",
    gridGap: `0.5cm`,
    marginBottom: "0.5cm"
  },
  priceRange: {
    textAlign: "center"
  },
  block: {
    height: "3cm",
    border: `1mm solid ${theme.palette.secondary.main}`,
    marginBottom: "0.5mm",
    backgroundColor: `${theme.palette.secondary.light}`,
    opacity: 0.25
  },
  label: {
    textAlign: "center"
  },
  stockpile: {
    ...stockpileDimensions,
    float: "left"
  }
});

class MarketSheet extends React.Component {
  renderMarketItem(resourceKey) {
    const { classes } = this.props;
    return (
      <div className={classes.goods} key={resourceKey}>
        <Typography
          variant="title"
          color="inherit"
          className={classes.label}
          key={`${resourceKey} label`}
        >
          <Icon {...resources[resourceKey]} iconSize={8} label={null} />
          <br />
          {resources[resourceKey].label}
        </Typography>
        {priceRanges.map(priceRange => (
          <div
            className={classes.priceRange}
            key={`${resourceKey} range ${priceRange}`}
          >
            <Typography variant="title" color="inherit">
              <Stockpile
                resourceProps={{
                  resourceKey: "gold",
                  label: resources[resourceKey].price[priceRange]
                }}
                rootProps={{
                  style: {
                    height: "3.5cm",
                    width: priceRange === "low" ? "100%" : "3.5cm"
                  }
                }}
              />
            </Typography>
          </div>
        ))}
      </div>
    );
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Navigation />
        {chunk(marketResourceOrder, 7).map((resourceGroup, pageIndex) => {
          return (
            <PrintPage key={pageIndex}>
              {resourceGroup.map(resourceKey =>
                this.renderMarketItem(resourceKey)
              )}
            </PrintPage>
          );
        })}
        <PrintPage key="stockpiles">
          {duplicateItems(
            marketResourceOrder.filter(resourceKey => resourceKey !== "cattle"),
            4
          ).map((resourceKey, stockpileIndex) => (
            <div className={classes.stockpile} key={stockpileIndex}>
              <Stockpile resourceProps={{ resourceKey }} />
            </div>
          ))}
        </PrintPage>
      </div>
    );
  }
}

MarketSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

// @ts-ignore
export default withRoot(withStyles(styles)(MarketSheet));
