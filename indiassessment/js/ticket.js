let raw = sessionStorage.getItem("confData");

// If no registration data found, redirect to home immediately
if (!raw) {
    window.location.replace("/HTML/index.html");
} else {
    // Parse the stored registration data
    let data = JSON.parse(raw);

    // Populate the congrats heading and subtitle
    document.querySelector("#ticketNameDisplay").textContent = data.fullName;
    document.querySelector("#ticketEmailDisplay").textContent = data.email;

    // Populate the ticket card fields
    document.querySelector("#ticketUserName").textContent = data.fullName;
    document.querySelector("#ticketGithub").textContent = data.github;
    document.querySelector("#ticketNumber").textContent = data.ticketNumber;

    // Set the avatar image from the FileReader data URL
    let avatarEl = document.querySelector("#ticketAvatar");
    avatarEl.src = data.avatar;
    avatarEl.alt = data.fullName + "'s photo";
}
