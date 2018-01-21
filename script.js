// Generate image focus div on image click
$(".imageThumb img").click(function(){

  // References
  var title = $(this).attr("alt"),
      url = window.location.href;

  // Override any previous image URLs
  if (url.indexOf("?") > -1) { // Only cut URL if "?" is present
    var url = url.substring(0, url.indexOf("?"));
  };
  if (url.indexOf("#") > -1) { // Only cut URL if "#" is present
    var url = url.substring(0, url.indexOf("#"));
  };
  var par = $($(this).parent()).parent().get(0).id, // Get section ID
      imgID = title.replace(/ /g,"%20"); // Replace spaces with dashes in image title
  window.location.href = url + "#" + par + "?" + "img=" + imgID; // Set new URL
});

// Section select function for changing textBox style
function sectionSelect(){

  // Selecting just the section portion of the URL
  var url = window.location.hash;
  if (url.indexOf("?") > -1) { // Only cut URL if "?" is present
    var imgSection = (url.substring(url.indexOf("#")+1, url.indexOf("?"))), // Image section and alt name
        imgID = (url.substring(url.indexOf("img=")+4)).replace(/%20/g," "), // Image alt name
        url = url.substring(0, url.indexOf("?")); // Everything before the image info

    // Build image focus div
    $('[alt="'+imgID+'"]').each(function(){

      if ($(this).parent().get(0).id == imgSection+"-photos") { // Only run on images in the right section

        $("img").removeClass("imageSelect"); // Remove highlight from any other thumbnail
        $(this).addClass("imageSelect"); // Highlight featured image thumbnail

        // Initializing the image focus div parameters
        var source = $(this).attr("data-src"),
            title = $(this).attr("alt"),
            desc = $(this).attr("data-desc"),
            par = $(this).parent().get(0).id,
            parID = ($(this).parent()).parent().get(0).id;

        // Writing HTML for image focus div
        $(".imageContainer").html(""); // Fix to close other image focus divs in other sections
        $("."+par).html('<div><a href="'+"#"+parID+'" class="imageBack">Close Image</a><h4>'+title+'</h4><p>'+desc+'</p><a href="'+source+'" target="_blank"><img src="'+source+'"/></a></div>');

        // Scroll to thumbnail section
        $("html, body").animate({
          scrollTop: ($("#"+par).offset().top)
        },0);
      };
    });

  } else {
    $("img").removeClass("imageSelect"); // Remove highlight from all thumbnails
    $(".imageContainer").html(""); // Hide all image containers if no images are selected
  };

  // Applying selectBox class to selected section
  if (window.location.href.indexOf(url) > -1) {
    $(".textBox").removeClass("selectBox"); // Remove class from all sections first
    $(".sectionHeading").removeClass("illuminated");
    $(url).filter(".textBox").addClass("selectBox"); // Apply to only selected section
    $(url).filter(".sectionHeading").addClass("illuminated");
  };
};

// Run sectionSelect on page load
$(document).ready(sectionSelect());

// Run sectionSelect whenever section changes
jQuery(window).on("hashchange", sectionSelect);

// Gradually change background color to black from gray
$(window).on("scroll", function(){
  var s = $(window).scrollTop(),
      d = $(document).height(),
      c = $(window).height();

  var scrollPercent = (s / (d - c)),
      scrollInverse = (1 - scrollPercent);

  // Gray (#212121) is rgb(33,33,33)
  // Black is rgb(0,0,0)

  var scrollColor = Math.floor(33 * scrollInverse);

  document.body.style.backgroundColor = "rgb("+scrollColor+","+scrollColor+","+scrollColor+")";
})
