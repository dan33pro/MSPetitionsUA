const TABLA = {
    name: 'Imagenes',
    pk: 'id_imagen',
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
        const imagen = {
            detalle: body.detalle,
            imagen: body.imagen,
            id_noticia: body.id_noticia,
        };

        if (body.accion == 'insert' && (!imagen.detalle || !imagen.imagen || !imagen.id_noticia)) {
            return Promise.reject('No se indico la información necesaria');
        } else if(body.accion == 'update' && body.id_imagen) {
            imagen.id_imagen = body.id_imagen;
        }

        const response = await store.upsert(TABLA, imagen, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id de la imagen');
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