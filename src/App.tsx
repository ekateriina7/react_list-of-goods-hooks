import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export enum SortFields {
  SORT_FIELD_ALPHABETE = 'Sort alphabetically',
  SORT_FIELD_LENGTH = 'Sort by length',
}

const prepareGoods = (goods: string[], sortField: string) => {
  const preparedGoods = [...goods];

  switch (sortField) {
    case sortFields.SORT_FIELD_ALPHABETE:
      return preparedGoods.sort((a, b) => a.localeCompare(b));
    case sortFields.SORT_FIELD_LENGTH:
      return preparedGoods.sort((a, b) => {
        const lengthDifference = a.length - b.length;

        if (lengthDifference === 0) {
          return a.localeCompare(b);
        }

        return lengthDifference;
      });
    default:
      return goods;
  }
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  let visibleGoods = prepareGoods(goodsFromServer, sortField);

  if (isReversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  const onSortChange = (field: string | ((prevState: string) => string)) => {
    setSortField(field);
  };

  const onToggleReverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== sortFields.SORT_FIELD_ALPHABETE,
          })}
          onClick={() => onSortChange(sortFields.SORT_FIELD_ALPHABETE)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== sortFields.SORT_FIELD_LENGTH,
          })}
          onClick={() => onSortChange(sortFields.SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={onToggleReverse}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
