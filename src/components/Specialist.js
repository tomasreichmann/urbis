// @ts-check
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import { Typography } from "@material-ui/core";
import { parseResources } from "../utils/resources";
import Resources from "./Resources";

const styles = theme => {
  return {
    root: {
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      width: "3.5cm",
      height: "6cm",
      border: `1px solid ${grey[400]}`
    },
    header: {
      display: "flex",
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`
    },
    name: {
      flex: "1 1 auto"
    },
    cost: {},
    vocation: {
      textAlign: "center",
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`
    },
    image: {
      backgroundSize: "contain",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat"
    }
  };
};

function SpecialistCard(props) {
  const { classes, className, children, name, cost, vocation, image } = props;

  const parsedCost = parseResources(cost);

  console.log("props", props);

  return (
    <div className={classnames(className, classes.root)}>
      <div className={classes.header}>
        <Typography variant="body2" className={classes.name} color="inherit">
          {name.split(" ")[0]}
        </Typography>
        <div className={classes.cost}>
          <Resources
            items={parsedCost}
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
      />
      <Typography variant="body2" className={classes.vocation} color="inherit">
        {vocation}
      </Typography>
      {children}
    </div>
  );
}

SpecialistCard.propTypes = {
  classes: PropTypes.object.isRequired
};
SpecialistCard.defaultProps = {};

export default withStyles(styles)(SpecialistCard);
