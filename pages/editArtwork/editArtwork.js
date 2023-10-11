import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
import { fetchAndRenderArtwork} from "../findArtwork/findArtwork.js";
const URL = API_URL + "/artwork";


export async function initEditArtwork() {
    document.querySelector("#btn-id").addEventListener("click", async () => {
        
        const id = document.querySelector("#id").value
        // const artwork = await fetch(URL+"/"+id).then(res=> res.json())
        const artwork = await fetchAndRenderArtwork(id)

        document.querySelector("#result").innerHTML = `<form id="Form">
        <div class="mb-3">
            <input class="form-control" id="id" name="id" style="display:none" value="${parseInt(id)}">
            <label for="title" class="form-label">Title:</label>
            <input type="text" class="form-control" id="title" name="title" required value="${title}">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description:</label>
            <input type="text" class="form-control" id="description" name="description" required value="${description}">
        </div>        
        <div class="mb-3">
            <label for="category" class="form-label">Category:</label>
            <input type="text" class="form-control" id="description" name="description" required value="${description}">
        </div>     
        <div class="mb-3">
            <label for="forSale" class="form-label">For sale?:</label>
            <input type="checkbox" class="form-control" id="forSale" name="forSale" required value="${forSale}">
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Image:</label>
            <input class="form-control" id="image" name="image" type="file"
            accept="image/png, image/jpeg" multiple required> value="${image}">
        </div>
    </form>
    <button id="editArtwork">Edit artwork</button>`
    document.querySelector("#editArtwork").addEventListener("click", editArtwork)
    })
}