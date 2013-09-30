$('#add').click(function(){
	$('#thumb').remove();
	$('#bookTitle, #authors, #ISBN').val('');
	$('.bookInfo').addClass('hide');
})

$('#isbnSearch').click(function(){
	$('#thumb').remove();
	var isbn = $('#ISBN').val();
	var title;
	var authors;
	var publisher;
	var publishedDate;
	var description;
	var isbn10;
	var isbn13;
	var smallthumbnail;
	var thumbnail;
	var price;
	var condition;
	var bookdata = {};
	$.ajax({
		url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn,
		dataType: 'json',
		success: function(data) {
			bookdata.title = data.items[0].volumeInfo.title;
			bookdata.authors = data.items[0].volumeInfo.authors;
			bookdata.publisher = data.items[0].volumeInfo.publisher;
			bookdata.publishedDate = data.items[0].volumeInfo.publishedDate;
			bookdata.description = data.items[0].volumeInfo.description;
			bookdata.isbn10 = data.items[0].volumeInfo.industryIdentifiers[0].identifier;
			bookdata.isbn13 = data.items[0].volumeInfo.industryIdentifiers[1].identifier;
			bookdata.smallthumbnail = data.items[0].volumeInfo.imageLinks.smallThumbnail;
			bookdata.thumbnail = data.items[0].volumeInfo.imageLinks.thumbnail;

			$('#bookTitle').val(bookdata.title);
			$('#authors').val(bookdata.authors);
			$('#publisher').val(bookdata.publisher);
			$('#publishedDate').val(bookdata.publishedDate);
			$('.bookInfo, #showImage').removeClass('hide');
			$('#thumbnail').prepend('<img id="thumb" style="width:120px;margin-top:10px "src="'+bookdata.thumbnail+'"/>');
		}
	})
	$('#save').click(function(){
		bookdata.price = $('#price').val();
		bookdata.condition = $('#condition').val();

		$.post('/newBook', bookdata).done(function(data){
			alert('uh ah'+data);
		});
	})
})

$('#ISBN').change(function(){
	if($(this).val().length >= 10){
		$('#isbnSearch').removeClass('disabled');
	}
})