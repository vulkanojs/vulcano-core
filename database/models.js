/**
 * Models
 */

// Include all app models
const AllModels = require('include-all')({
  dirname: `${APP_PATH}/models`,
  filter: /(.+)\.js$/,
  excludeDirs: /^\.(git|svn)$/,
  optional: true
});

const scaffold = require('./scaffold');

const Callbacks = {

  beforeSave: (next) => {
    next();
  },

  beforeUpdate: (next) => {
    next();
  },

  beforeRemove: (next) => {
    next();
  },

  beforeValidate: (next) => {
    next();
  },

  afterSave: () => {

  },

  afterUpdate: () => {

  },

  afterRemove: () => {

  },

  afterValidate: () => {

  },

  beforeFindOneAndUpdate: (next) => {
    next();
  }

};

module.exports = function loadModelsApplication() {

  const models = {};

  Object.keys(AllModels).forEach((i) => {

    const Current = AllModels[i];

    const getAll = `getAll${i}`;
    const getModelName = `get${i}`;

    const custom = {

      [getAll](props) {
        return global[i].getAll(props);
      },

      [getModelName](id) {
        return global[i].getByField(id);
      }

    };

    models[i] = {
      ...Callbacks,
      ...scaffold,
      ...custom,
      ...Current
    };

  });

  return models;

};
