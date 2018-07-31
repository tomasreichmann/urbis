import IconFire from '../components/icons/IconFire';
import IconWater from '../components/icons/IconWater';
import IconLightning from '../components/icons/IconLightning';
import IconFrost from '../components/icons/IconFrost';
import IconRock from '../components/icons/IconRock';
import IconHex from '../components/icons/IconHex';

import IconWet from '../components/icons/IconWet';
import IconBurning from '../components/icons/IconBurning';
import IconFrozen from '../components/icons/IconFrozen';
import IconCursed from '../components/icons/IconCursed';
import IconLife from '../components/icons/IconLife';
import IconWound from '../components/icons/IconWound';

export const getIconProps = ([match, label]) => (label ? {label} : {});

export const ruleList = [
  {
    match: /burning[|]?(.*)?/,
    component: IconBurning,
    getProps: getIconProps
  },
  {
    match: /fire[|]?(.*)?/,
    component: IconFire,
    getProps: getIconProps
  },
  {
    match: /water[|]?(.*)?/,
    component: IconWater,
    getProps: getIconProps
  },
  {
    match: /lightning[|]?(.*)?/,
    component: IconLightning,
    getProps: getIconProps
  },
  {
    match: /frost[|]?(.*)?/,
    component: IconFrost,
    getProps: getIconProps
  },
  {
    match: /rock[|]?(.*)?/,
    component: IconRock,
    getProps: getIconProps
  },
  {
    match: /hex[|]?(.*)?/,
    component: IconHex,
    getProps: getIconProps
  },
  {
    match: /wet[|]?(.*)?/,
    component: IconWet,
    getProps: getIconProps
  },
  {
    match: /burning[|]?(.*)?/,
    component: IconBurning,
    getProps: getIconProps
  },
  {
    match: /frozen[|]?(.*)?/,
    component: IconFrozen,
    getProps: getIconProps
  },
  {
    match: /cursed[|]?(.*)?/,
    component: IconCursed,
    getProps: getIconProps
  },
  {
    match: /life[|]?(.*)?/,
    component: IconLife,
    getProps: getIconProps
  },
  {
    match: /wound[|]?(.*)?/,
    component: IconWound,
    getProps: getIconProps
  },
]

export const getMatch = (expression, extraProps) => {
  for (let ruleIndex = 0; ruleIndex < ruleList.length; ruleIndex++) {
    const rule = ruleList[ruleIndex];
    const match = expression.match(rule.match);
    const Element = rule.component;
    if (match) {
      return <Element {...rule.getProps(match)} {...extraProps}/>;
    }
  }
  return null;
}

export const richText = (text, extraProps) => {
  const output = [];
  const matches = text.split(/\[([^\]]*)\]/);
  matches.forEach( (match, matchIndex) => {
    output.push(matchIndex % 2 === 1 && getMatch(match, extraProps) || match );
  })
  return <span>{output.map((outputItem, outputIndex) => <span key={outputIndex}>{outputItem}</span>)}</span>;
};