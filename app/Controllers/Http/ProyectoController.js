'use strict'

const Proyecto = use('App/Models/Proyecto')
const AutorizacionService = use ('App/Services/AutorizacionService');

class ProyectoController {
    async index({auth}){
        const user = await auth.getUser();
        return await user.proyectos().fetch();
    }

    async create({auth, request}){
        const user = await auth.getUser();
        const { nombre }=request.all();
        const proyecto = new proyecto();
        proyecto.nombre = nombre;
        proyecto.fill({
            nombre
        });
        await user.proyectos().save(proyecto);
        return proyecto;
    }

    async destroy({auth, response, params}){
        const user=await auth.getUser();
        const {id}=params;
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto, user);
        await proyecto.delete();
        return proyecto;
    }
}



module.exports = ProyectoController
