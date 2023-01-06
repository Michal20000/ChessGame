const { genSaltSync, hashSync } = require('bcrypt');

const GenerateHash = (word) => {
	const salt = genSaltSync(11);
  const hash = hashSync(word, salt);
  return hash;

}

module.exports = GenerateHash;
