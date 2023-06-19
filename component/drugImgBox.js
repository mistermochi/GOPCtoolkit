define([
  'component/gIcon',
  'util/fetch'
],function(gIcon, fetch){
    return{
        props:['name'],
        data: function(){return{
          drugDB: [],
          drugVariant: [],
        }},
        watch: {
          name: function (n){
            if (n)
              this.drugVariant = this.drugDB.filter(function(v){ return v[1].indexOf(n) > -1 || v[2].indexOf(n) > -1})
            else
              this.$emit('update:name', null)
          }
        },
        components: {
          'g-icon': gIcon,
        },
        mounted: function(){
          const that = this
          fetch("https://cdn.jsdelivr.net/gh/mistermochi/GOPCtoolkit@main/drugdata.csv",function(result){
              that.drugDB = result.split('\n').map(function(v){ return v.split(',') })
          })
        },
        template:'<div class="modal modal-lg" :class="{active: name? true: false}" id="drugImgBox">\
        <a class="modal-overlay" aria-label="Close" @click="name = null"></a>\
        <div class="modal-container">\
          <div class="modal-header">\
            <a class="btn btn-link float-left" href="https://uchapp/DrugHandBook/"><g-icon icon="menu_book"/></a>\
            <a class="btn btn-clear float-right" aria-label="Close" @click="name = null"></a>\
            <div class="modal-title h5">{{name}}</div>\
          </div>\
          <div class="modal-body">\
            <div class="content" id="drugImgBoxInner" style="overflow: scroll;max-height: 520px;">\
              <div v-for="drug in drugVariant">\
                <img style="max-height: 300px;" :src="\'https://uchapp/DrugHandBook/Images/Drugs/\'+drug[0]+\'.JPG\'"/>\
                <p class="text-center">{{drug[3]}} {{drug[1]}} {{drug[2]}}</p>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>\
      '
      }
})