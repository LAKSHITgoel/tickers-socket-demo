module.exports = {
  bracketSpacing: true,
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  bracketSpacing: false,
  bracketSameLine: false,
  arrowParens: 'avoid',
  trailingComma: 'all',
  arrowParens: 'avoid',
  importOrder: [
    'constants/(.*)$',
    'components/(.*)$',
    'hooks/(.*)$',
    'utils/(.*)$',
    'types/(.*)$',
    'store/(.*)$',
    'screens/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
