element.on('keyup', function () {
    var doneTypingInterval = 1000; //time in ms, 5 second for example
    clearTimeout(searchState.typingTimer);
    searchState.typingTimer = setTimeout(function () {
        $.ajax({
            url: "",
            data: {
                "value": $('.search-box input').val()
            },
            method: 'get'
        }).success(function (data) {
            $('#search-results').children().remove();
            for (result in data) {
                var listing = $('<li class="listing"></li>');
                listing.click(function () {
                    //highlight for adding
                });
            }
        });
    }, doneTypingInterval);
});
