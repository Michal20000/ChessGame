const { compareSync } = require('bcrypt');

const CompareHash = (word, hash) => {
	const result = compareSync(word, hash);
  return result;

}

module.exports = CompareHash;
