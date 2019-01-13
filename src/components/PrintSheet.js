import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { range } from "lodash";
import Paper from "@material-ui/core/Paper";
import classnames from "classnames";

import { grey } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { paperSizes } from "../utils/paperSizes";
import { convertToUnit } from "../utils/helpers";

const styles = theme => ({
  page: {
    position: "relative",
    boxSizing: "content-box",
    display: "grid",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    pageBreakInside: "avoid",
    backgroundColor: "white",
    margin: "0 auto",
    "@media screen": {
      margin: `${theme.spacing.unit * 4}px auto`,
      boxShadow: theme.shadows[5],
      padding: "0 !important"
    },
    "@media print": {
      border: "0 !important",
      margin: 0
    }
  },
  item: {
    border: `1px solid ${grey[200]}`,
    boxSizing: "border-box",
    backgroundColor: "white"
  },
  summary: {
    textAlign: "center"
  },
  hidePrint: {
    "@media print": {
      display: "none"
    }
  },
  pageNumber: {
    position: "absolute",
    left: "50%",
    top: "100%",
    transform: "translate(-50%, 50%)",
    boxShadow: theme.shadows[1]
  }
});

class PrintSheetUnstyled extends React.Component {
  static defaultProps = {
    limits: {
      itemsPerPage: 1000,
      pages: 100
    },
    items: [],
    page: paperSizes.portrait.A4,
    item: paperSizes.portrait.smallCard,
    pageMargin: "10mm",
    itemMargin: "5mm"
  };

  render() {
    const { limits, items, classes } = this.props;
    const UNIT = "mm";
    const page = {
      width: convertToUnit(this.props.page.width, UNIT),
      height: convertToUnit(this.props.page.height, UNIT)
    };
    const item = {
      width: convertToUnit(this.props.item.width, UNIT),
      height: convertToUnit(this.props.item.height, UNIT)
    };
    const pageMargin = convertToUnit(this.props.pageMargin, UNIT);
    const itemMargin = convertToUnit(this.props.itemMargin, UNIT);

    const printablePage = {
      width: page.width - pageMargin * 2,
      height: page.height - pageMargin * 2
    };

    const itemsPerPageWith = Math.floor(printablePage.width / item.width);
    const itemsPerPageHeight = Math.floor(printablePage.height / item.height);
    const itemsPerPage = Math.min(
      itemsPerPageWith * itemsPerPageHeight,
      limits.itemsPerPage
    );

    const pageCount = Math.min(
      Math.ceil(items.length / itemsPerPage),
      limits.pages
    );

    return (
      <div className={classes.root}>
        <Typography
          gutterBottom
          component="p"
          variant="headline"
          className={classnames(classes.summary, classes.hidePrint)}
        >
          {itemsPerPage} items per page, {pageCount} pages in total
        </Typography>
        {range(pageCount).map(pageIndex => (
          <Paper
            key={pageIndex}
            elevation={0}
            className={classes.page}
            style={{
              width: printablePage.width + UNIT,
              height: printablePage.height + UNIT,
              border: `${pageMargin}${UNIT} solid ${grey[100]}`,
              gridTemplateColumns: `repeat(${itemsPerPageWith}, ${
                item.width
              }${UNIT})`
            }}
          >
            {range(
              Math.min(items.length - pageIndex * itemsPerPage, itemsPerPage)
            ).map(itemIndex => (
              <Paper
                key={itemIndex}
                elevation={0}
                className={classes.item}
                style={{
                  width: item.width + UNIT,
                  height: item.height + UNIT,
                  padding: itemMargin + UNIT
                }}
              >
                {items[pageIndex * itemsPerPage + itemIndex]}
              </Paper>
            ))}
            <Chip
              label={`${pageIndex + 1} / ${pageCount}`}
              className={classnames(classes.pageNumber, classes.hidePrint)}
            />
          </Paper>
        ))}
      </div>
    );
  }
}

export const PrintSheet = withStyles(styles)(PrintSheetUnstyled);
