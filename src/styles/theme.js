const colors = {
  primary: '#1E77CF',
  grey100: '#F9F9F9',
  grey300: '#e0e0e0',
  grey500: '#4B4B4B',
  danger: '#E30022',
};

const base = {
  fontFamily: 'Poppins',
};

export const light = {
  ...colors,
  ...base,
  sidebarColor: colors.grey100,
  contentColor: 'white',
  separatorColor: '#ccc',
  linkColor: colors.grey500,
  linkColor__active: colors.primary,
  headerColor: colors.grey500,
  headingColor: colors.grey500,
  inputBackgroundColor: '#E0E0E0',
  tableHeadColor: colors.primary,
  popupHeadColor: colors.primary,
};
