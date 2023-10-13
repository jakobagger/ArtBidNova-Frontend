import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "/artwork";
const REVIEW_URL = API_URL + "/review"

let artworkDetails = null
let handlersInitialized = false

export async function initFindArtwork(match) {

    //Made by chatGPT to resolve accidentally adding multiple event listeners to the same button. Didn't know that could happan
    const addReviewButton = document.getElementById("add-review-btn");
    if (addReviewButton) {
      addReviewButton.removeEventListener("click", ()=> navigateToAddReview(id));
    }
  
    //Clear input field from previous runs
  
  document.getElementById("artwork-details").innerHTML = ""
  document.querySelector("#review-div").innerHTML = ""
  if (!handlersInitialized) {
    artworkDetails = document.getElementById("artwork-details")
    // @ts-ignore
    document.getElementById("btn-id").addEventListener("click",getArtwork)
    //@ts-ignore
    document.getElementById("get-reviews-btn").addEventListener("click",fetchAndRenderReviews)
    handlersInitialized = true
  }
  //Check if userID is provided via a query parameter and if, use it to fetch and render user
  if (match?.params?.id) {
    const id = match.params.id
    document.getElementById("add-review-btn").addEventListener("click", ()=> navigateToAddReview(id))
    // @ts-ignore
    document.getElementById("artwork-details").innerHTML = ""
    fetchAndRenderArtwork(id)
  }
}

const navigoRoute = "find-artwork"
async function getArtwork(event) {
    event.preventDefault()
    fetchAndRenderArtwork()
}

export async function fetchAndRenderArtwork(idFromURL) {

    const id = idFromURL ? idFromURL : document.querySelector("#id-field").value
        
    try {
        if(!id) {
            artworkDetails.innerHTML = ""
            appendParagraph(artworkDetails, "Please provide an id", "color:red")
            return
        }
        
        const artwork = await fetch (URL+"/"+id).then(res => res.json())
            

        artworkDetails.innerHTML = ""
        // Create an <img> element for the image, made by chatGPT
        let img = document.createElement("img");
        img.src = sanitizeStringWithTableRows(artwork.image); // Make sure to sanitize the image URL
        
        // Append the image to a table cell
        let imgCell = document.createElement("td");
        imgCell.appendChild(img);
        artworkDetails.appendChild(imgCell);
        appendParagraph(artworkDetails, artwork.title)
        appendParagraph(artworkDetails, artwork.description)
        appendParagraph(artworkDetails, artwork.category)
        appendParagraph(artworkDetails, artwork.forSale)
        // Below 2 lines updates the url, but also means we have to press "back" twice. Might be important later
        // const queryString = "?id="+id
        // window.router.navigate(`/${navigoRoute}${queryString}`, { callHandler: false, updateBrowserURL: true})

    } catch(e) {
        artworkDetails.innerHTML = ""
        console.log("Could not find artwork: " + e)
    }    
}

function appendParagraph(outerElement, value, style) {
    let p = document.createElement("td");
    p.textContent = value;
    if (style) {
      p.style = style
    }
    outerElement.appendChild(p);
}

async function fetchAndRenderReviews() {

    //Couldn't get window.location.search to work, so this works as we only have 1 search parameter
    const hash = window.location.hash;
    const idwithoutHash = hash.substring(hash.length-1)
    
    // const urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams)
    // const id = urlParams.get("id");
    // console.log(id)
    try {

        if(!idwithoutHash) {
            console.log("Couldn't find id in url")
            return
        }
        const reviews = await fetch(REVIEW_URL + "/" + idwithoutHash).then(res=>res.json())

        const reviewRows = reviews.map(review => `
        <div class="review">
        <div class="rating">${review.rating} stars</div>
        <div class="description">${review.description}</div>
        <div class="username">Reviewed by: ${review.username}</div>
        </div>
        `)

        document.querySelector("#review-div").innerHTML = sanitizeStringWithTableRows(reviewRows)
    } catch (e) {
        console.log("Couldn't get reviews")
    }
}

function navigateToAddReview(id) {
    window.router.navigate(`/add-review?id=${id}`);
  }
  
