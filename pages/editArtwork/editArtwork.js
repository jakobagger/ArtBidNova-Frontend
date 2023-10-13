import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
// import { fetchAndRenderArtwork} from "../findArtwork/findArtwork.js";
const URL = API_URL + "/artwork";

 export async function initEditArtwork() {
    document.querySelector("#btn-id").addEventListener("click", findArtwork);
    document.querySelector("#result").addEventListener("click", function(event) {
        if (event.target.id === "editArtwork") {
            editArtwork();
        }
    });
 }
 async function findArtwork() {
    const id = document.querySelector("#id").value
    

const artwork = await fetch (URL+"/"+id).then(res => res.json())

document.querySelector("#result").innerHTML = `
<form id="Form">
        <div class="mb-3">
            <input class="form-control" id="id" name="id" style="display:none" value="${parseInt(id)}">

            <label for="title" class="form-label">Title:</label>
            <input type="text" class="form-control" id="title" name="title" required value="${artwork.title}">
        </div>
        <div class="mb-3">
            <label for="category" class="form-label">Category:</label>
            <select class="form-control" id="category" name="category" title="Category"required>
                <option value="painting">Painting</option>
                <option value="sculpture">Sculpture</option>
                <option value="photography">Photography</option>
                <option value="print">Print</option>
                <option value="mixedMedia">Mixed Media</option>
                <option value="ceramic">Ceramic</option>
                <option value="textileArt">Textile Art</option>
                <option value="glassArt">Glass Art</option>
            </select>
            
        </div>        
        <div class="mb-3">
            <label for="description" class="form-label">Description:</label>
            <input type="text" class="form-control" id="description" name="description" required value="${artwork.description}">
        </div>     
        <div class="mb-3">
            <label for="forSale" class="form-label">For sale?:</label>
            <input type="checkbox" class="form-check-input" id="forSale" name="forSale" required value="${artwork.forSale}">
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Image:</label>
            
            <img src="${artwork.image}" id="imagePreview" style="max-width: 300px; max-height: 300px;"> <input class="form-control" id="image" name="image" type="file"
            accept="image/png, image/jpeg" >

        </div>
    </form>
    <button id="editArtwork">Edit artwork</button>`
 }

 async function convertBase64(file) {

    return new Promise((resolve, reject) => {
  
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
  
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
  };
  
  
  async function base64(file) {
    let data = await convertBase64(file)
    return data
  
  }

 async function editArtwork() {
    console.log("good")
    const form = document.querySelector("#Form");
    const id = form.querySelector("#id").value;
    const imageFile = document.querySelector("#image").files[0];
    const existingArtwork = await fetch(URL + "/" + id).then(res => res.json());
    const image = imageFile ? await base64(imageFile) : existingArtwork.image; // Use existing image if no new image is provided.
 

    const updatedArtwork = {
        artworkId: form.querySelector("#id").value,
        title: form.querySelector("#title").value,
        description: form.querySelector("#description").value,
        category: document.querySelector("#category").value,
        forSale: form.querySelector("#forSale").checked,
        image: image
        };

    
    await fetch(URL + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArtwork),
    });
    
    // alert("Artwork is edited, please select another Artwork")
    
    location.reload();
}