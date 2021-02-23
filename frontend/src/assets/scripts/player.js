(function ($) {
  "use strict";

  if ($('.playlist').length === 0) return;

  var playlist = $('.playlist').mepPlaylist({
    audioHeight: '40',
    audioWidth: '100%',
    videoHeight: '40',
    videoWidth: '100%',
    audioVolume: 'vertical',
    mepPlaylistLoop: true,
    alwaysShowControls: true,
    mepSkin: 'mejs-audio',
    mepResponsiveProgress: true,
    mepSelectors: {
      playlist: '.playlist',
      track: '.track',
      tracklist: '.tracks'
    },
    features: [
      'meplike',
      'mepartwork',
      'mepcurrentdetails',
      'mepplaylist',
      'mephistory',
      'mepprevioustrack',
      'playpause',
      'mepnexttrack',
      'progress',
      'current',
      'duration',
      'volume',
      'mepicons',
      'meprepeat',
      'mepshuffle',
      'mepsource',
      'mepbuffering',
      'meptracklist',
      'mepplaylisttoggle',
      'youtube'
    ],
    mepPlaylistTracks: [
      {
        "id": "item-1",
        "title": "Vùng Lá Me Bay",
        "except": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quamquam tu hanc copiosiorem etiam soles dicere. Nihil illinc huc pervenit.",
        "link": "track.detail.html",
        "thumb": {"src": "https://i.ytimg.com/vi/z8DLkLnemFY/mqdefault.jpg"},
        "src": "https://firebasestorage.googleapis.com/v0/b/dataimagemusic.appspot.com/o/test%2FVungLaMeBay1-NhuQuynh-4453354.mp3?alt=media&token=8af81cc7-c90b-4a28-b48f-137884833541",
        "meta": {
          "author": "Trần Quang Lộc",
          "authorlink": "artist.detail.html",
          "date": "30.05.2016",
          "category": "Blue",
          "tag": "Holiday",
          "play": 3200,
          "like": 210,
          "duration": "5:20"
        }
      },
    ]
  });

  // get player, then you can use the player.mepAdd(), player.mepRemove(), player.mepSelect()
  var player = playlist.find('audio, video')[0].player;

  // event on like btn
  player.$node.on('like.mep', function (e, trackid) {
    $('[track-id=' + trackid + ']').toggleClass('is-like');
  });

  // event on play
  player.$node.on('play', function (e) {
    updateDisplay();
  });

  // event on pause
  player.$node.on('pause', function (e) {
    updateDisplay();
  });

  // update when pjax end
  $(document).on('pjaxEnd', function () {
    updateDisplay();
  });

  // simulate the play btn
  $(document).on('click.btn', '.btn-playpause', function (e) {
    e.stopPropagation();
    var self = $(this);
    if (self.hasClass('is-playing')) {
      self.removeClass('is-playing');
      player.pause();
      // console.log(self);
    } else {
      var item = getItem(self);
      console.log(item);
      item && player.mepAdd(item, true);
    }
  });

  function updateDisplay() {
    $('[data-id]').removeClass('active').find('.btn-playpause').removeClass('is-playing').parent().removeClass('active');
    var track = player.mepGetCurrentTrack();
    if (!track || !track.id) return;
    var item = $('[data-id="' + track.id + '"]');
    console.log('item', item);
    if (player.media.paused) {
      console.log('player-paused', 'paused');
      item.removeClass('active').find('.btn-playpause').removeClass('is-playing').parent().removeClass('active');
    } else {
      console.log('player-play', 'play');
      item.addClass('active').find('.btn-playpause').addClass('is-playing').parent().addClass('active');
    }
  }

  // get item data, you can use ajax to get data from server
  function getItem(self) {
    var item = self.closest('.item');
    // track detail
    if (!item.attr('data-src')) {
      self.toggleClass('is-playing');
      $('#tracks').find('.btn-playpause').first().trigger('click');
      return false;
    }

    var obj = {
      meta: {
        author: item.find('.item-author').find('a').text()
        , authorlink: item.find('.item-author').find('a').attr('href')
      }
      , src: self.closest('[data-src]').attr("data-src")
      , thumb: {
        src: item.find('.item-media-content').css("background-image").replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
      }
      , title: item.find('.item-title').find('a').text()
      , link: item.find('.item-title').find('a').attr('href')
      , id: self.attr("data-id") ? self.attr("data-id") : self.closest('[data-id]').attr("data-id")
    };
    return obj;
  }

})(jQuery);
