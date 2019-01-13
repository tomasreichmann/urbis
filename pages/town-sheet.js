// @ts-check
import React from "react";
import PropTypes from "prop-types";
import { range } from "lodash";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import withRoot from "../src/withRoot";
import Navigation from "../src/components/Navigation";
import { pageStyles } from "../src/utils/styles";
import { paperSizes } from "../src/utils/paperSizes";
import ResourceIcon from "../src/components/icons/ResourceIcon";
import PrintPage from "../src/components/PrintPage";
import { PrintSheet } from "../src/components/PrintSheet";
import StaticIcon from "../src/components/icons/StaticIcon";
import {
  populationPerDemand,
  maxPopulation,
  resourceDemand,
  seasons
} from "../src/model/general";
// @ts-ignore
const resources = require("../src/model/resources");

const styles = theme => ({
  ...pageStyles(theme),
  populationTrack: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    justifyContent: "flex-start",
    gridGap: `0.5cm`,
    marginBottom: "0.5cm"
  },
  populationBlock: {
    display: "grid",
    // alignItems: "center",
    gridTemplateColumns: `repeat(${populationPerDemand}, 1fr)`,
    justifyContent: "flex-start",
    gridGap: `0.25cm`
  },
  demand: {
    display: "flex",
    gridColumn: "1 / -1",
    paddingBottom: "0.5mm",
    alignItems: "center"
  },
  demandBlockSecondHalf: {
    gridRow: 2
  },
  demandFill: {
    flex: 1,
    marginLeft: theme.spacing.unit,
    borderBottom: `1mm dotted ${theme.palette.secondary.light}`
  },
  population: {
    textAlign: "center"
  },
  populationSlot: {
    position: "relative",
    borderRadius: "50%",
    border: `1mm solid ${theme.palette.primary.main}`,
    "&:before": {
      content: '""',
      display: "block",
      paddingTop: "100%"
    }
  },
  populationCount: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  happinessTrack: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    justifyContent: "flex-start",
    gridGap: `0.5cm`,
    marginBottom: "0.5cm"
  },
  happiness: {
    textAlign: "center"
  },
  happinessSlot: {
    position: "relative",
    borderRadius: "50%",
    border: `1mm solid ${theme.palette.grey.light}`,
    "&:before": {
      content: '""',
      display: "block",
      paddingTop: "100%"
    }
  },
  happinessContent: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  priceRange: {
    textAlign: "center"
  },
  block: {
    height: "3.5cm",
    border: `1mm solid ${theme.palette.secondary.main}`,
    marginBottom: "0.5mm",
    backgroundColor: `${theme.palette.secondary.light}`,
    opacity: 0.25
  },
  label: {
    textAlign: "center"
  },
  calendarPage: {
    display: "grid"
  },
  calendar: {
    textAlign: "center",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  calendarSeason: {
    color: "white",
    padding: `${theme.spacing.unit / 2}px 0`
  },
  spring: {
    backgroundColor: "#D6CF36"
  },
  summer: {
    backgroundColor: "#8BAA43"
  },
  autumn: {
    backgroundColor: "#E89C3C"
  },
  winter: {
    backgroundColor: "#9A9997"
  },
  winterProduction: {
    whiteSpace: "nowrap",
    marginLeft: theme.spacing.unit
  },
  calendarDemand: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: theme.spacing.unit
  }
});

class TownSheet extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Navigation />
        <PrintPage>
          <div>
            <div className={classes.populationTrack}>
              {range(maxPopulation / populationPerDemand).map(
                populationBlockIndex => {
                  const demand = populationBlockIndex + 1;
                  return (
                    <div
                      className={classes.populationBlock}
                      key={populationBlockIndex}
                    >
                      <Typography
                        variant="body2"
                        color="inherit"
                        component="div"
                        className={classnames(
                          classes.demand,
                          populationBlockIndex >= 3 &&
                            classes.demandBlockSecondHalf
                        )}
                      >
                        {range(demand).map(demandIndex => (
                          <StaticIcon image="crate" key={demandIndex} />
                        ))}
                        <span className={classes.demandFill} />
                      </Typography>
                      {range(populationPerDemand).map(
                        populationPerDemandIndex => {
                          const population =
                            populationBlockIndex * populationPerDemand +
                            populationPerDemandIndex +
                            1;
                          return (
                            <div
                              className={classes.population}
                              key={population}
                            >
                              <div className={classes.populationSlot}>
                                <Typography
                                  variant="title"
                                  color="inherit"
                                  className={classes.populationCount}
                                >
                                  {population}
                                </Typography>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  );
                }
              )}
            </div>

            <div className={classes.happinessTrack}>
              {[
                "sad-3",
                "sad-2",
                "sad-1",
                "meh",
                "happy-1",
                "happy-2",
                "happy-3"
              ].map(happiness => {
                return (
                  <div className={classes.happiness} key={happiness}>
                    <div className={classes.happinessSlot}>
                      <Typography
                        color="secondary"
                        className={classes.happinessContent}
                      >
                        <StaticIcon image={happiness} iconSize={5} />
                        {happiness === "sad-3" && (
                          <StaticIcon image="family" iconSize={2} label="-1" />
                        )}
                        {happiness === "happy-3" && (
                          <StaticIcon image="family" iconSize={2} label="+1" />
                        )}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PrintPage>
        <PrintSheet
          itemMargin={0}
          pageMargin="8mm"
          item={paperSizes.portrait.smallCard}
          items={range(6 * seasons.length).map(seasonIndex => {
            const season = seasons[seasonIndex % seasons.length];
            const year = Math.floor(seasonIndex / seasons.length) + 1;
            return (
              <div className={classes.calendar}>
                <Typography
                  color="secondary"
                  variant="title"
                  className={classnames(
                    classes.calendarSeason,
                    classes[season]
                  )}
                >
                  {season}
                </Typography>
                <Typography color="secondary" variant="body2">
                  of year
                </Typography>
                <Typography
                  color="secondary"
                  className={classes.calendarYear}
                  variant="display2"
                >
                  {year}
                </Typography>
                <div className={classes.calendarDemand}>
                  {resourceDemand
                    .filter(
                      resourceDemandItem =>
                        resourceDemandItem.consumptionStartYear <= year
                    )
                    .map(resourceDemandItem => {
                      const count = resourceDemandItem.consumption[season];
                      return (
                        <span key={resourceDemandItem.resourceKey}>
                          &ensp;
                          {range(count).map(countIndex => (
                            <ResourceIcon
                              key={countIndex}
                              resourceKey={resourceDemandItem.resourceKey}
                              label={null}
                            />
                          ))}
                        </span>
                      );
                    })}
                  {season === "winter" && (
                    <span className={classes.winterProduction}>
                      <StaticIcon image="no" />
                      <ResourceIcon
                        resourceKey={resources.crops.resourceKey}
                        label={null}
                      />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        />
      </div>
    );
  }
}

TownSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

// @ts-ignore
export default withRoot(withStyles(styles)(TownSheet));
