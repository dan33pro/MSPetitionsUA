const TABLA = {
    name: 'Respuestas',
    pk: 'id_respuesta',
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
        const ruta = {
            id_peticion: body.id_peticion,
            titulo: body.titulo,
            respuesta: body.respuesta,
            cc_administrador: body.cc_administrador,
        };

        if (body.accion == 'insert' && (!ruta.id_peticion || !ruta.titulo || !ruta.respuesta || !ruta.cc_administrador)) {
            return Promise.reject('No se indico la información necesaria');
        } else if(body.accion == 'update' && body.id_respuesta) {
            ruta.id_respuesta = body.id_respuesta;
        }

        const response = await store.upsert(TABLA, ruta, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id de la respuesta');
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