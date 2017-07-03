$(function () {
    $.get('/blocks', appendToList);
    $('form').on('submit', function(event){
        //Prevents the form from being immediately submitted
        event.preventDefault();
        var form = $(this);
        //Transforms form data to URL-encoded notation
        var blockData = form.serialize();
        $.ajax({
            type: 'POST',
            url: '/blocks',
            data: blockData
        }).done(function(blockName){
            appendToList([blockName]);
            form.trigger('reset');
        });
    });
    //Selects all a elements with data-block attribute that are inside block-list
    $('.block-list').on('click', 'a[data-block]', function(event){
        if(!confirm('Are you sure?')){
            return false;
        }
        //Gets the link that was clicked and wraps it in a jquery object to make it easier to work with
        var target = $(event.currentTarget);
        $.ajax({
            type: 'DELETE',
            url: '/blocks/' + target.data('block')
        }).done(function(){
            //Removes li element containing the link
            target.parents('li').remove();
        });
    });
    function appendToList(blocks) {
        var list = [];
        var content, block;
        for (var i in blocks) {
            block = blocks[i];
            content = '<a href="#" data-block="' + block + '">X</a>';
            content += '<a href="/blocks/' + block + '">' + block + '</a>';
            list.push($('<li>', {html: content}));
        }
        $('.block-list').append(list);
    }
});