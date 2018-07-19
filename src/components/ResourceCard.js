import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Cost from './Cost';

const styles = theme => ({
  cost: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
  },
  heading: {
    textAlign: 'center',
    hyphens: 'auto',
  },
  cardContent: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing.unit,
  }
});

function ResourceCard(props) {
  const { classes, name, resource, className } = props;

  return (
    <CardContent className={classes.cardContent}>
      <div className={classes.cost}>
        <Cost cost={resource} iconSize={5}/>
      </div>
      <Typography gutterBottom variant="headline" component="h2" className={classes.heading}>
        {name}
      </Typography>
    </CardContent>
  );
}

ResourceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResourceCard);