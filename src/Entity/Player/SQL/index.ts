
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
    image,
    x,
    y,
    dir,
    ges
  FROM
    player
  WHERE
    uid = ?
`;

// 根据昵称查询玩家信息
export const QUERY_PLAYER_BYNAME = `
  SELECT
    uid
  FROM
    player
  WHERE
    name = ?
`;
