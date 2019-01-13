// @ts-check
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import chunk from "lodash/chunk";

import withRoot from "../src/withRoot";
import Navigation from "../src/components/Navigation";
import { pageStyles } from "../src/utils/styles";
import PrintPage from "../src/components/PrintPage";
import Expedition, { expeditionDimensions } from "../src/components/Expedition";
import { itemsPerPage } from "../src/utils/helpers";
import { paperSizes } from "../src/utils/paperSizes";

// @ts-ignore
const expeditions = require("../src/model/expeditions.json");

const styles = theme => ({
  ...pageStyles(theme),
  expeditionList: {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: `repeat(auto-fill, ${expeditionDimensions.width})`,
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

class ExpeditionSheet extends React.Component {
  render() {
    const { classes } = this.props;
    const expeditionList = Object.keys(expeditions).map(
      expeditionKey => expeditions[expeditionKey]
    );
    return (
      <div className={classes.root}>
        <Navigation />
        {chunk(
          expeditionList,
          itemsPerPage({
            item: expeditionDimensions,
            page: paperSizes.portrait.A4
          })
        ).map((expeditionGroup, pageIndex) => {
          return (
            <PrintPage key={pageIndex}>
              <div className={classes.expeditionList}>
                {expeditionGroup.map(expedition => {
                  return <Expedition {...expedition} />;
                })}
              </div>
            </PrintPage>
          );
        })}
      </div>
    );
  }
}

ExpeditionSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(ExpeditionSheet));
