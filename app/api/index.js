import axios from "axios"
const API_KEY="44410980-4210ae78ab8f64418d423364d"
const API_URL=`https://pixabay.com/api/videos/?key=${API_KEY}`

const formatUrl = (params)=>{
    let url = API_URL+"&per_page=25&safesearch=true&editors_choice=true"
    if(!params) return url
    let paramKeys = Object.keys(params)
    paramKeys.map(key=>{
        let value = key == 'q'? encodeURIComponent(params[key]) : params[key]
        url += `&${key}=${value}`;
    });
    console.log('final url: ',url)
    return url
}

export const getPictures = async (params)=>{
    try {
     const response =   await axios.get(formatUrl(params))
     let {data} = response
        return {success: true,data}
    } catch (error) {
        console.log(error)
    }
}