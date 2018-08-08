import React from 'react';
import PropTypes from 'prop-types';

import { range } from 'lodash';
import { paperSizes } from '../utils/paperSizes';
import { resources } from '../model/resources';
import ResourceCard from '../components/ResourceCard';
import { PrintSheet } from '../components/PrintSheet';

function Resources(props) {
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
    <PrintSheet
      page={paperSizes.portrait.A4}
      item={paperSizes.portrait.smallCard}
      pageMargin="8mm"
      itemMargin="0"
      items={resourceElements}
    />
  );
}

export default Resources;