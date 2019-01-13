import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import range from "lodash/range";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Icon from "./icons/Icon";
import resources from "../model/resources";
import Pip from "./Pip";
import { piecesInRange } from "../utils/price";
import ExchangeField from "./ExchangeField";

const styles = theme => {
  return {
    root: {
      width: 8,
      height: 32,
      borderRadius: 2,
      border: 0,
      cursor: "pointer"
    },
    marketGoodsLabel: {
      whiteSpace: "nowrap",
      lineHeight: "36px",
      verticalAlign: "middle"
    },
    marketGoodsPriceValue: {
      lineHeight: "36px",
      minWidth: "35px",
      verticalAlign: "middle",
      marginRight: theme.spacing.unit,
      whiteSpace: "nowrap"
    },
    marketGoodsBlock: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center"
    },
    marketGoodsPiece: {
      minWidth: "auto",
      paddingLeft: theme.spacing.unit / 2,
      paddingRight: theme.spacing.unit / 2,
      flex: "0 1 auto",
      margin: 2
    }
  };
};

export class MarketItem extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };
  static defaultProps = {};

  render() {
    const {
      classes,
      resourceKey,
      marketGoods,
      priceRanges,
      priceBlockSize,
      exchangeAmount,
      changeExchangeAmounts,
      currentSeason,
      exchange,
      storage
    } = this.props;

    return [
      <Typography
        variant="title"
        className={classes.marketGoodsLabel}
        key={`${marketGoods.resource} label`}
      >
        <Icon {...resources[marketGoods.resource]} iconSize={3} />{" "}
        {marketGoods.amount}
      </Typography>,
      ...priceRanges.map((priceRange, priceRangeIndex) => (
        <div
          key={`${marketGoods.resource} range ${priceRange}`}
          className={classes.marketGoodsBlock}
        >
          <Typography className={classes.marketGoodsPriceValue}>
            <Icon {...resources.gold} label={marketGoods.price[priceRange]} />
          </Typography>
          {range(
            piecesInRange(
              priceRange,
              priceRanges,
              marketGoods,
              exchangeAmount,
              priceBlockSize
            )
          ).map(pieceIndex => {
            const count = priceRangeIndex * priceBlockSize + pieceIndex + 1;
            const pipProps = {
              key: count,
              className: classes.marketGoodsPiece,
              color: "primary"
              // onClick: changeExchangeAmounts
            };
            const isBuying =
              count <= marketGoods.amount &&
              count > marketGoods.amount - exchangeAmount;
            const isSelling =
              count > marketGoods.amount &&
              count <= marketGoods.amount - exchangeAmount;
            const isConsuming =
              count <= marketGoods.consumption[currentSeason] * priceBlockSize;
            if (isBuying) {
              pipProps.color = "primaryDark";
            }
            if (isSelling) {
              pipProps.color = "primaryLight";
            }
            if (isConsuming) {
              pipProps.color = "secondary";
              if (isBuying) {
                pipProps.color = "secondaryDark";
              }
              if (isSelling) {
                pipProps.color = "secondaryLight";
              }
            }
            return <Pip {...pipProps} />;
          })}
        </div>
      )),
      <div
        className={classes.marketGoodsExchange}
        key={`${marketGoods.resource} exchange`}
      >
        <ExchangeField
          exchangeAmount={exchangeAmount}
          marketGoods={marketGoods}
          priceRanges={priceRanges}
          priceBlockSize={priceBlockSize}
          changeExchangeAmounts={changeExchangeAmounts}
          exchange={exchange}
        />
      </div>,
      <div
        className={classes.marketGoodsExchange}
        key={`${marketGoods.resource} storage`}
      >
        {range(storage + (exchangeAmount > 0 ? exchangeAmount : 0)).map(
          storageItemIndex => {
            const pipProps = {
              key: storageItemIndex,
              className: classes.marketGoodsPiece,
              color: "primary"
            };
            if (exchangeAmount > 0 && storageItemIndex < exchangeAmount) {
              pipProps.color = "primaryLight";
            }
            if (exchangeAmount < 0 && storageItemIndex < -exchangeAmount) {
              pipProps.color = "primaryDark";
            }
            return <Pip {...pipProps} />;
          }
        )}
      </div>
    ];
  }
}

export default withStyles(styles)(MarketItem);
