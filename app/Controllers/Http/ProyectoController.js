'use strict'

const Proyecto = use('App/Models/Proyecto')

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
        if (proyecto.user_id!==user.id){
            return response.status(403).json({
                mensaje: "Usted no es dueño de este proyecto"
            })
        }
        await proyecto.delete();
        return proyecto;
    }
}



module.exports = ProyectoController
