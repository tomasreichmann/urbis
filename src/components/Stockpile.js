import React from "react";
import PropTypes from "prop-types";
import range from "lodash/range";
import hexToRgba from "hex-rgba";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ResourceIcon from "./icons/ResourceIcon";

export const stockpileDimensions = {
  width: "3cm",
  height: "3cm"
};

const styles = theme => {
  return {
    root: {
      position: "relative",
      ...stockpileDimensions,
      border: `1mm solid ${hexToRgba(theme.palette.secondary.main, 20)}`,
      backgroundColor: `${hexToRgba(theme.palette.secondary.light, 20)}`
    },
    icon: {
      position: "absolute",
      left: 0,
      bottom: 0,
      padding: theme.spacing.unit,
      backgroundColor: `${hexToRgba(theme.palette.secondary.main, 20)}`
    }
  };
};

export class Stockpile extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };
  static defaultProps = {};

  render() {
    const { classes, resourceProps, rootProps } = this.props;

    return (
      <div className={classes.root} {...rootProps}>
        <div className={classes.icon}>
          <ResourceIcon label={null} {...resourceProps} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Stockpile);
