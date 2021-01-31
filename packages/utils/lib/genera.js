function formatGenus(name, authors) {
  return [name, authors].filter((e) => e).join(' ');
};

function formatGeneraAcceptedNames(list) {
  if (!list || list.length === 0) {
    return [];
  }
  const namesArray = list.map(({ parent }) => (
    formatGenus(parent.name)
  ));
  if (namesArray.length > 1) {
    namesArray.sort();
  }
  return namesArray;
}

export default {
  formatGenus,
  formatGeneraAcceptedNames,
};
