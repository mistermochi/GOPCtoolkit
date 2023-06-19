define(function(){
    return {
        props:['arr', 'add'],
        data: function(){return{
          currentFocus: null,
          search: '',
          options: [],
          selected: [],
          suggest: [],
          drugDB: []
        }},
        watch: {
          arr: function (newValue){
            this.options = newValue
            for (var i in newValue){
              console.log(this.drugDB.filter(function (line) { return line[1].indexOf(newValue[i]) > -1 || line[2].indexOf(newValue[i]) > -1 }))
            }
              
          },
          add: function (newValue){
            this.addSelected(newValue)
          }
        },
        mounted: function(){
          const that = this
          // find functionality
          window.addEventListener('keydown', function(ev) {
            if (ev.key=="f"&&(ev.metaKey||ev.ctrlKey)){
              ev.preventDefault()
              that.$refs.searchInput.focus()
            }
          })
          const xhr = new XMLHttpRequest()
          xhr.addEventListener("load", reqListener)
          xhr.addEventListener("error", onErr)
          xhr.open("GET", "https://cdn.jsdelivr.net/gh/mistermochi/GOPCtoolkit@main/drugdata.csv",true)
          xhr.send()
          function reqListener () {
            that.drugDB = xhr.responseText.split('\n').map(function(v){ return v.split(',') })
          }
          function onErr (e) {
            alert('xhr.onerror',e)
          }
        },
        template:'<div class="form-autocomplete">\
          <!-- autocomplete input container -->\
          <ul class="menu" v-if="currentFocus!=null">\
            <template v-for="(s,i) in suggest">\
              <li class="menu-item" @mousedown="addSelected(s.name)" :key="i">\
                <a href="#" :class="{active: i==currentFocus }">\
                  <div class="tile tile-centered">\
                    <div class="tile-content" v-html="s.text"></div>\
                  </div>\
                </a>\
              </li>\
            </template>\
          </ul>\
          <div class="form-autocomplete-input form-input">\
            <!-- autocomplete chips -->\
            <template v-for="(s,i,c) in selected">\
              <div class="chip" :key="s"><span class="text-ellipsis">{{s}}</span><a @click="sliceSelected(i)" class="btn btn-clear" aria-label="Close" role="button"></a></div>\
            </template>\
            <!-- autocomplete real input box -->\
            <input class="form-input" id="drugsearch" ref="searchInput" v-model="search" v-on:input="input($el)"\
             @keyup.up="up" @keyup.down="down" @keyup.enter="enter" @keydown.delete="del" \
             @blur="offFocus()" placeholder="Search...">\
          </div>\
        \
          <!-- autocomplete suggestion list -->\
        </div>',
        methods:{
          addSelected: function(n){
            if (this.selected.indexOf(n)==-1){
              this.selected.push(n)
              this.$emit('choices', this.selected)
            }
            this.offFocus()
          },
          sliceSelected: function(i){
            this.selected.splice(i,1)
            this.$emit('choices', this.selected)
          },
          /*execute a function when someone writes in the text field:*/
          input: function(){
            const val = this.search;
            this.currentFocus = -1;
            
            var suggest = []
            if (val.length>1)
              for (let i = 0; i < this.options.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                var index = this.options[i].indexOf(val.toUpperCase())
                if (index > -1) {
                  /*create a DIV element for each matching element:*/
                  suggest.push(
                    { text: this.options[i].substr(0, index)   + "<strong>" + this.options[i].substr(index, val.length) + "</strong>" + this.options[i].substr(index+val.length),
                    name: this.options[i]})
                  
                }
                if (suggest.length>6) break
              }
            this.suggest = suggest
            if (suggest.length==1) // only 1 match
              this.addSelected(suggest[0].name)
          },
          /*execute a function presses a key on the keyboard:*/
          down: function(){
            this.currentFocus<this.suggest.length-1 && this.currentFocus++
          },
          up: function(){
            this.currentFocus>0 && this.currentFocus--
          },
          enter: function(){
            (this.currentFocus > -1) && this.addSelected(this.suggest[this.currentFocus].name)
          },
          del: function(){
            if (this.search.length == 0)
              this.selected.pop()
            this.$emit('choices', this.selected)
          },
          offFocus: function(){
            this.currentFocus = null
            this.search = ''
          }
        }
      }
})