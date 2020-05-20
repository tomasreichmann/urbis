// @ts-check
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import partition from "lodash/partition";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import { Typography } from "@material-ui/core";
import { richText } from "../utils/richText";
import ResourceIcon from "./icons/ResourceIcon";

export const expeditionDimensions = {
  width: "9cm",
  height: "5cm"
};

const styles = theme => {
  return {
    root: {
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      ...expeditionDimensions,
      border: `1px solid ${grey[400]}`
    },
    header: {
      display: "flex",
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`
    },
    name: {
      flex: "1 1 auto"
    },
    image: {
      backgroundSize: "cover",
      backgroundPosition: "center top",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end"
    },
    text: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit}px ${theme
        .spacing.unit / 2}px ${theme.spacing.unit}px `,
      // backgroundColor: "rgba(255, 255, 255, 0.75)",
      background:
        "linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0.75) 25%,rgba(255,255,255,0.75) 100%)",
      fontSize: theme.typography.pxToRem(theme.spacing.unit * 1.5),
      lineHeight: theme.typography.pxToRem(theme.spacing.unit * 1.75)
    },
    market: {
      fontSize: theme.typography.pxToRem(theme.spacing.unit * 1.5),
      lineHeight: theme.typography.pxToRem(theme.spacing.unit * 1.75),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end"
    }
  };
};

function Expedition(props) {
  const {
    classes,
    className,
    children,
    name,
    type,
    image,
    threatChallenge,
    threatReward,
    threatDanger,
    market
  } = props;

  console.log("market", market);
  console.log("typeof market", typeof market);

  const marketParsed = market
    ? market.split(/\s?;\s?/).map(marketItem => {
        console.log("marketItem", marketItem);
        const [, action, amount, resourceKey, price] = marketItem.match(
          /(buy|sell)\s+([\d]*)x\s+\[(\w*)\]\s+for\s+([\S]+)\s+/
        );
        return {
          action,
          resourceKey,
          amount,
          price
        };
      })
    : [];

  console.log("marketParsed", marketParsed);

  const [buy = [], sell = []] = partition(
    marketParsed,
    ({ action }) => action === "buy"
  );

  console.log("buy", buy);
  console.log("sell", sell);

  const marketBlock =
    buy.length + sell.length ? (
      <Typography
        variant="body2"
        color="inherit"
        className={classes.market}
        key="market"
        component="div"
      >
        <div className={classes.marketbuy}>
          {buy.length ? <div>Buy</div> : null}
          {buy.map(({ amount, resourceKey, price }, marketItemIndex) => (
            <div key={marketItemIndex}>
              {amount}
              <ResourceIcon resourceKey={resourceKey} label={null} /> for{" "}
              {price} <ResourceIcon resourceKey="gold" label={null} />
            </div>
          ))}
        </div>
        <div>
          {sell.length ? <div>Sell</div> : null}
          {sell.map(({ amount, resourceKey, price }, marketItemIndex) => (
            <div key={marketItemIndex}>
              {amount}
              <ResourceIcon resourceKey={resourceKey} label={null} /> for{" "}
              {price} <ResourceIcon resourceKey="gold" label={null} />
            </div>
          ))}
        </div>
      </Typography>
    ) : null;

  const TextBlock = (
    <Typography
      variant="body2"
      className={classes.text}
      color="inherit"
      component="div"
    >
      {threatChallenge && (
        <div className={classes.threatChallenge} key="threatChallenge">
          if you {richText(threatChallenge, { label: null })}
        </div>
      )}
      {threatReward && (
        <div className={classes.threatReward} key="threatReward">
          {threatDanger && "then"} {richText(threatReward, { label: null })}
        </div>
      )}
      {threatDanger && (
        <div className={classes.threatDanger} key="threatDanger">
          otherwise {richText(threatDanger, { label: null })}
        </div>
      )}
      {marketBlock}
    </Typography>
  );

  return (
    <div className={classnames(className, classes.root, classes[type])}>
      <div className={classes.header}>
        <Typography variant="body2" className={classes.name} color="inherit">
          {name}
        </Typography>
      </div>
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${image})`
        }}
      >
        {TextBlock}
      </div>
      {children}
    </div>
  );
}

Expedition.propTypes = {
  classes: PropTypes.object.isRequired
};
Expedition.defaultProps = {};

// @ts-ignore
export default withStyles(styles)(Expedition);
