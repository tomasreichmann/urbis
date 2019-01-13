import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {
  return {
    root: {
      width: 8,
      height: 32,
      borderRadius: 2,
      border: 0,
      cursor: "pointer"
    },
    primary: {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.light
      }
    },
    primaryDark: {
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        backgroundColor: theme.palette.primary.main
      }
    },
    primaryLight: {
      backgroundColor: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: theme.palette.primary.main
      }
    },
    secondary: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.light
      }
    },
    secondaryLight: {
      backgroundColor: theme.palette.secondary.light,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main
      }
    },
    secondaryDark: {
      backgroundColor: theme.palette.secondary.dark,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main
      }
    }
  };
};

function Pip(props) {
  const { classes, className, children, color } = props;

  return (
    <button className={classnames(className, classes.root, classes[color])}>
      {children}
    </button>
  );
}

Pip.propTypes = {
  classes: PropTypes.object.isRequired
};
Pip.defaultProps = {
  color: "primary"
};

export default withStyles(styles)(Pip);
