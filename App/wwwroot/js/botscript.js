const chatInput = document.querySelector(".chatbot__chatinput textarea");
const sendChatBtn = document.querySelector(".chatbot__chatinput i");
const chatbox = document.querySelector(".chatbot__dialog-phrase-list");
const chatToggler = document.querySelector(".chatbot-toggler");
const urlhost = document.getElementById("general-footer__info-url").innerHTML;
const apiurl = "https://" + urlhost.trim() + "/homeapiv1/sendmessage";
let userMessage;

const  generateResponce = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: userMessage
        })
    }
    fetch(apiurl, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.message;
    }).catch((error) => {
        console.log(error);
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}


const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "chatbot__dialog-phrase-list-item-outgoing" ? '<p>' + '</p>' : ' <img src="https://avatars.dzeninfra.ru/get-zen-logos/271828/pub_665e000431e4ee216f571772_665fff0c5a628035b5b3b10d/orig" alt="X" height="44" width="44"> <p><br>' +'</p>';
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    chatbox.appendChild(createChatLi(userMessage, "chatbot__dialog-phrase-list-item-outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
        const incomingChatLi = chatbox.appendChild(createChatLi("Секундочку...", "chatbot__dialog-phrase-list-item-incoming"));
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponce(incomingChatLi);
    }, 600);
}
chatToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"))
sendChatBtn.addEventListener("click", handleChat);
