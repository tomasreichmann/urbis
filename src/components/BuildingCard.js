// @ts-check
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import { Typography } from "@material-ui/core";
import { parseResources } from "../utils/resources";
import Resources from "./Resources";
import MeepleIcon from "./icons/Meeple";

export const buildingDimensions = {
  width: "9cm",
  height: "5cm"
};

const styles = theme => {
  return {
    root: {
      display: "grid",
      gridGap: `${theme.spacing.unit}px`,
      gridTemplateColumns: "3cm 1fr",
      gridTemplateRows: "auto 1fr auto",
      ...buildingDimensions,
      borderRadius: 2,
      border: `1px solid ${grey[400]}`
    },
    header: {
      display: "flex",
      gridColumn: "1 / span 2",
      alignItems: "center",
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
      borderBottom: "1px solid rgba(0, 0, 0, 0.35)",
      backgroundColor: "rgba(255, 255, 255, 0.6)"
      // background:
      //   "linear-gradient(to bottom, rgba(255,255,255,0.65) 0%,rgba(255,255,255,0.65) 80%,rgba(255,255,255,0) 100%)"
    },
    label: {
      marginRight: theme.spacing.unit,
      flex: "1 1 auto"
    },
    capacity: {
      gridColumn: 1,
      gridRow: 3,
      textAlign: "center",
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
      marginLeft: theme.spacing.unit,
      borderRadius: "3px 3px 0 0",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      border: "1px solid rgba(0, 0, 0, 0.35)",
      borderBottom: 0
    },
    production: {
      gridColumn: 2,
      gridRow: "2 / span 2",
      display: "grid",
      gridGap: `${theme.spacing.unit}px`,
      gridTemplateColumns: "auto",
      gridTemplateRows: "auto",
      paddingBottom: theme.spacing.unit,
      justifyContent: "flex-end",
      alignContent: "flex-end",
      alignItems: "flex-end"
    },
    productionItem: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
      borderRadius: "3px 0 0 3px",
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      border: "1px solid rgba(0, 0, 0, 0.35)",
      borderRight: 0
    },
    effectBox: {
      gridColumn: "1 / span 2",
      gridRow: 2,
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`
    },
    effect: {
      display: "inline-block",
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      border: "1px solid rgba(0, 0, 0, 0.35)",
      fontStyle: "italic"
    },
    arrow: {
      color: theme.palette.primary.main
    }
  };
};

function BuildingCard(props) {
  const {
    classes,
    className,
    children,
    effect,
    label,
    price,
    capacity,
    capacityType,
    specialist,
    production,
    image
  } = props;

  const parsedCost = parseResources(price);

  console.log("props", props);
  console.log("production", production);

  return (
    <div
      className={classnames(className, classes.root)}
      style={{
        background: `center / cover no-repeat url(${image})`
      }}
    >
      <div className={classes.header}>
        <Typography variant="body2" className={classes.label} color="inherit">
          {label}
        </Typography>
        <div className={classes.resources}>
          <Resources
            items={parsedCost}
            typographyProps={{ color: "inherit", variant: "body2" }}
            iconProps={{ iconSize: 3 }}
          />
        </div>
      </div>
      {specialist || capacity ? (
        <Typography
          className={classes.capacity}
          color="inherit"
          component="div"
        >
          {specialist ? (
            <span>
              <MeepleIcon /> {specialist}
            </span>
          ) : null}
          {specialist && capacity ? <span> +&nbsp;</span> : null}
          {capacity ? (
            <span>
              {capacity}
              x&nbsp;
              {capacityType}
            </span>
          ) : null}
        </Typography>
      ) : null}
      {effect ? (
        <div className={classes.effectBox}>
          <Typography className={classes.effect} color="inherit">
            {effect}
          </Typography>
        </div>
      ) : null}
      {production.length > 0 ? (
        <div className={classes.production}>
          {production.map(productionItem => {
            console.log("productionItem", productionItem);
            const consumptionElement = productionItem.cost ? (
              <Resources
                items={parseResources(productionItem.cost)}
                typographyProps={{ color: "inherit", variant: "body2" }}
                iconProps={{ iconSize: 3 }}
              />
            ) : null;
            const productionElement = productionItem.production ? (
              <Resources
                items={parseResources(productionItem.production)}
                typographyProps={{ color: "inherit", variant: "body2" }}
                iconProps={{ iconSize: 3 }}
              />
            ) : null;
            return (
              <div className={classes.productionItem}>
                {consumptionElement}
                <span className={classes.arrow}>&ensp;➡&nbsp;</span>
                {productionElement}
              </div>
            );
          })}
        </div>
      ) : null}
      {children}
    </div>
  );
}

BuildingCard.propTypes = {
  classes: PropTypes.object.isRequired
};
BuildingCard.defaultProps = {
  color: "primary"
};

export default withStyles(styles)(BuildingCard);
