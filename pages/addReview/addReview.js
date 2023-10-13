import { API_URL } from "../../settings.js";
const URL = API_URL + "/review"

export async function initAddReview(match) {

    const id = match.params.id
    document.querySelector("#submit-review").addEventListener("click", function() {addReview(id)})

}

async function addReview(id) {

    const form = document.querySelector("#review-form")

    const newReview = {
        description: form.description.value,
        rating: parseInt(form.rating.value),
        username: form.username.value
    }
    
    const options =  {
        method: "POST",
        headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newReview),
    }

    try {
        await fetch(URL+"/"+id, options).then(res=>{
            if(!res.ok) {
                throw new Error ("Review not added")
            }
        })
    } catch (e) {
        console.log(e)
    }
}