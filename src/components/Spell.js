import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { richText } from '../utils/richText';
import Cost from './Cost';

function Spell(props) {
  const { cost, name, description, className } = props;

  return (
    <div className={className} style={{
      pageBreakInside: 'avoid'
    }}>
      <Typography gutterBottom variant="title" component="h2" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>{name}</span><Cost cost={cost} iconSize={4}/>
      </Typography>
      <Typography gutterBottom >
        {richText(description, {iconSize: 2})}
      </Typography>
    </div>
  );
}

export default Spell;