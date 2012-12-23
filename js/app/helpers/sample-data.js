define(['require', 'app/helpers/debugger'], function(require, Debugger) {
	 
  // add 'sr_sample_data' as a query param to enable

  var SampleData = {};

  SampleData.is_on = function() {
    if (Debugger.check_parameter_exists('sr_sample_data')) {
      return true;
    } else {
      return false;
    }
  };

  SampleData.reads = { 
    "data": [
       {
        "id": "10152353237580383", 
        "from": {
          "name": "Bridget Clay", 
          "id": "509762020"
        }, 
        "start_time": "2012-12-15T21:22:08+0000", 
        "end_time": "2012-12-15T21:22:08+0000", 
        "publish_time": "2012-12-15T21:22:08+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "304735542977218", 
            "url": "http://localhost:8888/wordpress/rewarw/", 
            "type": "article", 
            "title": "Hartley gets its own Dating Service"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152337507880383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-12-09T22:12:39+0000", 
        "end_time": "2012-12-09T22:12:39+0000", 
        "publish_time": "2012-12-09T22:12:39+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "378252925592550", 
            "url": "http://localhost:8888/wordpress/rewarw/", 
            "type": "article", 
            "title": "Comments of the Week #2"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152325332405383", 
        "from": {
          "name": "Jenna Brown", 
          "id": "513449780"
        }, 
        "start_time": "2012-12-04T20:10:08+0000", 
        "end_time": "2012-12-04T20:10:08+0000", 
        "publish_time": "2012-12-04T20:10:08+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "394572300623745", 
            "url": "http://localhost:8888/wordpress/rewarw/", 
            "type": "article", 
            "title": "How To Pull at Jesters"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152319464040383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-12-02T14:04:00+0000", 
        "end_time": "2012-12-02T14:04:00+0000", 
        "publish_time": "2012-12-02T14:04:00+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "311512682286598", 
            "url": "http://sotontab.co.uk/news/2012/12/02/susu-disability-officer-guilty-of-hacking/", 
            "type": "article", 
            "title": "SUSU Disability Officer Guilty of HACKING"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152291691295383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-11-21T18:05:45+0000", 
        "end_time": "2012-11-21T18:05:45+0000", 
        "publish_time": "2012-11-21T18:05:45+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "502687413098147", 
            "url": "http://sotontab.co.uk/news/2012/11/21/nus-referendum-the-polls-so-far/", 
            "type": "article", 
            "title": "NUS Referendum: The Polls So Far"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152265885575383", 
        "from": {
          "name": "Abi Houghton", 
          "id": "1844202473"
        }, 
        "start_time": "2012-11-11T17:09:51+0000", 
        "end_time": "2012-11-11T17:09:51+0000", 
        "publish_time": "2012-11-11T17:09:51+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "174390416033247", 
            "url": "http://knaqu.org/video-shokuese-shikoni-se-qfar-veprimi-ben-barack-obama/", 
            "type": "article", 
            "title": "Video Shokuese! Shikoni se qfar veprimi ben Barack Obama"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152265261350383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-11-11T12:06:41+0000", 
        "end_time": "2012-11-11T12:06:41+0000", 
        "publish_time": "2012-11-11T12:06:41+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "203202176481809", 
            "url": "http://sotontab.co.uk/pictures/2012/11/11/the-damming-truth-reasons-not-to-wear-a-poppy/", 
            "type": "article", 
            "title": "THE DAMNING TRUTH: Reasons NOT to wear a poppy…"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152265025840383", 
        "from": {
          "name": "George Marneros", 
          "id": "504855756"
        }, 
        "start_time": "2012-11-11T08:17:55+0000", 
        "end_time": "2012-11-11T08:17:55+0000", 
        "publish_time": "2012-11-11T08:17:55+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "383395001741841", 
            "url": "http://sotontab.co.uk/lifestyle/2012/11/08/the-students-guide-to-gold-digging-part-1/", 
            "type": "article", 
            "title": "A Student’s Guide to GOLD-DIGGING: Part 1"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152264160565383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-11-10T22:18:59+0000", 
        "end_time": "2012-11-10T22:18:59+0000", 
        "publish_time": "2012-11-10T22:18:59+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "137881086359855", 
            "url": "http://sotontab.co.uk/headline/2012/11/10/supporting-local-talent-underplay-at-the-railway/", 
            "type": "article", 
            "title": "Supporting Local Talent: UNDERPLAY at The Railway"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152251063655383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-11-05T22:53:18+0000", 
        "end_time": "2012-11-05T22:53:18+0000", 
        "publish_time": "2012-11-05T22:53:18+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "284206321696653", 
            "url": "http://www.welovefilm.co/news/hollywoodnews/les-miserables-reveals-two-new-posters/", 
            "type": "article", 
            "title": "Les Miserables Reveals Two New Posters - We Love Film"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152251060095383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-11-05T22:51:49+0000", 
        "end_time": "2012-11-05T22:51:49+0000", 
        "publish_time": "2012-11-05T22:51:49+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "106516732845751", 
            "url": "http://www.cineview.eu/nadprevarata-vsichko-nai-novo-i-interesno-za-tazgodishnite-nagradi-oskar/", 
            "type": "article", 
            "title": "“Надпреварата” – всичко най-ново и интересно за тазгодишните награди Оскар"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152245729260383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-11-03T21:17:35+0000", 
        "end_time": "2012-11-03T21:17:35+0000", 
        "publish_time": "2012-11-03T21:17:35+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "391701740901431", 
            "url": "http://sotontab.co.uk/degree-break/2012/10/09/freshers-ball-proposal/", 
            "type": "article", 
            "title": "Freshers Ball PROPOSAL"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152245728785383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-11-03T21:17:17+0000", 
        "end_time": "2012-11-03T21:17:17+0000", 
        "publish_time": "2012-11-03T21:17:17+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "128041100676947", 
            "url": "http://sotontab.co.uk/entertainment/2012/10/12/free-music-tour-hits-southampton/", 
            "type": "article", 
            "title": "FREE Music Tour Hits Southampton"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152245727970383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-11-03T21:16:56+0000", 
        "end_time": "2012-11-03T21:16:56+0000", 
        "publish_time": "2012-11-03T21:16:56+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "528029543893507", 
            "url": "https://sotontab.co.uk/news/2012/11/03/roosters-on-fire-2/", 
            "type": "article", 
            "title": "Roosters on FIRE"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152244659255383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-11-03T11:38:24+0000", 
        "end_time": "2012-11-03T11:38:24+0000", 
        "publish_time": "2012-11-03T11:38:24+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "356711524422389", 
            "url": "http://sotontab.co.uk/news/2012/11/02/fire-closes-portswood-road/", 
            "type": "article", 
            "title": "Fire Closes Portswood Road"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152244627910383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-11-03T11:11:20+0000", 
        "end_time": "2012-11-03T11:11:20+0000", 
        "publish_time": "2012-11-03T11:11:20+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "303047316475385", 
            "url": "https://sotontab.co.uk/lifestyle/2012/11/03/the-palace-of-dreams-to-the-man-of-your-dreams-in-5-easy-steps/", 
            "type": "article", 
            "title": "The Palace of Dreams to the Man of your Dreams…in 5 Easy Steps!"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152219115440383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-10-25T19:36:28+0000", 
        "end_time": "2012-10-25T19:36:28+0000", 
        "publish_time": "2012-10-25T19:36:28+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "329881983775853", 
            "url": "http://sotontab.co.uk/degree-break/2012/10/25/sleepy-snaps/", 
            "type": "article", 
            "title": "Sleepy Snaps"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152217820955383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-10-25T07:16:21+0000", 
        "end_time": "2012-10-25T07:16:21+0000", 
        "publish_time": "2012-10-25T07:16:21+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "435209399871319", 
            "url": "http://sotontab.co.uk/degree-break/2012/10/24/students-dont-know-their-sht/", 
            "type": "article", 
            "title": "Students Don’t Know Their Sh*t?"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152216463435383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-10-24T19:09:52+0000", 
        "end_time": "2012-10-24T19:09:52+0000", 
        "publish_time": "2012-10-24T19:09:52+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "199518523516255", 
            "url": "http://sotontab.co.uk/headline/2012/10/23/student-protest-is-timely-and-urgent/", 
            "type": "article", 
            "title": "Student Protest is Timely and Urgent"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152215554885383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-10-24T11:21:31+0000", 
        "end_time": "2012-10-24T11:21:31+0000", 
        "publish_time": "2012-10-24T11:21:31+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "218693958262235", 
            "url": "http://sotontab.co.uk/degree-break/2012/10/24/whatsoc-cake-decorating/", 
            "type": "article", 
            "title": "WHATSOC? Cake Decorating!"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152211427880383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-10-22T20:35:59+0000", 
        "end_time": "2012-10-22T20:35:59+0000", 
        "publish_time": "2012-10-22T20:35:59+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "418320004890243", 
            "url": "http://sotontab.co.uk/pictures/2012/10/19/review-bloc-party-at-the-guildhall/", 
            "type": "article", 
            "title": "REVIEW: Bloc Party at the Guildhall"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152208912310383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-10-21T21:40:59+0000", 
        "end_time": "2012-10-21T21:40:59+0000", 
        "publish_time": "2012-10-21T21:40:59+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "371017429645843", 
            "url": "http://sotontab.co.uk/opinion/2012/10/11/no-to-nus-doomed-from-the-start/", 
            "type": "article", 
            "title": "No to NUS Doomed from the Start?"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }, 
      {
        "id": "10152207624260383", 
        "from": {
          "name": "Chris Houghton", 
          "id": "578040382"
        }, 
        "start_time": "2012-10-21T13:26:58+0000", 
        "end_time": "2012-10-21T13:26:58+0000", 
        "publish_time": "2012-10-21T13:26:58+0000", 
        "application": {
          "name": "Social Reader", 
          "namespace": "fb_social_reader", 
          "id": "249444298473440"
        }, 
        "data": {
          "article": {
            "id": "165689946903176", 
            "url": "https://sotontab.co.uk/news/2012/10/19/greyhound-to-be-put-down/", 
            "type": "article", 
            "title": "Greyhound to be Put Down"
          }
        }, 
        "type": "news.reads", 
        "no_feed_story": false, 
        "likes": {
          "count": 0, 
          "can_like": true, 
          "user_likes": false
        }, 
        "comments": {
          "count": 0, 
          "can_comment": true
        }
      }
    ], 
    "paging": {
      "next": "https://graph.facebook.com/578040382/news.reads?limit=25&offset=25&__after_id=10152207624260383"
    }

  };	

  return SampleData;

});