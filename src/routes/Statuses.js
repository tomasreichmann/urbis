import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { statuses } from '../model/statuses';
import { richText } from '../utils/richText';
import { paperSizes } from '../utils/paperSizes';

const styles = theme => ({
  main: {
    ...paperSizes.portrait.A5,
    '@media print': {
      margin: 0,
      boxShadow: 'none',
    },
  },
  mainContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: -1/2 * theme.spacing.unit,
    marginRight: -1/2 * theme.spacing.unit,
  },
  listItem: {
    padding: theme.spacing.unit * 1,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: (100 / 2) + '%'
  }
});

function Statuses(props) {
  const { classes } = props;
  return (
    <Card className={classes.main}>
      <CardContent className={classes.mainContent}>
        <div className={classes.list}>
          {statuses.map(({name, effects}, index) => (<div key={index} className={classes.listItem}>
            <Typography gutterBottom variant="title" component="h2">
              {richText(name, {iconSize: 3})}
            </Typography>

            <Typography variant="subheading" gutterBottom>Effects</Typography>
            {effects.map((effect, effectIndex) => (<Typography key={effectIndex} gutterBottom >
              {richText(effect)}
            </Typography>) )}
          </div>))}
        </div>
      </CardContent>
    </Card>
  );
}

Statuses.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Statuses);