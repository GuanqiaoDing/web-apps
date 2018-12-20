$(document).ready(() => {
	$("a.editComment").on("click", (event) => {
		$(event.target).parents("div.buttonContainer").siblings("p.blogBody").hide();
		$(event.target).parents("div.buttonContainer").siblings("form").removeClass("d-none");
	});

	$("a.cancelEdit").on("click", (event) => {
		$(event.target).parent().addClass("d-none");
		$(event.target).parent().siblings("p.blogBody").show();
	});
});