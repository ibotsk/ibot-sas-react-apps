function formatGenus(name, authors, { isAuthor = true } = {}) {
  const arr = [name];
  if (isAuthor) {
    arr.push(authors);
  }
  return arr.filter((e) => !!e).map((e) => e.trim()).join(' ');
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

function genusString(genus, isAuthor = true) {
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
