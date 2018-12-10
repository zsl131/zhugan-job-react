import request from '../../../../utils/request';

const serviceName = "resumeService";
function list(query) {
  return request(serviceName+".list", JSON.stringify(query), true);
}

function updateType(obj) {
  return request(serviceName+".modifyField", JSON.stringify(obj), true);
}

function verify(obj) {
  return request(serviceName+".verify", obj, true);
}

export {
  list,
  updateType,
  verify,
}
