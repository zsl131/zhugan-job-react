import request from '../../../../utils/request';

const serviceName = "personalService";
function list(query) {
  return request(serviceName+".list", JSON.stringify(query), true);
}

function updateType(obj) {
  return request(serviceName+".updateType", JSON.stringify(obj), true);
}

export {
  list,
  updateType,
}
