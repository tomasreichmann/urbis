// @ts-check
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import { Typography } from "@material-ui/core";
import Resources from "./Resources";
import { richText } from "../utils/richText";

export const personDimensions = {
  width: "3.5cm",
  height: "5.5cm"
};

const styles = theme => {
  return {
    root: {
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      ...personDimensions,
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
    advantage: {
      margin: `${theme.spacing.unit / 2}px 0`,
      color: theme.palette.primary.dark
    },
    disadvantage: {
      margin: `${theme.spacing.unit / 2}px 0`,
      color: theme.palette.error.dark
    }
  };
};

function Person(props) {
  const {
    classes,
    className,
    children,
    name,
    image,
    cost,
    advantages = [],
    disadvantages = []
  } = props;

  const TextBlock =
    advantages.length + disadvantages.length > 0 ? (
      <Typography
        variant="body2"
        className={classes.text}
        color="inherit"
        component="div"
      >
        {advantages.map((advantage, advantageIndex) => (
          <div className={classes.advantage} key={advantageIndex}>
            {richText(advantage, { label: null })}
          </div>
        ))}
        {disadvantages.map((disadvantage, disadvantageIndex) => (
          <div className={classes.disadvantage} key={disadvantageIndex}>
            {richText(disadvantage, { label: null })}
          </div>
        ))}
      </Typography>
    ) : null;

  return (
    <div className={classnames(className, classes.root)}>
      <div className={classes.header}>
        <Typography variant="body2" className={classes.name} color="inherit">
          {name.split(" ")[0]}
        </Typography>
        <div className={classes.cost}>
          <Resources
            items={[{ resourceKey: "gold", amount: cost }]}
            typographyProps={{ color: "inherit", variant: "body2" }}
            iconProps={{ iconSize: 2 }}
          />
        </div>
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

Person.propTypes = {
  classes: PropTypes.object.isRequired
};
Person.defaultProps = {};

// @ts-ignore
export default withStyles(styles)(Person);
