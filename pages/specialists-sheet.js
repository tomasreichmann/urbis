// @ts-check
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import chunk from "lodash/chunk";

import withRoot from "../src/withRoot";
import Navigation from "../src/components/Navigation";
import { pageStyles } from "../src/utils/styles";
import PrintPage from "../src/components/PrintPage";
import Specialist from "../src/components/Specialist";

// @ts-ignore
const specialists = require("../src/model/specialists.json");

const styles = theme => ({
  ...pageStyles(theme),
  buildingList: {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "repeat(5, auto)",
    justifyContent: "flex-start",
    // gridGap: `0.5cm`,
    marginBottom: "0.5cm"
  },
  block: {
    width: "3.5cm",
    height: "3.5cm",
    border: `1mm solid ${theme.palette.secondary.main}`,
    marginBottom: "0.5mm",
    backgroundColor: `${theme.palette.secondary.light}`,
    opacity: 0.25
  }
});

class SpecialistsSheet extends React.Component {
  render() {
    const { classes } = this.props;
    const specialistsList = Object.keys(specialists).map(
      specialistKey => specialists[specialistKey]
    );
    return (
      <div className={classes.root}>
        <Navigation />
        {chunk(specialistsList, 20).map((specialistsGroup, pageIndex) => {
          return (
            <PrintPage key={pageIndex}>
              <div className={classes.buildingList}>
                {specialistsGroup.map(specialist => {
                  return <Specialist {...specialist} />;
                })}
              </div>
            </PrintPage>
          );
        })}
      </div>
    );
  }
}

SpecialistsSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(SpecialistsSheet));
