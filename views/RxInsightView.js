define([
  'https://cdn.jsdelivr.net/npm/diff@5.1.0/dist/diff.min.js',
  'component/gIcon',
  'component/drugImgBox',
  'component/searchBar'
],function(Diff, gIcon, drugImgBox, searchBar){
  function addStyle(text){
    return "<mark>"+text+"</mark>"
  }
  
function deleteStyle(text){
  return "<del class='text-error'>"+text+"</del>"
}

function highlightChange(o,n){
  var diff = Diff.diffWords(o,n, {ignoreCase: true})
  return diff.map(function(part){
    return part.added ? addStyle(part.value) : (part.removed? deleteStyle(part.value) : part.value)
  }).join("")
}


  return {
    data: function(){return{
      err: null,
      boxtext: typeof cases == 'undefined'?[]:cases[1],
      loading: false,
      rxs: [],
      chosen: [],
      drugNames: [],
      drugBox: [],
      searchDrug: '',
      showDrugImg: null,
    }},
    mounted: function(){
      this.input()
    },
    components: {
      'search-bar': searchBar,
      'g-icon': gIcon,
      'drug-image-box': drugImgBox,
    },
    template:'\
    <div class="container text-tiny" id="main">    \
      <div class="columns">\
        <div class="col-9 column">\
          <div class="form-group">\
            <label class="form-label" for="input">INPUT</label>\
            <textarea class="form-input" id="input" type="text" v-model="boxtext" @input="input" @focus="$event.target.select()"\
              spellcheck="false" autofocus stlye="width: 100%"></textarea>\
          </div>\
        </div>\
        <div class="col-3 column">\
          <div class="p-bottom">\
            <div class="loading loading-lg"  v-show="loading"></div>\
          </div>\
        </div>\
      </div>\
      <hr>\
      <div class="columns">\
        <div class="col-3 column" id="Rxlist" stle="max-height: 40em;overflow-y: auto;">\
          <div class="form-group">\
            <template v-for="(rx, i) in rxs">\
              <label class="form-checkbox" :for="rx.id"> <!--ref="rx"-->\
                <input type="checkbox" :id="rx.id" :value="i" \
                  @change="sortrx" \
                  v-model.number="chosen" \
                  :disabled="chosen.length>1 && chosen.indexOf(i)==-1">\
                <i class="form-icon"></i> {{rx.date + \' \' + rx.hospital + \' \' + rx.spec}}\
              </label>\
            </template>\
          </div>\
        </div>\
        <div class="col-9 column">\
          <template v-if="chosen.length > 0">\
            <template v-for="row in rxTable(rxs[chosen[0]].drugs,rxs[chosen[chosen.length-1]].drugs)">\
              <!-- tile details -->\
              <div class="tile tile-centered" @click="seeDrug(row[0])">\
                <div class="tile-content">\
                  <div class="popover popover-right">\
                    <div class="popover-container">\
                      <div class="btn-group">\
                        <button @click.stop="getPhoto(row[0])" class="btn btn-sm"><g-icon icon="photo_camera"/></button>\
                        <button @click.stop="window.open(\'https://www.dynamed.com/results?q=\'+ row[0], \'_blank\')"\
                          class="btn btn-sm">DynaMed</button>\
                        <button @click.stop="window.open(\'https://www.uptodate.com/contents/search?search=\'+ row[0], \'_blank\')"\
                          class="btn btn-sm">UpToDate</button>\
                      </div>\
                    </div>\
                    <div class="tile-title"><strong><span v-html="row[1]"/></strong></div>\
                    <div id="drugcontent" v-html="row[2]" stle="white-space: pre-wrap;"></div>\
                  </div>\
                </div>\
                <div class="tile-action btn-group">\
                  <template v-for="hint in row[3]">\
                    <button v-if="getPharmAlertIcon(hint)" class="btn btn-sm tooltip tooltip-left btn-link" :data-tooltip="hint" :key="hint"><g-icon\
                        :icon="getPharmAlertIcon(hint)" /></button>\
                  </template>\
                </div>\
              </div>\
            </template>\
          </template>\
        </div>\
      </div>\
      <drug-image-box :name.sync="showDrugImg"></drug-image-box>\
      <hr>\
      <div class="row">\
        <div class="col" id="searchBar">\
          <search-bar :arr="drugNames" :add="searchDrug" @choices="drugChoiceChanged"></search-bar>\
          <table ref="drug-details" class="table table-striped table-hover">\
            <tr v-for="rx in drugBox">\
              <td><a @click="findrx(rx.id)" >{{rx.date}} {{rx.hospital}} {{rx.spec}}</a></td>\
              <td>\
                <span v-for="drug in rx.drugs">\
                <strong>{{drug.name.n}}</strong> {{drug.name.gen}} {{drug.form}} {{drug.strength}} {{drug.content}}<br>\
                </span>\
              </td>\
            </tr>\
          </table>\
        </div>\
      </div>\
    </div>',
    methods:{
      rxTable: function(n,o){
        var j = 0 // b index
        var rows = []
        outer:
        for (i=0;i<n.length;i++) { // a index
          var temp = n[i]
          while (j < o.length){
            if (temp.name.n == o[j].name.n || temp.name.n == o[j].name.gen) {
              rows.push([temp.name.n, temp.name.n, highlightChange(o[j].content, temp.content),temp.pharmalert])
              j++
              continue outer
            }
            if (temp.name.n.localeCompare(o[j].name.n) < 0){
              // new is new
              rows.push([temp.name.n, addStyle(temp.name.n), addStyle(temp.content), temp.pharmalert])
              continue outer
            }
            if (temp.name.n.localeCompare(o[j].name.n) > 0){
              // old is removed
              rows.push([o[j].name.n, deleteStyle(o[j].name.n), deleteStyle(o[j].content), o[j].pharmalert])
              j++
            }
          }
          rows.push([n[i].name.n, addStyle(n[i].name.n), addStyle(n[i].content), n[i].pharmalert])
        }
        for (; j < o.length; j++){
          rows.push([o[j].name.n, deleteStyle(o[j].name.n), deleteStyle(o[j].content), o[j].pharmalert])
        }
        return rows
      },
      getPharmAlertIcon: function(hint){
        switch(hint){
          case "Continue with own stock" : return 'inventory_2';
          case "Single use" : return 'counter_1';
          case "Purchase by patient" : return 'attach_money';
          case "Medication Alert" : return 'warning';
          case "Dispense by pharmacy" : return null;
          case "Chargeable item" : return null;
          case "Dangerous drug" : return 'skull';
          case "Fixed period" : return 'schedule';
          case "Dispense in clinic" : return 'approval_delegation';
          default: return 'comment'
        }
      },
      input: function(){
        const that = this
        const text = this.boxtext
        const match = /Order Date\tHospital\tSpecialty\tPrescription Type\tRef\. No\./.exec(text)
        // actual updating
        this.loading = true
        this.drugNames = []
        this.rxs = []
        this.drugBox= []
        this.chosen = []
        if (!match){
          that.loading = false // finished
          return
        }

        var worker;
        try{
          worker = new Worker("./worker.js") // IE mode
        }catch(e){
          worker = new Worker('data:text/javascript,\nonmessage = '+ onmessage.toString()) // Chrome mode
        }
        
        worker.onmessage = function(event){
          that.rxs = event.data.Rxs
          that.drugNames = event.data.drugNames
          that.loading = false // finished
          if (that.rxs&&that.rxs.length > 0){
            that.chosen = [0,1]
          }
        }
        worker.onerror = function(event){  
          event.name="Web Worker error" 
          that.loading = false // finished
          that.show = true
          that.err = event
        }
        worker.postMessage(text.substring(match.index))
      },
      findrx: function(id){
        var i = this.rxs.indexOf(this.rxs.filter(function(rx){return rx.id==id})[0])
        if (i!=-1){
          this.chosen = [i]
          //this.$refs['rx'][i].scrollIntoView({ behavior: "smooth", block: "center" })
        }
      },
      sortrx: function(){
        this.chosen.sort()
      },
      seeDrug: function(drug){
        this.searchDrug = drug
        //this.$refs['drug-details'].scrollIntoView({ behavior: "smooth" })
      },
      getPhoto: function(n){
        this.showDrugImg=n
      },
      drugChoiceChanged: function(choices){
        if (this.rxs){
          var drugmap = this.rxs.map(function(Rx){
            var filteredDrugs = Rx.drugs.filter(function(drug){
              return choices.indexOf(drug.name.n)>-1 || choices.indexOf(drug.name.gen)>-1
            })
            if (filteredDrugs.length>0){
              return {
                  drugs: filteredDrugs,
                  id: Rx.id,
                  hospital: Rx.hospital,
                  spec: Rx.spec,
                  date: Rx.date
              }
            }
          }).filter(function(v){return v}) // remove empty
          this.drugBox = drugmap
        }
      }
    }
  }
})