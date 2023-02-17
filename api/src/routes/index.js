require('dotenv').config();
const { Router } = require('express');
const {DB_KEY} = process.env;
const fetch = require('node-fetch')
const {Videogame, Generos} = require("../db")



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/videogames",async(req,res)=>{
    const{name} = req.query
    
    try {
        const respuesta = await fetch(`https://api.rawg.io/api/games?key=${DB_KEY}&page_size=1`)
        .then((response)=>response.json())
        const juegos = respuesta.results
        
        const respuesta2 = await fetch(`https://api.rawg.io/api/games?key=${DB_KEY}&page_size=40&page=2`)
        .then((response)=>response.json())
        const juegos2 = respuesta2.results
        
        const respuesta3 = await fetch(`https://api.rawg.io/api/games?key=${DB_KEY}&page_size=40&page=3`)
        .then((response)=>response.json())
        const juegos3 = respuesta3.results
        
        // const respuesta4 = await fetch(`https://api.rawg.io/api/games?key=${DB_KEY}&page_size=1&page=4`)
        // .then((response)=>response.json())
        // const juegos4 = respuesta4.results
        
        // const respuesta5 = await fetch(`https://api.rawg.io/api/games?key=${DB_KEY}&page_size=1&page=5`)
        // .then((response)=>response.json())
        // const juegos5 = respuesta5.results
        
        const respuestaBD = await Videogame.findAll({
            include: [{ model: Generos, attributes: ['nombre'],through: { attributes: [] } }]
        })

        const arrayRespuestaBD = respuestaBD.map((juego)=> ({
            id:juego.id,
            name: juego.name,
            date: juego.date,
            img: juego.background_image,
            genres:juego.Generos,
            platforms:juego.platforms,
            rating:juego.rating,
        }))
        const arrayJuegosBD = []
        respuestaBD.forEach((videogame) => arrayJuegosBD.push(videogame.dataValues));
        
        
        let arrayJuegos = [...juegos,...juegos2,...juegos3].map((objetos)=> ({
            id:objetos.id,
            name: objetos.name,
            date:objetos.released,
            img: objetos.background_image,
            genres:objetos.genres,
            platforms:objetos.platforms,
            rating:objetos.rating,

        }))

        let totalJuegos = arrayJuegos.concat(arrayRespuestaBD)

        // if(name){

        //     let resultados = []
        //     for(let i = 0;i<totalJuegos.length;i++){
        //         let nombre = name.split(" ").join("").toLowerCase()
        //         let busqueda = totalJuegos[i].name.split(" ").join("").toLowerCase()
        //         let contador = 0
        //         if(busqueda.includes(nombre)){
        //             resultados.push(totalJuegos[i])
        //             contador++
        //         }
        //         if(contador=== 15)break
        //     }

            
        //     res.status(200).send(resultados)
        // }

        res.status(200).send(totalJuegos)
        
        

    } catch (error) {
        res.status(400).send(error.message)
    }
})

// GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados

// Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
// [ ] Descripción
// [ ] Fecha de lanzamiento
// [ ] Rating
// [ ] Plataformas

router.get("/videogames/:id",async(req,res)=>{
    const {id} = req.params
    try {
        
        if (String(Number(id)) === "NaN"){
            const encontrar = await Videogame.findAll({
                where: {id:id},
                include: Generos
            })
            res.status(200).send(encontrar)
        }
        else{
            const busqueda = await fetch(`https://api.rawg.io/api/games/${id}?key=${DB_KEY}`)
            .then((response)=>response.json())
            const juego = {
                name: busqueda.name,
                img: busqueda.background_image,
                genres: busqueda.genres,
                description: busqueda.description,
                date: busqueda.released,
                rating: busqueda.rating,
                platforms: busqueda.parent_platforms
    
            }
    
            res.status(200).send(juego)
        }

    } catch (error) {
        res.status(400).send(error.message)
    }

})

router.get("/genres",async(req,res)=>{

    try {
        
        const busqueda = await fetch(`https://api.rawg.io/api/genres?key=${DB_KEY}`)
        .then((response)=>response.json())

        const arrayBusqueda = busqueda.results
        const generos = arrayBusqueda.map((elemento)=> ({nombre: elemento.name}))
        const generoBD = await Generos.bulkCreate(generos)

        res.status(200).send(generoBD)


    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/videogames",async (req,res)=>{
    const {name, description, date, rating, platforms, genre, background_image} = req.body
    
    try {
        
        const nuevoJuego = await Videogame.create({name, description, date, rating, platforms, background_image})
        
        const generoBD = await Generos.findAll({
            where:{
                nombre: genre
            },
            limit: genre.length,
        })
        nuevoJuego.addGeneros(generoBD)
        res.status(200).send(nuevoJuego.dataValues)

    } catch (error) {
        res.status(400).send(error.message)
    }
})



module.exports = router;
