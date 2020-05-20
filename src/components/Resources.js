import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ResourceIcon from "./icons/ResourceIcon";

const styles = theme => {
  return {
    root: {
      display: "flex",
      margin: `0 ${-theme.spacing.unit / 2}px`
    },
    resource: {
      margin: `0 ${theme.spacing.unit / 2}px`
    }
  };
};

export class Resources extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    typographyProps: PropTypes.object,
    iconProps: PropTypes.object
  };
  static defaultProps = {
    typographyProps: {},
    iconProps: {}
  };

  render() {
    const { items, classes, typographyProps, iconProps } = this.props;
    return (
      <div className={classes.root}>
        {items.map(({ resourceKey, amount }) => (
          <Typography
            className={classes.resource}
            {...typographyProps}
            key={resourceKey}
          >
            <ResourceIcon
              resourceKey={resourceKey}
              label={amount}
              {...iconProps}
            />
          </Typography>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Resources);
