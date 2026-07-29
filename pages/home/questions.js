const questions = [
    {
        id: 1,
        questions: "Can you ship remotely?",
        answer: "Yes, we ship to most countries worldwide. Shipping times and costs vary depending on your location and will be shown at checkout."
    },

    {
        id: 2,
        questions: "Do you offer money back guarentee?",
        answer: "Yes, we offer a 100% money back guarantee within 60 days of purchase if you're not satisfied with the results."
    },
    
    {
        id: 3,
        questions: "What are the skincare benefits of oat?",
        answer: "Oat is rich in antioxidants and has soothing, anti-inflammatory properties that help calm irritated skin and strengthen the skin barrier."
    },
    
    {
        id: 4,
        questions: "How long until we deliver your product?",
        answer: "Standard delivery usually takes 3-5 business days, depending on your location."
    },
    
    {
        id: 5,
        questions: "What is the skin microbiome?",
        answer: "The skin microbiome is the community of bacteria, fungi, and other microorganisms living on your skin that help protect it and maintain a healthy barrier."
    }
    

];

const questionsContainer = document.getElementById("questions-container");

for (let i = 0; i < questions.length; i++){

    questionsContainer.innerHTML += `
    <div class="card1">
    <div class="card-header">
    <h3>${questions[i].questions}</h3>
    <i class="fa-solid fa-angle-down"></i>
    </div>
    <div class="answer">
    <p>${questions[i].answer}</p>
    </div>
    
    </div>
    `;
}

//open-close on click
questionsContainer.addEventListener("click", function(e){
    const card = e.target.closest(".card1");
    if(!card) return;

    const isAlreadyOpen = card.classList.contains("active");

    document.querySelectorAll(".card1").forEach(c => c.classList.remove("active"));

    if (!isAlreadyOpen){
        card.classList.add("active");
    }
});