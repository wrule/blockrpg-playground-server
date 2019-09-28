// 给定cookie字符串
export default function (cookieStr: string = '', key: string): string | undefined {
  const list = cookieStr
    .split(';')
    .map(text => text.split('='));
  return ((list.find(ary => ary[0] === key) || []) as string[])[1];
}
