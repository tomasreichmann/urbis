// @ts-check
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import chunk from "lodash/chunk";

import withRoot from "../src/withRoot";
import Navigation from "../src/components/Navigation";
import { pageStyles } from "../src/utils/styles";
import PrintPage from "../src/components/PrintPage";
import BuildingCard from "../src/components/BuildingCard";
import { buildingList } from "../src/model/buildings";

const styles = theme => ({
  ...pageStyles(theme),
  buildingList: {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "repeat(2, auto)",
    justifyContent: "flex-start",
    marginBottom: "0.5cm"
  },
  priceRange: {
    textAlign: "center"
  },
  block: {
    width: "3.5cm",
    height: "3.5cm",
    border: `1mm solid ${theme.palette.secondary.main}`,
    marginBottom: "0.5mm",
    backgroundColor: `${theme.palette.secondary.light}`,
    opacity: 0.25
  },
  label: {
    textAlign: "right"
  }
});

class BuildingSheet extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Navigation />
        {chunk(buildingList, 10).map((buildingGroup, pageIndex) => {
          return (
            <PrintPage key={pageIndex}>
              <div className={classes.buildingList}>
                {buildingGroup.map(building => {
                  return (
                    <BuildingCard key={building.buildingKey} {...building} />
                  );
                })}
              </div>
            </PrintPage>
          );
        })}
      </div>
    );
  }
}

BuildingSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

// @ts-ignore
export default withRoot(withStyles(styles)(BuildingSheet));
