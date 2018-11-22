import request from '../../../../utils/request';

const serviceName = "workTypeService";
function list(query) {
  //console.log("list query :", query);
  return request(serviceName+".list", JSON.stringify(query), true);
}

function addOrUpdate(obj) {
  return request(serviceName+".addOrUpdate", JSON.stringify(obj), true);
}

function deleteObj(id) {
  return request(serviceName+".delete", JSON.stringify(id), true);
}

function loadOne(id) {
  return request(serviceName+".loadOne", JSON.stringify(id), true);
}


export {
  list,
  addOrUpdate,
  deleteObj,
  loadOne,
}
