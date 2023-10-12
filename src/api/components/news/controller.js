const TABLA = {
    name: 'Noticias',
    pk: 'id_noticia',
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
        const noticia = {
            titulo: body.titulo,
            descripcion: body.descripcion,
            fecha_publicacion: body.fecha_publicacion,
            cc_administrador: body.cc_administrador,
        };

        if (body.accion == 'insert' && (!noticia.titulo || !noticia.descripcion || !noticia.fecha_publicacion || !noticia.cc_administrador)) {
            return Promise.reject('No se indico la información necesaria');
        } else if(body.accion == 'update' && body.id_noticia) {
            noticia.id_noticia = body.id_noticia;
        }

        const response = await store.upsert(TABLA, noticia, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id de la noticia');
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