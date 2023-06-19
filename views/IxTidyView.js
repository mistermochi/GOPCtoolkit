define([
  'https://cdn.jsdelivr.net/npm/codemirror@5/lib/codemirror.min.js',
  'util/ixTidy'
],function(CodeMirror, Lex){
return{
  data: function(){
    return {
      cminput : null,
      input: "",
      output: "",
      A1c: "",
      LDL: "",
      eGFR: "",
      pasted: false,
      opt: {
        rename: "all",
        reorder: "on-with-sort",
        units: "all",
        normalize: "all",
      }
    }

  },
  mounted: function(){
    const that = this;

    this.cminput = CodeMirror(document.querySelector('#input'), {
      lineNumbers: true,
      tabSize: 2,
      smartIndent: false,
      autofocus: true,
      lineWrapping: true,
      //mode: 'custom',
    });

    this.cminput.setSize('100%','36em')
    this.cminput.on("inputRead", function(cminput){that.input = cminput.getValue()})
    this.cminput.on('paste', function() {that.pasted = true})
  },
  watch: {
    'opt': {
        handler: function () {
          this.update()
        },
        deep: true
    },
    'input': function() {
      // actual updating
      var out = this.input
      console.log(this.opt)
      var opt = this.opt
  
      // store Hx if pasted
      if (this.pasted){
        this.pasted = false
        
        // Interpret normal results
        if (opt.normalize == "all") {
          out = out.replace(/(Ur Albumin below analytica ...)/g, "N") //TKO
          out = out.replace(/(Ur Albumin or Ur Creatinin ...)/g, "N") //UCH
          out = out.replace(/(Triglycerides > 4.5 mmol\/L ...)/g,"*")
        }
  
        this.cminput.doc.setValue(out) 
      }
  
      let lex = new Lex(out, opt)
      lex.tokenize()
      
      // split
      if (opt.reorder != "off") {
        if (opt.reorder == "on-with-sort")
          lex.sortByDate()
        out = lex.getIxList(true)
        this.A1c = lex.queryLastIx(['A1c'])
        this.LDL = lex.queryLastIx(['LDL', 'Lipid', 'Chol'])
        this.eGFR = lex.queryLastIx(['eGFR'])
      }
      
      this.addStyles(this.cminput,lex.getTokens())
      this.output = out

    },
  },
  methods:{
    addStyles: function(cm, tokens) {
      cm.doc.getAllMarks().forEach(function(marker){marker.clear()})
      var changelist = []; // [row,col,length,type]
      for (var i = 0; i < tokens.length; i++) {
        if (d = tokens[i].date)
          cm.markText({line:d.row,ch:d.col},{line:d.row,ch:d.col+d.raw.length}, {css: "color: brown"})
        if (ix = tokens[i].ix)
          for (var j=0; j < ix.length; j++)
            cm.markText({line:ix[j].row,ch:ix[j].col},{line:ix[j].row,ch:ix[j].col+ix[j].raw.length}, {css: "color: royalblue"})
      }
    }
  },
  template:' <div>\
<div class="container text-tiny">\
<div class="columns">\
  <div class="column col-6">\
    <label class="form-label" for="input">INPUT</label>\
    <div id="input" style="height: 36em; font-family: consolas, monospace, sans-serif; font-size: 14px; line-height: 20px;"></div>\
  </div>\
  <div class="column col-6">\
    <label class="form-label" for="output">OUTPUT</label>\
    <textarea readonly id="output" style="height: 36em; width:100%; font-family: consolas, monospace, sans-serif; font-size: 14px; line-height: 20px;" v-model="output"></textarea>\
  </div>\
</div>\
</div>\
<div class="container">\
<form id="options" class="columns">\
  <div class="form-group column col-3">\
    <label class="form-label label-sm" for="rename">Rename words</label>\
    <select class="form-select select-sm" name="rename" id="rename" v-model="opt.rename">\
      <option value="all">All</option>\
      <option value="none">None</option>\
    </select>\
  </div>\
  <div class="form-group column col-3">\
    <label class="form-label label-sm" for="units">Remove units</label>\
    <select class="form-select select-sm" name="units" id="units" v-model="opt.units">\
      <option value="all">All</option>\
      <option value="none">None</option>\
    </select>\
  </div>\
  <div class="form-group column col-3">\
    <label class="form-label label-sm" for="units">Simplify normal</label>\
    <select class="form-select select-sm" name="normalize" id="normalize" v-model="opt.normalize">\
      <option value="all">All</option>\
      <option value="none">None</option>\
    </select>\
  </div>\
  <div class="form-group column col-3">\
    <label class="form-label label-sm" for="reorder">Reorder</label>\
    <select class="form-select select-sm" name="reorder" id="reorder" v-model="opt.reorder">\
      <option value="on-with-sort">On, Sort by date</option>\
      <option value="on-no-sort">On, Do not sort by date</option>\
      <option value="off">Off</option>\
    </select>\
  </div>\
</form>\
</div>\
<div class="container">\
<div class="columns">\
  <div class="card column col-6">\
    <div class="card-header">\
      <div class="card-title h5">Statistics</div>\
    </div>\
    <div class="card-body">\
      <ul>\
      <li>Last A1c: <span id="lastA1c">{{A1c}}</span></li>\
      <li>Last LDL: <span id="lastLDL">{{LDL}}</span></li>\
      <li>Last eGFR: <span id="lastEGFR">{{eGFR}}</span></li>\
      </ul>\
    </div>\
  </div>\
</div>\
</div>\
</div>\
'
}
})