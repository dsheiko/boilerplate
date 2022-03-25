/**
 * Generate { FOO: "FOO", BAR: "BAR" } from [ "FOO", "BAR" ]
 * @param {Array} list
 * @returns {Object}
 */
export function createConstants( list ) {
  return list.reduce(( carry, item ) => {
    carry[ item ] = item;
    return carry;
  }, {});
}