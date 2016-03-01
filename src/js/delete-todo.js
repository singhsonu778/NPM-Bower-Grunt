$(document).ready(function () {
    $('.todo-list').on('click', '.close', function () {
        $(this).parent().remove();
    });
});
