import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "/artwork";

export async function initFindArtwork(match) {

    document.querySelector("#tablerows").innerHTML = ""

    document.querySelector("#btn-id").addEventListener("click", getArtwork)

    if(match?.params?.id) {
        const id = match.params.id
        document.querySelector("#tablerows").innerHTML = ""
        fetchAndRenderArtwork(id)
    }
    
}

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
    <td><img class="art-image" id="image_${artwork.artworkId}" src="${artwork.image}"/></td>    <td>${artwork.title}</td>
    <td>${artwork.description}</td>
    <td>${artwork.category}</td>
    <td>${artwork.forSale}</td>
    </tr>
    `;
    

    document.querySelector("#tablerows").innerHTML = sanitizeStringWithTableRows(tableRows)

    return artwork
   } catch (e) {
    console.log("Something fucked up. Good luck")
   }

}