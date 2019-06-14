const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina : 'Nueva Vacante',
        tagline : 'Llena el formulario y publica tu vacante'
    })
}

exports.agregarVacante = async (req, res) => {
    //agregar datos a la BD
    const vacante = new Vacante(req.body);

    //crear arreglo de habilidades (skills)
    vacante.skills = req.body.skills.split(',');

    //almacenarlo en la base de datos
    const nuevaVacante = await vacante.save();

    //redireccionar
    res.redirect(`/vacantes/${nuevaVacante.url}`)
}
//muestra una vacante
exports.mostrarVacantes = async (req, res, next) => {
    const vacante = Vacante.findOne({url : req.params.url});

    //si no hay vacantes
    if(!vacante) return next();

    res.render('vacante', {
        vacante,
        nombrePagina: vacante.titulo,
        barra: true
    })
}