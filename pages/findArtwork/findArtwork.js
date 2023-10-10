import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "/artwork";

export async function initFindArtwork() {
    document.querySelector("#btn-id").addEventListener("click", findArtwork);
}
    async function findArtwork() {
        const id = document.querySelector("#id").value
        
   
    const artwork = await fetch (URL+"/"+id).then(res => res.json())
    const tableRows = `
    <tr>
    <td>${artwork.title}</td>
    <td>${artwork.description}</td>
    <td>${artwork.category}</td>
    <td>${artwork.forSale}</td>
    <td>${artwork.image}</td>
    </tr>
    `;
    
  
    document.querySelector("#tablerows").innerHTML = sanitizeStringWithTableRows(tableRows)

}