
// 向表中插入新的玩家
export const INSERT_PLAYER = `
  INSERT INTO
    player
  SET ?
`;

// 查询玩家信息
export const QUERY_PLAYER = `
  SELECT
    uid,
    name,
    x,
    y,
    dir,
    ges
  from
    player
  WHERE
    uid = ?
`;
