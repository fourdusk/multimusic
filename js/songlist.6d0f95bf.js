(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["songlist"],{"348e":function(t,i,s){"use strict";s.r(i);var a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-container",{ref:"typeNavigation",style:t.typeNavigationStyle,attrs:{fluid:"","py-0":""}},[s("v-layout",{attrs:{wrap:"","justify-space-between":""}},[s("v-flex",{attrs:{xs12:"","py-4":""}},[s("v-card",{attrs:{flat:""}},[s("v-layout",{attrs:{wrap:"","justify-center":""}},[s("v-flex",{attrs:{xs5:""}},[s("v-layout",{attrs:{"justify-center":""}},[s("v-flex",{attrs:{xs10:""}},[s("div",{staticStyle:{"max-width":"300px","max-heigt":"300px"}},[s("img",{staticStyle:{"border-radius":"10px"},attrs:{width:"100%",src:t.listcover},on:{load:t.imgLoad}})])])],1)],1),s("v-flex",{attrs:{xs7:""}},[s("v-layout",{attrs:{wrap:"",column:"","justify-space-between":"","fill-height":""}},[s("v-flex",[s("div",{staticClass:"subheading"},[t._v(t._s(t.listname))])]),s("v-flex",[s("img",{staticStyle:{"border-radius":"50%","vertical-align":"middle"},attrs:{src:t.creatoravatar,width:"24",height:"24"},on:{load:t.imgLoad}}),s("span",{staticClass:"pl-2 caption grey--text"},[t._v(t._s(t.creatorname))])]),s("v-flex",[s("v-tooltip",{attrs:{bottom:"","max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(i){var a=i.on;return[s("div",t._g({staticClass:"text-truncate caption grey--text"},a),[t._v("\n                          "+t._s(t.listdescription)+"\n                        ")])]}}])},[s("span",{domProps:{innerHTML:t._s(t.listdescription)}})])],1)],1),s("div")],1)],1)],1)],1),s("v-flex",{attrs:{xs12:""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-card",{on:{click:function(i){return i.stopPropagation(),t.playSonglist(i)}}},[s("v-card-title",[s("v-icon",[t._v("mdi-play-circle-outline")]),s("span",{staticClass:"pl-2 font-weight-bold"},[t._v("播放全部")]),s("span",{staticClass:"pl-1 caption"},[t._v("(共"+t._s(t.songscount)+"首)")])],1)],1)],1)],1)],1)],1)],1)],1),t.showSonglist?s("v-flex",{style:{paddingTop:t.typeNavigatioHeight+"px",paddingBottom:t.musicHeight+"px"},attrs:{xs12:""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-card",{attrs:{flat:""}},[s("v-list",{attrs:{"two-line":""}},t._l(t.songs,function(i,a){return s("v-list-tile",{key:a,on:{click:function(s){return s.stopPropagation(),t.playSong({id:i.songid,type:i.type})}}},[t.songCurrentId==i.songid?[s("v-list-tile-action",[s("v-icon",{attrs:{color:"cyan"}},[t._v("mdi-volume-high")])],1),s("v-list-tile-content",[s("v-list-tile-title",{staticClass:"cyan--text"},[t._v(t._s(i.songname))]),s("v-list-tile-sub-title",{staticClass:"cyan--text"},[t._v("\n                    "+t._s(i.artist)+"\n                  ")])],1)]:[s("v-list-tile-action",[t._v(t._s(a+1))]),s("v-list-tile-content",[s("v-list-tile-title",[t._v(t._s(i.songname))]),s("v-list-tile-sub-title",[t._v("\n                    "+t._s(i.artist)+"\n                  ")])],1)],s("v-list-tile-action",[s("v-badge",{attrs:{color:"warning",value:!i.hasplayurl},scopedSlots:t._u([{key:"badge",fn:function(){return[s("v-icon",{attrs:{dark:"",small:""}},[t._v("mdi-cancel")])]},proxy:!0}],null,!0)},[s("v-icon",[t._v("mdi-play-box-outline")])],1)],1)],2)}),1)],1)],1)],1)],1):t._e()],1)},e=[],n=s("cebc"),o=(s("c5f6"),s("365c")),r=s("2f62"),l={created:function(){var t=this;o["a"][this.$route.params.type].getSongList(this.$route.params.id).then(function(i){var s=i.data.data.list;t.songs=s.songs.map(function(t){for(var i in t)if("artist"===i){t.artist=t.artist.join(" / ");break}return t}),t.songscount=s.songs.length,t.listcover=s.listcover,t.listname=s.listname,t.creatorname=s.creatorname,t.creatoravatar=s.creatoravatar,t.listdescription=s.listdescription}).catch(function(t){return console.log(t)}),this.$emit("addArrow",!0)},beforeDestroy:function(){this.$emit("removeArrow",!1)},data:function(){return{typeNavigatioHeight:null,songs:null,songscount:0,listcover:"",listname:"",creatorname:"",creatoravatar:"",listdescription:"",showSonglist:!1}},props:{toolbarHeight:{type:Number,required:!0}},computed:Object(n["a"])({},Object(r["c"])(["songCurrentId","playlist"]),{typeNavigationStyle:function(){return{position:"fixed",top:this.toolbarHeight+"px",left:0,background:"#fff",zIndex:1}},musicHeight:function(){return this.playlist.length>0?60:0}}),methods:{imgLoad:function(){this.typeNavigatioHeight=this.$refs.typeNavigation.clientHeight,this.showSonglist=!0},playSong:function(t){var i=t.id,s=t.type;this.$bus.$emit("playSong",{id:i,type:s})},playSonglist:function(){this.$bus.$emit("playSonglist",this.songs)}}},c=l,v=s("2877"),p=Object(v["a"])(c,a,e,!1,null,null,null);i["default"]=p.exports}}]);
//# sourceMappingURL=songlist.6d0f95bf.js.map