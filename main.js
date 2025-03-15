/* 📌 Scroll Animation */
window.addEventListener('scroll', function() {
  document.querySelectorAll('section').forEach(section => {
      if (section.getBoundingClientRect().top < window.innerHeight - 80) {
          section.classList.add('show');
      }
  });
});

/* 📌 Contact Form Submission */
const scriptURL = "https://script.google.com/macros/s/AKfycbwACxl0YXZIZ0sMcu6XqrzgJ1IeEJjkjASNwnMn11gItnE7cUG1aU6hw7Y5xjeeqhMc/exec";  // Replace with your Google Apps Script URL
const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(scriptURL, {
            method: "POST",
            body: new FormData(form)
        });

        const text = await response.text();  // Read response as text
        console.log("Raw response from server:", text);

        try {
            const data = JSON.parse(text);
            console.log("Parsed JSON response:", data);

            if (data.result === "success") {
                successMessage.style.display = "block";
                errorMessage.style.display = "none";
                form.reset();
                setTimeout(() => { successMessage.style.display = "none"; }, 3000);
            } else {
                errorMessage.style.display = "block";
                console.error("Server Error:", data.error);
            }
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError);
            errorMessage.style.display = "block";
        }
    } catch (fetchError) {
        console.error("Fetch Error:", fetchError);
        errorMessage.style.display = "block";
    }
});
