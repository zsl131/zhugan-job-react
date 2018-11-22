import request from '../../../../utils/request';

const serviceName = "accountService";
function list(query) {
  return request(serviceName+".list", JSON.stringify(query), true);
}

/**
 * 修改微信用户类型
 * @param obj 包含：id、type
 * @returns {Object}
 */
function updateType(obj) {
  return request(serviceName+".updateType", JSON.stringify(obj), true);
}

function onSynch(id) {
  return request(serviceName+".updateAccount", JSON.stringify(id), true);
}

export {
  list,
  updateType,
  onSynch,
}
