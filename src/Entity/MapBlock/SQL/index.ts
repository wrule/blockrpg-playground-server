
// 矩形查询block
export const QUERY_RECT = `
  SELECT
    x,
    y,
    resData
  FROM
    mapBlock
  WHERE
    x >= ? and
    x < ? and
    y >= ? and
    y < ? and
    mapId = ?
`;
