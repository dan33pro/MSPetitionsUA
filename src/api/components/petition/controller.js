const TABLA = {
    name: 'Peticiones',
    pk: 'id_peticion',
};

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../tools/store/mysql');
    }
    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const peticion = {
            detalle: body.detalle,
            id_tipo_peticion: body.id_tipo_peticion,
            cc_ciudadano: body.cc_ciudadano,
        };

        if (body.accion == 'insert' && (!peticion.detalle || !peticion.id_tipo_peticion || !peticion.cc_ciudadano)) {
            return Promise.reject('No se indico la información necesaria');
        } else if(body.accion == 'update' && body.id_peticion) {
            peticion.id_peticion = body.id_peticion;
        }

        const response = await store.upsert(TABLA, peticion, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id de la peticion');
        }
        return store.remove(TABLA, id);
    }

    function findByquery(key, value) {
        let query = {};
        query[key] = value;
        return store.query(TABLA, query);
    }

    return {
        list,
        get,
        upsert,
        remove,
        findByquery,
    };
};