const uploadZone = document.querySelector("#uploadZone");
const fileInput = document.querySelector("#fileInput");
const uploadDefault = document.querySelector("#uploadDefault");
const uploadPreview = document.querySelector("#uploadPreview");
const previewImg = document.querySelector("#previewImg");
const removeBtn = document.querySelector("#removeBtn");
const changeBtn = document.querySelector("#changeBtn");
const uploadForm = document.querySelector("#uploadForm");

let avatarDataUrl = null;

// Open file picker when upload zone is clicked
uploadZone.addEventListener("click", function(e) {
    if (e.target === removeBtn || e.target === changeBtn) return;
    fileInput.click();
});

// Allow keyboard users to activate the upload zone with Space or Enter
uploadZone.addEventListener("keydown", function(e) {
    if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        fileInput.click();
    }
});

// Handle file picked from browser
fileInput.addEventListener("change", function() {
    let file = this.files[0];
    if (file) processFile(file);
});

// Drag and drop
uploadZone.addEventListener("dragover", function(e) {
    e.preventDefault();
    this.style.borderColor = "hsl(7, 88%, 67%)";
});

uploadZone.addEventListener("dragleave", function() {
    this.style.borderColor = "";
});

uploadZone.addEventListener("drop", function(e) {
    e.preventDefault();
    this.style.borderColor = "";
    let file = e.dataTransfer.files[0];
    if (file) processFile(file);
});

// Remove image button
removeBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    avatarDataUrl = null;
    fileInput.value = "";
    previewImg.src = "";
    uploadPreview.style.display = "none";
    uploadDefault.style.display = "flex";
    hideError("avatarError");
});

// Change image button
changeBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    fileInput.click();
});

function processFile(file) {
    hideError("avatarError");

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        showError("avatarError", "Invalid file type. Please upload a JPG or PNG.");
        return;
    }

    if (file.size > 500 * 1024) {
        showError("avatarError", "File too large. Please upload a photo under 500KB.");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e) {
        avatarDataUrl = e.target.result;
        previewImg.src = avatarDataUrl;
        uploadDefault.style.display = "none";
        uploadPreview.style.display = "flex";
    };

    reader.readAsDataURL(file);
}

// Show error message
function showError(id, msg) {
    let el = document.querySelector("#" + id);
    if (msg) el.textContent = msg;
    el.classList.add("show");
}

// Hide error message
function hideError(id) {
    document.querySelector("#" + id).classList.remove("show");
}

// Mark input as error
function markError(inputId) {
    document.querySelector("#" + inputId).classList.add("inputError");
}

// Clear input error
function clearError(inputId) {
    document.querySelector("#" + inputId).classList.remove("inputError");
}

// Email format check
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form submit
uploadForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    let nameVal = document.querySelector("#name").value.trim();
    if (nameVal === "") {
        showError("nameError", "Please enter your full name.");
        markError("name");
        valid = false;
    } else {
        hideError("nameError");
        clearError("name");
    }

    let emailVal = document.querySelector("#email").value.trim();
    if (!emailRegex.test(emailVal)) {
        showError("emailError", "Please enter a valid email address.");
        markError("email");
        valid = false;
    } else {
        hideError("emailError");
        clearError("email");
    }

    let githubVal = document.querySelector("#github").value.trim();
    if (!githubVal.startsWith("@") || githubVal.length < 2) {
        showError("githubError", "Github username must start with @.");
        markError("github");
        valid = false;
    } else {
        hideError("githubError");
        clearError("github");
    }

    if (!avatarDataUrl) {
        showError("avatarError", "Please upload a profile photo.");
        valid = false;
    }

    if (valid) {
        let ticketNum = "#" + String(Math.floor(Math.random() * 90000) + 10000);

        let confData = {
            fullName: nameVal,
            email: emailVal,
            github: githubVal,
            avatar: avatarDataUrl,
            ticketNumber: ticketNum
        };

        sessionStorage.setItem("confData", JSON.stringify(confData));
        window.location.href = "/HTML/ticket.html";
    }
});
