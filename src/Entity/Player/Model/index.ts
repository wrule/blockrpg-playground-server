import Dir from './Dir';

export default class Player {
  private uid: string = '';
  private name: string = '';
  private image: number = 0;
  private x: number = 0;
  private y: number = 0;
  private dir: Dir = Dir.DOWN;
  private ges: number = 0;
  public constructor(
    name: string = '',
    image: number = 0,
    x: number = 0,
    y: number = 0,
    dir: Dir = Dir.DOWN,
    ges: number = 0,) {
    this.name = name;
    this.image = image;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.ges = ges;
  }
  public set UID(uid: string) {
    this.uid = uid;
  }
  public get UID(): string {
    return this.uid;
  }
  public get Name(): string {
    return this.name;
  }
  public get Image(): number {
    return this.image;
  }
  public get X(): number {
    return this.x;
  }
  public get Y(): number {
    return this.y;
  }
  public get Dir(): number {
    return this.dir;
  }
  public get Ges(): number {
    return this.ges;
  }
}
