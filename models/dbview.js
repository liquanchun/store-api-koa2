const knex = require('../libraries/knex');

exports.getDataList = viewname =>
  knex(viewname)
    .where('IsValid', 1)
    .select(`${viewname}.*`);

exports.getDataListById = (viewname, keyname, keyvalue) =>
  knex(viewname)
    .where(keyname, keyvalue)
    .select(`${viewname}.*`);

exports.getDataListByWhere = (viewname, wherekey, wherevalue) => knex(viewname).whereRaw(wherekey, wherevalue);

exports.getDataListByWhereLimit = (viewname, wherekey, wherevalue) =>
  knex(viewname)
    .whereRaw(wherekey, wherevalue)
    .limit(10);

exports.getDataListByWhereDipan = (viewname, wherekey, wherevalue, vinno) =>
  knex(viewname)
    .where('19_新车信息_底盘号', 'like', `%${vinno}%`)
    .whereRaw(wherekey, wherevalue);

exports.getDataListByWhereVinno = (viewname, wherekey, wherevalue, vinno) =>
  knex(viewname)
    .where('Vinno', 'like', `%${vinno}%`)
    .whereRaw(wherekey, wherevalue);

exports.getDataListByWhereType = (viewname, wherekey, wherevalue, type) =>
  knex(viewname)
    .where('CarTypeCode', 'like', `%${type}%`)
    .whereRaw(wherekey, wherevalue);

exports.getDataListByWhereCustName = (viewname, wherekey, wherevalue, name) =>
  knex(viewname)
    .where('CustName', 'like', `%${name}%`)
    .whereRaw(wherekey, wherevalue);

exports.getDataById = (viewname, keyvalue) =>
  knex(viewname)
    .where('Id', keyvalue)
    .select(`${viewname}.*`);

exports.updateData = (viewname, data) =>
  knex(viewname)
    .returning('id')
    .where('Id', data.Id)
    .update(data);

exports.addData = (viewname, data) =>
  knex
    .returning('id')
    .insert([data], 'id')
    .into(viewname);

exports.addDataArr = (viewname, data) => knex.insert(data).into(viewname);

exports.deleteData = (viewname, id) =>
  knex(viewname)
    .where('Id', id)
    .update('IsValid', 0);

exports.delete2Data = (viewname, id) =>
  knex(viewname)
    .where('Id', id)
    .del();

exports.deletePartsData = (viewname, id) =>
  knex(viewname)
    .where('parts_combo_id', id)
    .del();

exports.deleteser = (viewname, id) =>
  knex(viewname)
    .where('OrderId', id)
    .del();

exports.firstData = (viewname, id) =>
  knex(viewname)
    .where('Id', id)
    .first();

exports.dataCount = tablename => knex(tablename).count('id as a');

exports.maxid = tablename => knex(tablename).max('id as a');

exports.callsp = (spname, paras) => knex.raw(`call ${spname}(?)`, paras).then(resp => resp);
