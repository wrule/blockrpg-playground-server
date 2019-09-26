
export default class Rtv {
  private isSuccess: boolean = false;
  private object: any = null;
  private message: string = '';

  public constructor(
    isSuccess: boolean = false,
    object: any = null,
    message: string = '',
  ) {
    this.isSuccess = isSuccess;
    this.object = object;
    this.message = message;
  }

  public get IsSuccess(): boolean {
    return this.isSuccess;
  }

  public get Object(): any {
    return this.object;
  }

  public get Message(): string {
    return this.message;
  }

  public static Success(object: any = null, message: string = ''): Rtv {
    return new Rtv(true, object, message);
  }

  public static Fail(message: string = '', object: any = null): Rtv {
    return new Rtv(false, object, message);
  }
}