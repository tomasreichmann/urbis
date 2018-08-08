import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { range } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import withRoot from '../src/withRoot';
import Navigation from '../src/components/Navigation';
import { fieldMap } from '../src/model/fields';
import { PrintSheet } from '../src/components/PrintSheet';
import { paperSizes } from '../src/utils/paperSizes';
import { richText } from '../src/utils/richText';
import Icon from '../src/components/icons/Icon';
import IconCursed from '../src/components/icons/IconCursed';
import IconWet from '../src/components/icons/IconWet';
import { statuses } from '../src/model/statuses';

const styles = theme => ({
  page: {
    margin: theme.spacing.unit * 10,
    '@media print': {
      margin: 0,
    },
  },
  cardContent: {
    padding: theme.spacing.unit,
    ...paperSizes.landscape.card,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '&:last-child': {
      paddingBottom: theme.spacing.unit
    }
  },
  heading: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  feature: {
    marginBottom: theme.spacing.unit,
  },
});

class HelpersPage extends React.Component {
  render() {
    const { classes, className } = this.props;

    const fields = [
      fieldMap.divineChapel,
      fieldMap.everburningBrazier,
      fieldMap.glacier,
      fieldMap.lightningRod,
      fieldMap.pentagram,
      fieldMap.pond,
      fieldMap.quarry,
      fieldMap.wizardTower,
    ];

    const fieldBonusCards = fields.map(({name, features, icon}) => {
      const iconSize = 3;
      const heading = icon ? <Icon label={[<br key="br"/>, name]} iconSize={iconSize} hasCircle iconUri={`/static/${icon}.png`} /> : name;
      return (<CardContent className={classnames(classes.cardContent, className)}>
        <Typography gutterBottom variant="title" component="h2" className={classes.heading}>
          {heading}
        </Typography>
        {features.map((feature, featureIndex) => (
          <Typography gutterBottom className={classes.feature} key={featureIndex}>
            { richText(feature) }
          </Typography>
        ))}
      </CardContent>);
    });

    const statusCards = statuses.reduce((collection, {name, shortEffects}, statusIndex) => {
      return collection.concat(...range(4).map(countIndex => (
        <CardContent className={classnames(classes.cardContent, className)} key={statusIndex + '-' + countIndex}>
          <Typography gutterBottom variant="title" component="h2" className={classes.heading}>
            {richText(name, { iconSize: 2 })}
          </Typography>
          {shortEffects.map((effect, effectIndex) => (
            <Typography gutterBottom className={classes.feature} key={effectIndex}>
              {richText(effect)}
            </Typography>
          ))}
        </CardContent>
      )))
    }, [])

    const cards = [
      ...fieldBonusCards,
      ...statusCards,
    ];

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.page} >
          <PrintSheet
            page={paperSizes.portrait.A4}
            item={paperSizes.landscape.card}
            pageMargin="8mm"
            itemMargin="0"
            items={cards}
          />
        </div>
      </div>
    );
  }
}

HelpersPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(HelpersPage));
