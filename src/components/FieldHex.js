import React from 'react';
import { Typography } from '@material-ui/core';
import Hex from './Hex';
import Icon from './icons/Icon';
import PaperMini from './PaperMini';

function FieldHex(props) {
  const {
    classes,
    className,
    icon,
    width,
    player,
    labelVariant = 'headline',
    iconSize = 7,
    name,
  ...fieldType
} = props;
  const labelElement = <Typography variant={labelVariant} style={{ color: 'white', marginTop: '1mm' }} >{name}</Typography>;
  const iconElement = icon ? <Icon label={labelElement} iconSize={iconSize} hasCircle iconUri={`/static/${icon}.png`} /> : labelElement;
  const playerElement = player ? (<div style={{
    width: player.width,
    height: player.width,
    display: 'inline-block',
    marginRight: '2mm',
  }}>
    <div style={{
      position: 'relative',
      top: `-${player.width}`,
    }}>
      <PaperMini {...player} print={false} />
    </div>
  </div>) : null;
  return (<Hex className={className} width={width} {...fieldType} hasInner >
    {playerElement}{iconElement}
  </Hex>);
}

export default FieldHex;