// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".btn").on("click", function (event) {
    var id = $(this).data("id");
    var devoured = $(this).data("devour");
        console.log(devoured)

        var newDevouredState = {
            devoured: devoured
        };
        // Send the PUT request.
        $.ajax("/api/burger/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function () {
                console.log("changed devoured to", devoured);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".d-btn").on("click", function (event) {
        var id = $(this).data("id");
        // Send the DELETE request.
        $.ajax("/api/burger/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted burger", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        console.log("HIT IT")
        event.preventDefault();
        var newBurger = {
            name: $("#new-burger").val().trim()
        };

        // Send the POST request.
        $.ajax("/api/burger", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
