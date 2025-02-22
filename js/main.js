const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");

let API_URL = "https://api.openai.com/v1/chat/completions";




sendBtn.onclick = function () {
    if (messageBar.value.length > 0) {
        let message =          // Message de envoyer par l'utilisateur
            `<div class="chat message">
                <img src="image/téléchargement (13).jpg"/>
                <span>
                   ${messageBar.value}
               </span>
            </div>`;


        let response =              // Reponse de l'IA
            ` <div class="chat response">
               <img src="image/téléchargement%20(11).png">
               <span class="new">...
               </span>
           </div>`

        messageBox.insertAdjacentHTML("beforeend", message);

        setTimeout(() =>{
            messageBox.insertAdjacentHTML("beforeend", response);

            const requestOptions = {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [{"role": "user", "content": messageBar.value}]
                })
            }

            fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
                const ChatBotResponse = document.querySelector(".response .new");
                ChatBotResponse.innerHTML = data.choices[0].message.content;
                ChatBotResponse.classList.remove("new");
            }).catch((error) => {
                ChatBotResponse.innerHTML = "opps! An error occurred. please try again"
            })
        }, 100);
    }
}
