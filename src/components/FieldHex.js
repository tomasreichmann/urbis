import React from 'react';
import { Typography } from '@material-ui/core';
import Hex from './Hex';
import Icon from './icons/Icon';

function FieldHex(props) {
  const {
    classes,
    className,
    icon,
    width,
    labelVariant = 'headline',
    iconSize = 7,
    name,
  ...fieldType
} = props;
  const labelElement = <Typography variant={labelVariant} style={{ color: 'white', marginTop: '1mm' }} >{name}</Typography>;
  const iconElement = icon ? <Icon label={labelElement} iconSize={iconSize} hasCircle iconUri={`/static/${icon}.png`} /> : labelElement;
  return (<Hex className={className} width={width} {...fieldType}>
    {iconElement}
  </Hex>);
}

export default FieldHex;