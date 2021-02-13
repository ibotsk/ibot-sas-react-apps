function formatGenus(name, authors) {
  return [name, authors].filter((e) => e).map((e) => e.trim()).join(' ');
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

function genusString(genus) {
  if (!genus) {
    return undefined;
  }
  const { name, authors } = genus;
  return formatGenus(name, authors);
}

export default {
  formatGenus,
  formatGeneraAcceptedNames,
  genusString,
};
