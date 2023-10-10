import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "/artwork";

export async function initFindArtwork(match) {

    if(match?.params?.id) {
        const id = match.params.id
        document.querySelector("#tablerows").innerHTML = ""
        fetchAndRenderArtwork(id)
    }
    
}

const navigoRoute = "find-artwork"
async function getArtwork(event) {
    event.preventDefault()
    fetchAndRenderArtwork()
}
export async function fetchAndRenderArtwork(idFromURL) {
        
    
    const id = idFromURL ? idFromURL : document.querySelector("#id").value
        
   try {
    const artwork = await fetch (URL+"/"+id).then(res => res.json())
   
    const tableRows = `
    <tr>
    <td style="display:none">${artwork.artworkId}</td>
    <td>${artwork.title}</td>
    <td>${artwork.description}</td>
    <td>${artwork.category}</td>
    <td>${artwork.forSale}</td>
    <td>${artwork.image}</td>
    </tr>
    `;
    

    document.querySelector("#tablerows").innerHTML = sanitizeStringWithTableRows(tableRows)

    return artwork
   } catch (e) {
    console.log("Something fucked up. Good luck")
   }

}