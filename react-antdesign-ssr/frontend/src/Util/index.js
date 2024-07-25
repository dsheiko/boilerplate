import axios from "axios";

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


export function getConfig() {
  if ( typeof window !== "undefined" && "config" in window ) {
   return window.config;
  }
  return {
    DEMO_NODE_SERVER_HOST: process.env.DEMO_NODE_SERVER_HOST,
    DEMO_NODE_SERVER_PORT: process.env.DEMO_NODE_SERVER_PORT
  };
}

export function getAxiosClient() {
  const { DEMO_NODE_SERVER_HOST, DEMO_NODE_SERVER_PORT } = getConfig();
  return axios.create({
      baseURL: `//${ DEMO_NODE_SERVER_HOST }:${ DEMO_NODE_SERVER_PORT }/api/v1/`
  });
}