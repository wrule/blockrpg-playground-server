import Dir from './Dir';

export default class Player {
  private uid: string = '';
  private name: string = '';
  private x: number = 0;
  private y: number = 0;
  private dir: Dir = Dir.DOWN;
  private ges: number = 0;
  public constructor(
    name: string = '',
    x: number = 0,
    y: number = 0,
    dir: Dir = Dir.DOWN,
    ges: number = 0,) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.ges = ges;
  }
  public set UID(uid: string) {
    this.uid = uid;
  }
}
