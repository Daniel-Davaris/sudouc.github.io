var formAPI = "https://formspree.io/developers.uc@gmail.com"

$(function () { //shorthand document.ready function
    $('#contact-form').submit(submitForm);//use on if jQuery 1.7+
});

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function submitForm(e) {
    e.preventDefault();  //prevent form from submitting

    // Checkout the data
    var formData = $("#contact-form").serializeObject();

    $.ajax({
        url: formAPI,
        method: "POST",
        data: formData,
        dataType: "json"
    })
    // NOTE: formspree doesn't actually respond, these are just here for if we need them later
        .done(function (data) {
            console.log("submitted: " + data);
            // Show the user the submission was successful
        })
        .fail(function (xhr, textStatus, errorThrown) {
            console.error("error: " + xhr + " " + textStatus);
            // Show the user that there was an error
        });

    // Hide the form and show a thanks
    $("#contact-form").addClass("hidden");
    $("#sent-form").removeClass("hidden");


    return false;
}