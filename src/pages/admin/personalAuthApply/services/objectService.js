import request from '../../../../utils/request';

const serviceName = "personalAuthApplyService";
function list(query) {
  return request(serviceName+".list", JSON.stringify(query), true);
}

function verify(obj) {
  return request(serviceName+".verify", JSON.stringify(obj), true);
}

export {
  list,
  verify,
}
