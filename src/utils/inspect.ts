// 手机号（第1位：1；第2位：3～9；第3-11位：数字）
export function isPhone(par: string): boolean {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(par);
}
// 固话
export function isTel(par: string): boolean {
  const reg = /(^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;
  return reg.test(par);
}
// 邮箱
export function isEmail(par: string): boolean {
  const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
  return reg.test(par);
}
// url
export function isUrl(par: string): boolean {
  const reg = new RegExp('^((https|http|ftp|rtsp|mms|ws)?://)');
  return reg.test(par);
}
// 数字（可小数，可负数，不可以 0 开头）
export function isNumber(par: string): boolean {
  const reg = /^-?[0-9]+(.[0-9]+)?$/;
  return reg.test(par);
}
// 正整数
export function isInt(par: string): boolean {
  const reg = /^[1-9]\d*$/;
  return reg.test(par);
}
// 颜色格式
export function isColor(color: string) {
  color = color.replace(/\s/g, ''); // 去掉空格
  const reg1 = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
  const reg2 =
    /^[rR][gG][Bb][\(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[\)]{1}$/;
  const reg3 =
    /^[rR][gG][Bb][Aa][\(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){3}[\\s]*(1|1.0|0|0.[0-9])[\\s]*[\)]{1}$/;
  const reg4 =
    /^[hH][Ss][Ll][\(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*)[\)]$/;
  const reg5 =
    /^[hH][Ss][Ll][Aa][\(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,){2}([\\s]*(1|1.0|0|0.[0-9])[\\s]*)[\)]$/;

  return reg1.test(color) || reg2.test(color) || reg3.test(color) || reg4.test(color) || reg5.test(color);
}
export const inspect = {
  isPhone,
  isTel,
  isEmail,
  isUrl,
  isNumber,
  isInt,
  isColor
};
