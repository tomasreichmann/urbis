import ResourceIcon from "../components/icons/ResourceIcon.js";
const resources = require("../model/resources.json");

export const normalizeNumber = nr => {
  const int = parseInt(nr);
  return isNaN(int) ? undefined : int;
};

export const getIconProps = ([_match, resourceKey]) => ({
  ...(resourceKey ? { resourceKey } : {})
});

export const resourceRules = Object.keys(resources).map(resourceKey => {
  return {
    match: new RegExp(`(${resourceKey})`),
    component: ResourceIcon,
    getProps: getIconProps
  };
});
export const ruleList = [...resourceRules];

export const getMatch = (expression, extraProps) => {
  for (let ruleIndex = 0; ruleIndex < ruleList.length; ruleIndex++) {
    const rule = ruleList[ruleIndex];
    const match = expression.match(rule.match);
    const Element = rule.component;
    if (match) {
      return <Element {...rule.getProps(match)} {...extraProps} />;
    }
  }
  return null;
};

export const richText = (text, extraProps) => {
  const output = [];
  const matches = text.split(/\[([^\]]*)\]/);
  matches.forEach((match, matchIndex) => {
    output.push((matchIndex % 2 === 1 && getMatch(match, extraProps)) || match);
  });
  return (
    <span>
      {output.map((outputItem, outputIndex) => (
        <span key={outputIndex}>{outputItem}</span>
      ))}
    </span>
  );
};
