// @ts-check
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import chunk from "lodash/chunk";

import withRoot from "../src/withRoot";
import Navigation from "../src/components/Navigation";
import { pageStyles } from "../src/utils/styles";
import PrintPage from "../src/components/PrintPage";
import Person, { personDimensions } from "../src/components/Person";
import { itemsPerPage } from "../src/utils/helpers";
import { paperSizes } from "../src/utils/paperSizes";

// @ts-ignore
const people = require("../src/model/people.json");

const styles = theme => ({
  ...pageStyles(theme),
  peopleList: {
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

class PeopleSheet extends React.Component {
  render() {
    const { classes } = this.props;
    const peopleList = Object.keys(people).map(personKey => people[personKey]);
    return (
      <div className={classes.root}>
        <Navigation />
        {chunk(
          peopleList,
          itemsPerPage({ item: personDimensions, page: paperSizes.portrait.A4 })
        ).map((peopleGroup, pageIndex) => {
          return (
            <PrintPage key={pageIndex}>
              <div className={classes.peopleList}>
                {peopleGroup.map(person => {
                  return <Person {...person} />;
                })}
              </div>
            </PrintPage>
          );
        })}
      </div>
    );
  }
}

PeopleSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(PeopleSheet));
