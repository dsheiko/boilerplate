'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function( db ) {

  await db.createTable( "project", {
    id: { type: 'int', unsigned: true, primaryKey: true, autoIncrement: true },
    name: { type: "string", length: 128, notNull: true },
    env: { type: "string", length: 32, notNull: true  },
    createdAt: { type: "datetime", notNull: true }
  });

  return db.addIndex( "project", "name_inx", ["name"] );

};

exports.down = async function( db ) {
  await db.dropTable( "project" );
};

exports._meta = {
  "version": 1
};
