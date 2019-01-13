// @ts-check
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import chunk from "lodash/chunk";

import withRoot from "../src/withRoot";
import Navigation from "../src/components/Navigation";
import { pageStyles } from "../src/utils/styles";
import PrintPage from "../src/components/PrintPage";
import Icon from "../src/components/icons/Icon";
import { priceRanges, marketResourceOrder } from "../src/model/general";
// @ts-ignore
const resources = require("../src/model/resources");

const styles = theme => ({
  ...pageStyles(theme),
  goods: {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "4cm 3cm 3cm 1fr",
    justifyContent: "flex-start",
    gridGap: `0.5cm`
    // marginBottom: "0.5cm"
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
            <div className={classes.block} />
            <Typography
              variant="title"
              className={classes.price}
              color="inherit"
            >
              <Icon
                {...resources.gold}
                label={resources[resourceKey].price[priceRange]}
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
      </div>
    );
  }
}

MarketSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

// @ts-ignore
export default withRoot(withStyles(styles)(MarketSheet));
