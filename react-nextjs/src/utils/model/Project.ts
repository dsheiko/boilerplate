import AbstractModel from "./AbstractModel";

export interface ProjectData {
  id: number,
  name: string,
  env: string,
  createdAt: string,
  key?: string
};

export default class ProjectModel extends AbstractModel {

  table = "project";

  async add({ name, env }: { name: string, env: string }) {
    return await this.query( `REPLACE INTO \`${ this.table }\` ` 
      + ` (\`name\`, \`env\`, \`createdAt\`) VALUES (?, ?, ?)`, [ name, env, String(new Date()) ] );
  }

  async update( id: number, { name, env }: { name: string, env: string }) {
    return await this.query( `UPDATE \`${ this.table }\` SET \`name\`=?, \`env\`=? WHERE \`id\`=?`,
      [ name, env, id ] );
  }

};
