function sendMail(contactForm) {
    emailjs.send("service_ar5ez47","template_3uikedl", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // == Stops the page from reloading after we sent email.
}