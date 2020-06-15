/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} url
 * @returns {Object}
 */
// eslint-disable-next-line import/prefer-default-export
export const param2Obj = (url) => {
  // eslint-disable-next-line prefer-destructuring
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(`{"${
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ')
  }"}`)
}
