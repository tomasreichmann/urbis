import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import resources from "../../model/resources";

const ResourceIcon = props => {
  const { resourceKey, label, ...otherProps } = props;
  const resource = resources[resourceKey] || {};

  return (
    <Icon
      iconUri={resource.iconUri}
      label={label === undefined ? resource.label : label}
      {...otherProps}
    />
  );
};

ResourceIcon.propTypes = {
  resourceKey: PropTypes.string.isRequired,
  label: PropTypes.any
};

ResourceIcon.defaultProps = {
  resourceKey: "gold",
  label: undefined
};

export default ResourceIcon;
