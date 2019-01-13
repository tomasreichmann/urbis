import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import resources from "../model/resources";
import { getPrice } from "../utils/price";
import Icon from "./icons/Icon";

const styles = theme => {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      width: 210
    },
    isBuying: {
      backgroundColor: theme.palette.primary.light
    },
    isConsuming: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.light
      }
    },
    isSelling: {
      backgroundColor: theme.palette.primary.dark
    },
    field: {
      marginTop: 0,
      flex: "0 0 50px"
    },
    button: {
      marginLeft: theme.spacing.unit,
      minWidth: 152
    }
  };
};

function ExchangeField(props) {
  const {
    classes,
    className,
    exchangeAmount,
    marketGoods,
    priceRanges,
    priceBlockSize,
    changeExchangeAmounts,
    exchange
  } = props;
  const isBuying = exchangeAmount > 0;
  const isSelling = exchangeAmount < 0;
  const cost = getPrice(
    marketGoods,
    exchangeAmount,
    priceRanges,
    priceBlockSize
  );
  const costIcon = <Icon {...resources.gold} label={cost} />;
  const buyArrow = isBuying ? <span>&ensp;➡</span> : null;
  const sellArrow = isSelling ? <span>⬅&ensp;</span> : null;
  const verb =
    (isSelling && <span>Receive&ensp;</span>) ||
    (isBuying && <span>Pay&ensp;</span>) ||
    null;
  return (
    <div className={classnames(classes.root, className)}>
      <TextField
        className={classes.field}
        value={exchangeAmount}
        max={marketGoods.amount}
        type="number"
        onChange={changeExchangeAmounts(
          marketGoods,
          priceRanges,
          priceBlockSize
        )}
        margin="normal"
      />
      <Button
        onClick={exchange(marketGoods.resource, priceRanges, priceBlockSize)}
        color={
          (isBuying && "primary") || (isSelling && "secondary") || "inherit"
        }
        variant={"raised"}
        disabled={!isBuying && !isSelling}
        className={classes.button}
      >
        {sellArrow}
        {verb}
        {costIcon}
        {buyArrow}
      </Button>
    </div>
  );
}

ExchangeField.propTypes = {
  classes: PropTypes.object.isRequired
};
ExchangeField.defaultProps = {};

export default withStyles(styles)(ExchangeField);
