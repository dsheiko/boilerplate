export async function getProjects( projectModel ) {
  const data = await projectModel.findAll({ 
            pageSize: 50,
            current: 1,
            sortField: "id",
            sortOrder: "DESC"
          }),
          rawRows = data.rows,
          total = data.total,
          rows = rawRows.map( item => ({
            ...item,
            key: item.id
          }) );
  return { rows, total, preloaded: true };
}