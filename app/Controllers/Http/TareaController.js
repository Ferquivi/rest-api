'use strict'

const Proyecto = use ('App/Model/Proyecto');
const Tarea = use ('App/Model/Tarea');
const AutorizacionService = use ('App/Services/AutorizacionService');



class TareaController {

    async index ({ auth, request, params}){
      const user = await auth.getUser();
      const { id } = params;
      const proyecto = await Proyecto.find(id);
      AutorizacionService.verificarPermiso(proyecto,user);
      return await proyecto.tareas().fetch();


    }



    async create ({ auth, request, params}){
    const user = await auth.getUser();
    const { descripcion } = request.all();
    const { id } = params;
    const proyecto = await Proyecto.find(id);
    AutorizacionService.verificarPermiso(proyecto,user);
    const tarea = new Tarea();
    tarea.fill({
     descripcion
     });
     await proyecto.tareas().save(tarea);
     return tarea;


    }
    async update({auth, response, params, request}){
       const user=await auth.getUser();
        const {id}=params;
        const tarea = await Proyecto.find(id);
        const proyecto = await tarea.proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user);
        tarea.merge(request.only(['descripcion','completada']))
        await tarea.save();
        return tarea;
    }

    async destroy({auth, response, params}){
        const user=await auth.getUser();
        const {id}=params;
        const tarea = await Proyecto.find(id);
        const proyecto = await tarea.proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user);
        await tarea.delete();
        return tarea;
    }


}

module.exports = TareaController