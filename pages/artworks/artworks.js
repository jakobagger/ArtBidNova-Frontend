import { API_URL } from "../../settings.js";
const URL = API_URL + "/artwork";

import { sanitizeStringWithTableRows } from "../../utils.js";


export async function initArtworks() {

    document.querySelector("#search-btn").addEventListener("click", findByCategory);

    document.querySelector("#tablerows").onclick = showArtworkDetails
    getAndRenderArtworks()
}
async function getAndRenderArtworks() {
       try {
        const artworksFromServer = await fetch(URL).then(res => res.json())
        renderArtworkData(artworksFromServer)
        } catch (e) {
            console.log("Error fetching artworks: " + e)
        }
}

function renderArtworkData(data) {
    const tableRows = data.map(artwork => `
    <tr>
    <td><img class="art-image" id="image_${artwork.artworkId}" src="${artwork.image}"/></td>
    <td>${artwork.title}</td>
    <td>${artwork.description}</td>
    <td>${artwork.category}</td>
    <td>${artwork.forSale}</td>
    </tr>
    `)

    const tableRowsAsString = tableRows.join("")

    document.querySelector("#tablerows").innerHTML = sanitizeStringWithTableRows(tableRowsAsString)
}

async function showArtworkDetails(event) {
    const target = event.target
    if (!target.id.startsWith("image_")) {
        return
      }
      const id = target.id.replace("image_", "")
      // @ts-ignore
      window.router.navigate("find-artwork?id=" + id)
}

async function findByCategory() {
    // Get the selected category from the dropdown
    const dropdown = document.getElementById("dropdown");
    const selectedCategory = dropdown.value;

    try {
        // Fetch artworks from the server
        const artworks = await fetch(URL).then((res) => res.json());

        // Filter artworks by the selected category
        const filteredArtworks = artworks.filter((artwork) => 
            artwork.category.toLowerCase() === selectedCategory.toLowerCase());
        console.log(JSON.stringify(artworks))
        console.log(JSON.stringify(filteredArtworks))
        document.querySelector("#tablerows").innerHTML = ("")
        // Render the filtered data
        renderArtworkData(filteredArtworks);
    } catch (e) {
        console.log("Error fetching artworks: " + e);
    }
}