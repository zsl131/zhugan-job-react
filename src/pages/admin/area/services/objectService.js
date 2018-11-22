import request from '../../../../utils/request';

const serviceName = "areaService";
function list(query) {
  //console.log("list query :", query);
  return request(serviceName+".list", JSON.stringify(query), true);
}

function update(obj) {
  return request(serviceName+".update", JSON.stringify(obj), true);
}

function init(obj) {
  return request(serviceName+".init", obj, true);
}

function loadOne(id) {
  return request(serviceName+".loadOne", JSON.stringify(id), true);
}

export {
  list,
  update,
  init,
  loadOne,
}
