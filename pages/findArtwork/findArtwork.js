import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "/artwork";
const REVIEW_URL = API_URL + "/review"


export async function initFindArtwork(match) {

    document.querySelector("#tablerows").innerHTML = ""

    document.querySelector("#get-reviews").addEventListener("click", fetchAndRenderReviews)

    document.querySelector("#search-form").addEventListener("submit", searchArtwork)

    if(match?.params?.id) {
        const id = match.params.id
        document.querySelector("#tablerows").innerHTML = ""
        fetchAndRenderArtwork(id)
    }
    else {
        document.querySelector("#get-reviews").classList.add("d-none")
    }
}

async function searchArtwork(event) {
    event.preventDefault()
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set("id", event.target.idValue.value)
    window.router.navigate("/find-artwork"+"?" + searchParams.toString())
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
    document.querySelector("#get-reviews").classList.remove("d-none")
    return artwork
   } catch (e) {
    console.log("Something fucked up. Good luck")
   }   
}

async function fetchAndRenderReviews() {

    const reviews = await fetch(REVIEW_URL + "/")
}