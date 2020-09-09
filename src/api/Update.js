import { Settings } from '@/config';

export default {
  /*
  *  CDN图片上传
  * */
  uploadCdn: `${Settings[APP_ENV].requestUrl}/common/upload?cdn=true`
}
