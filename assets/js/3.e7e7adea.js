(window.webpackJsonp=window.webpackJsonp||[]).push([[3,4],{307:function(e,i,t){},310:function(e,i,t){"use strict";t(307)},330:function(e,i,t){},335:function(e,i,t){"use strict";t.r(i);var o={name:"GdeVideo",props:["videoOptions"],data:function(){return{playVideo:!1,autoplay:!1}},methods:{videoMousemove:function(){this.playVideo=!0},videoMouseleave:function(){this.playVideo=!1},videFullscreenChange:function(e){e?(this.autoplay=!0,this.$refs.helpVideo.play()):this.$refs.helpVideo.pause()},videoPlay:function(){this.$refs.videFullscreen.toggle()}}},s=(t(310),t(44)),n=Object(s.a)(o,(function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{attrs:{id:"help-video-main"},on:{mousemove:e.videoMousemove,mouseleave:e.videoMouseleave,click:e.videoPlay}},[t("div",{attrs:{id:"help-video-content"}},[t("p",{staticClass:"help-video-title"},[e._v(e._s(e.videoOptions.title))]),e._v(" "),t("p",{staticClass:"help-video-description"},[e._v(e._s(e.videoOptions.description))]),e._v(" "),t("span",{staticClass:"help-video-time"},[e._v(e._s(e.videoOptions.time))])]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.playVideo,expression:"playVideo"}],attrs:{id:"help-video-hover"}},[t("i",{attrs:{id:"icon-video-play"}})]),e._v(" "),t("fullscreen",{ref:"videFullscreen",on:{change:e.videFullscreenChange}},[t("div",{attrs:{id:"help-video"}},[t("video",{ref:"helpVideo",attrs:{autoplay:e.autoplay,controls:"",src:e.videoOptions.src}})])])],1)}),[],!1,null,null,null);i.default=n.exports},360:function(e,i,t){"use strict";t(330)},367:function(e,i,t){"use strict";t.r(i);var o={name:"HelpVideo",components:{GdeVideo:t(335).default},computed:{videos:function(){return this.$page.frontmatter}}},s=(t(360),t(44)),n=Object(s.a)(o,(function(){var e=this.$createElement,i=this._self._c||e;return this.videos.video?i("div",this._l(this.videos.videos,(function(e,t){return i("GdeVideo",{key:t,staticClass:"gde-video",attrs:{videoOptions:e}})})),1):this._e()}),[],!1,null,null,null);i.default=n.exports}}]);