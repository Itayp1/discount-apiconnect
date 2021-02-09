const fs = require('fs');
const path = require('path');

const swPath = path.resolve(__dirname, '../npm-shrinkwrap.json');
const swOldPath = path.resolve(__dirname, '../npm-shrinkwrap-old.json');

function remOptDevDep(deps) {
  Object.keys(deps).forEach(dep => {
    if (
      deps[dep].hasOwnProperty('optional') ||
      deps[dep].hasOwnProperty('dev')
    ) {
      delete deps[dep];
    } else if (deps[dep].hasOwnProperty('dependencies')) {
      remOptDevDep(deps[dep].dependencies);
    }
  });
}

function removeProp(object, prop) {
  const singular = !Array.isArray(prop);

  Object.keys(object).forEach(dep => {
    if (singular) {
      delete object[dep][prop];
    } else {
      for (val of prop) {
        delete object[dep][val];
      }
    }
    if (object[dep].hasOwnProperty('dependencies')) {
      removeProp(object[dep].dependencies, prop);
    }
  });
}

try {
  const swRaw = fs.readFileSync(swPath);
  let swObj = JSON.parse(swRaw);

  remOptDevDep(swObj.dependencies);
  removeProp(swObj.dependencies, ['resolved', 'integrity']);

  fs.writeFileSync(swOldPath, swRaw);
  fs.writeFileSync(swPath, JSON.stringify(swObj, null, 2));

  console.log(
    '\x1b[32m%s\x1b[0m',
    `Removed optional and dev dependencies from shrinkwrap file.
Removed properties 'resolved' and 'integrity' from shrinkwrap file.`
  );
} catch (err) {
  console.log('\x1b[31m%s\x1b[0m', err.toString());
}
