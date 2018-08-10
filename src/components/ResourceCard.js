import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Cost from './Cost';
import Hex from './Hex';
import Grid from './Grid';
import IconWound from './icons/IconWound';

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
    '&:last-child': {
      paddingBottom: theme.spacing.unit,
    },
  }
});

const hexWidth = '5mm';
const fieldHexOptions = {
  width: hexWidth,
  insetMultiplier: 0.75,
  hasInner: true,
};
const EmptyField = <Hex width={hexWidth} />;
const TargetField = <Hex {...fieldHexOptions} color="grass"/>;
const CasterField = <Hex {...fieldHexOptions} color="fire"/>;
const SpreadField = <Hex {...fieldHexOptions} color="lightning"/>;

const GridPreset = ({board}) => <Grid hexGrid={board} hexWidth={hexWidth} inline /> || null;

const illustrationMap = {
  line: () => <div><GridPreset board={[[TargetField,TargetField,TargetField,]]} /></div>,
  cone: () => <div><GridPreset board={[
    [EmptyField,TargetField,],
    [TargetField,TargetField,],
    [CasterField,TargetField,TargetField],
  ]} /></div>,
  circle: () => <div><GridPreset board={[
    [EmptyField,TargetField,TargetField],
    [TargetField,CasterField,TargetField],
    [EmptyField,TargetField,TargetField],
  ]} /></div>,
  all: () => <div><GridPreset board={[
    [CasterField,TargetField,TargetField],
    [TargetField,TargetField,TargetField],
    [TargetField,TargetField,TargetField],
  ]} /></div>,
  spread: () => <div><GridPreset board={[
    [EmptyField,SpreadField,SpreadField],
    [SpreadField,TargetField,SpreadField],
    [EmptyField,SpreadField,SpreadField],
  ]} /></div>,
  jump: () => <div><GridPreset board={[[CasterField,SpreadField,TargetField,SpreadField,TargetField]]} /></div>,
  range: () => <div><GridPreset board={[[CasterField,SpreadField,TargetField,]]} /></div>,
  damage: () => <div><IconWound label={null} iconSize={5}/></div>,
  exclude: () => <div><GridPreset board={[
    [TargetField,TargetField,TargetField],
    [TargetField,EmptyField,TargetField],
    [TargetField,TargetField,TargetField],
  ]} /></div>,
};

function ResourceCard(props) {
  const { classes, name, resource, className, illustration } = props;

  const Illustration = illustration
    ? (illustrationMap[illustration] || (() => <div>Unknown illustration {illustration}</div>))
    : null;

  return (
    <CardContent className={classnames(classes.cardContent, className)}>
      <div className={classes.cost}>
        { resource ? <Cost cost={resource} iconSize={5} key="resources" /> : null }
        { illustration ? <Illustration key="illustration" /> : null }
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