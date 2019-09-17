export default class Rsp {
  public static Success(
    ctx: any,
    object: any = undefined,
    message: string = undefined,
    extParams: any = undefined,
  ): void {
    const result = {
      code: 200,
      success: true,
      object: object,
      message: message,
      extParams: extParams,
    };
    ctx.status = result.code;
    ctx.body = result;
  }

  public static Error(
    ctx: any,
    code: number = 500
  ): void {
    ctx.status = code;
  }
}