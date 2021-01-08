function timestampMysql() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

function timestampISO() {
  return new Date().toISOString();
}

export default {
  timestampMysql,
  timestampISO,
}