const AbstractModel = require( "./AbstractModel" );

class ProjectModel extends AbstractModel {

  constructor( connector ) {
    super( connector );
    this.table = "project";
  }

  async add({ name, env }) {
    const data = { name, env, createdAt: new Date() };
    return await this.query( `REPLACE INTO \`${ this.table }\` SET ?`, data );
  }

  async update( id, { name, env }) {
    return await this.query( `UPDATE \`${ this.table }\` SET \`name\`=?, \`env\`=? WHERE \`id\`=?`,
      [ name, env, id ] );
  }

};

module.exports = ProjectModel;