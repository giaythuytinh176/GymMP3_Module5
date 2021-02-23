(function ($) {
  'use strict';

  // btn more
  $(document).on('click.site', '.btn-more', function (e) {
    console.log('this', this);
    var $dp = $(this).next('.dropdown-menu');
    var songID = $(this).attr('data-song-id');
    console.log('song-id', songID);
    console.log('$dp', $dp);
    if ($dp.html() === "") {
      $dp.append('<a class="dropdown-item" data-queue="' + songID + '" href="#"><i class="fa fa-plus fa-fw text-left"></i> Add to Queque</a>' +
        '<a class="dropdown-item" data-playlist="' + songID + '" href="#"><i class="fa fa-music fa-fw text-left"></i> Add to Playlist</a>' +
        '<div class="dropdown-divider"></div>' +
        '<a class="dropdown-item" data-share="' + songID + '" href="#"><i class="fa fa-share-alt fa-fw text-left"></i> Share</a>');
    }

    if ((e.pageY + $dp.height() + 60) > $('body').height()) {
      $dp.parent().addClass('dropup');
    }

    if (e.pageX < $dp.width()) {
      $dp.removeClass('pull-right');
    }

  });

  $(document).on('click.site', '#search-result a', function (e) {
    $(this).closest('.modal').modal('hide');
  });

})(jQuery);
