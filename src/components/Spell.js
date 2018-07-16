import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { richText } from '../utils/richText';
import Cost from './Cost';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  cost: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

function Spell(props) {
  const { classes, cost, target, name, description } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.cost}>
            <Cost cost={cost} iconSize={8}/>
          </div>
          <Typography gutterBottom variant="headline" component="h2">
            {name}
          </Typography>
          <Typography gutterBottom >
            {richText(description)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

Spell.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spell);