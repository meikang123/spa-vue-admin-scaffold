import { CONST_DATE_TIME_FORMATER } from '@framework/config/consts';
import { Transform } from '@framework/utils';
/*
* 时间格式化
*/
export const formatTime = time => {
  if (!time) {
    return '--';
  }
  if (time && (typeof time === 'string' || typeof time === 'number')) {
    time = new Date(time);
    return Transform.formatDate(time, CONST_DATE_TIME_FORMATER);
  } if (typeof time === 'object') {
    return Transform.formatDate(time, CONST_DATE_TIME_FORMATER);
  }
};

/**
 * @description 缺省值处理
 * @param {*} value
 */
export const defaultValue = value => {
  if (!value) {
    return '--';
  }
  return value;
};

/**
 * @description enum type
 *
 */
export const formatEnum = (value, Enum) => {
  if (!value) {
    return '--';
  }
  return Enum.getTextFromValue(value);
};

export const sizeFormat = size => {
  const num = size / 10;
  if (/\./.test(num)) {
    return num.toFixed(1);
  }
  return num;
};

export const abc = {};
