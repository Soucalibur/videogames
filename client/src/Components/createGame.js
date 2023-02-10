import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postGame, getGenres } from "../redux/actions"

const Validate = (input)=>{
    let errors = {}
    let regexURL = /((http|ftp|https):)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:~+#-]*[\w@?^=%&amp;~+#-])?/;

    if(!input.name){
        errors.name = "Introduce a name"
    }
    else if(!input.description){
        errors.description = "Introduce a description"
    }
    else if(input.rating < 0.1 || input.rating > 5 || !input.rating){
        errors.rating = "Introduce a rating between 1-5"
    }
    else if(!input.platforms){
        errors.platforms = "Introduce at least one platform"
    }
    else if(!input.background_image){
        errors.background_image = "Introduce an image"
    }
    else if(!regexURL.test(input.background_image)){
        errors.background_image = "You have introduced an image unsupported" 
    }

    const boton = document.getElementById("sendButton")

    if(!Object.entries(errors).length){
        boton.disabled = false
    }else{
        boton.disabled = true
    }


    return errors
}


const CreateGame = ()=>{

    const dispatch = useDispatch()
    const history = useHistory()
    const generos = useSelector((state)=>state.genres)

    useEffect(()=>{
        dispatch(getGenres())
    },[])


    const [input, setInput]= useState({
        name: "",
        description:"" ,
        date: "",
        rating: "",
        platforms:[],
        genre: [],
        background_image: ""
    })
    const [error, setError] = useState()

    const introducirDatos = (event)=>{

        const value = event.target.value
        const nombre = event.target.name
        setInput({...input,[nombre]:value})
        setError(Validate({...input,[nombre]:value}))
    }
    console.log(error)

    const sendData = async (event)=>{
        event.preventDefault();
        try {
            await dispatch(postGame(input))
            history.push("/gamecreated")
        } catch (error) {
            alert(error)
        }

    }

    // Cloudinary ////////////////////////////////////////////////////////
    const [loading, setLoading] = useState(false)

	const uploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'LatamCom');
		setLoading(true);
		const res = await fetch(
			'https://api.cloudinary.com/v1_1/drruxw6zi/image/upload',
			{
				method: 'POST',
				body: data,
			},
		);
		const file = await res.json();
		setInput({ ...input, background_image: file.secure_url });
		setLoading(false);
		setError(Validate({ ...input, background_image: file.secure_url }));
	};

	///////////////////////////////////////////////////////////////////////

    const introduceData = (event)=>{
        event.preventDefault()
        const {name, value} = event.target

        if(!input[name].includes(value) && value !== ""){
            setInput({...input, [name]:[...input[name], value]})
            setError(Validate({...input, [name]: value}))
        }

        
    }
    console.log(input)

    const deleteData = (event)=>{
        event.preventDefault()
        const {value, name} = event.target
        const objectDelete = input[name].filter((plataforma)=> plataforma !== value)
        setInput({...input, [name]: objectDelete })
        setError(Validate({...input, [name]: objectDelete}))
    }
    
    return(
        <div>
            <p>CREAR JUEGO</p>

            <div>
                <form onSubmit={sendData}>

                    <div>
                        <label>Nombre</label>
                        <input name="name" value={input.name} onChange={introducirDatos}></input>
                        {error? <p>{error.name}</p> :""}
                    </div>

                    <div>
                        <label>description</label>
                        <input name="description" value={input.description} onChange={introducirDatos}></input>
                        {error? <p>{error.description}</p> :""}
                    </div>

                    <div>
                        <label>date</label>
                        <input name="date" value={input.date} onChange={introducirDatos}></input>
                        {error? <p>{error.date}</p> :""}
                    </div>

                    <div>
                        <label>rating</label>
                        <input name="rating" value={input.rating} onChange={introducirDatos} type="number" min="1" max="5" placeholder="1-5"></input>
                        {error? <p>{error.rating}</p> :""}
                    </div>

                    <div>
                        
                        <label>platforms</label>
                        <select name="platforms" onChange={introduceData}>
                            <option value="">Chose your platforms</option>
                            <option  value="PC" >PC</option>
                            <option  value="X-Box" >X-Box</option>
                            <option  value="PlayStation" >PlayStation</option>
                        </select>
                       
                        {input.platforms.map((plataforma)=>{
                            return(
                                <div>
                                    <button name="platforms" value={plataforma} onClick={deleteData}>X</button>
                                    <p>{plataforma}</p>
                                </div>
                                
                                )
                            })}
                            {error? <p>{error.platforms}</p> :""}
                    </div>

                    <div>
                        
                        <select name="genre" onChange={introduceData}>
                            <option name="genre" value= "">Chose your genres...</option>
                            {generos.map((g)=>{
                                return(
                                    
                                    <option value={g.nombre}> {g.nombre}</option>
                                    
                                )
                            }).sort(((a,b)=>{
                                if(a.nombre > b.nombre){
                                    return -1
                                }
                                else{
                                    return 1
                                }
                            }))}
                        </select>

                        {input.genre.map((genres)=>{
                            return(
                                <div>
                                    <button name="genre" value={genres} onClick={deleteData}>X</button>
                                    <p>{genres}</p>
                                </div>
                                
                                )
                            })}
                        {error? <p>{error.genre}</p> :""}
        
                    </div>

                    <div>
                        <label>background_image</label>
                        <input 
                            name="background_image" 
                            onChange={uploadImage}
                            accept='image/*'
							type='file'
                            />
                        {loading? <p>Uploading image...</p> : (
                            <div>
                                <img src={input.background_image} alt="" style={{width: "300px"}}></img>
                            </div>
                            
                        )}
                        {error? <p>{error.background_image}</p> :""}

                    </div>

                    <div>
                        <input
                            value = "Create Videogame"
                            type = "submit"
                            id = "sendButton"
                            disabled
                        />
                    </div>
                </form>


            </div>
        </div>
    )
}

export default CreateGame