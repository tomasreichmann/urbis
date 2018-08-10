import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { range } from 'lodash';

import withRoot from '../src/withRoot';
import Navigation from '../src/components/Navigation';

import { paperSizes } from '../src/utils/paperSizes';
import ResourceCard from '../src/components/ResourceCard';
import { PrintSheet } from '../src/components/PrintSheet';
import { resources } from '../src/model/resources-modal';

const styles = theme => ({
  page: {
    '@media screen': {
      padding: theme.spacing.unit * 10,
      boxShadow: theme.shadows[5],
    },
  },
});

class ResourcesPage extends React.Component {
  render() {
    const { classes } = this.props;

    const resourceElements = resources.reduce(
        (collection, {count, ...resource}, resourceIndex) => (
          collection.concat(
            range(count).map(
              countIndex => <ResourceCard key={resourceIndex + '-' + countIndex} {...resource} />
            )
          )
        ),
        []
      );

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.page} >
            <PrintSheet
              page={paperSizes.portrait.A4}
              item={paperSizes.portrait.smallCard}
              pageMargin="8mm"
              itemMargin="0"
              items={resourceElements}
            />
        </div>
      </div>
    );
  }
}

ResourcesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ResourcesPage));
