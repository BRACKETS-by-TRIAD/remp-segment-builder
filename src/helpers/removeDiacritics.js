import removeAccents from 'remove-accents';

export function removeDiacritics(value) {
  return removeAccents(value);
}

export function removeDiacriticsFilter(item, queryText, itemText) {
  const hasValue = value => (value != null ? value : '');

  const optimizedSearchedString = removeDiacritics(
    hasValue(queryText)
      .toString()
      .toLowerCase()
  );
  const optimizedItemText = removeDiacritics(
    hasValue(itemText)
      .toString()
      .toLowerCase()
  );

  return optimizedItemText.includes(optimizedSearchedString);
}
