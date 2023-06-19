define(function (){ 
  
  if (!Array.prototype.find) { // polyfill
    Array.prototype.find = function (callback) {
        return callback && (this.filter(callback) || [])[0]
    }
  }
  
  let ixDB = {
    getNames: function(){
      if (this.out) return this.out  //cached
      this.out = {}
      for (var k1 in ixDB.classes){
        this.out[k1] = []
        for (var k2 in ixDB.classes[k1]){
          this.out[k1][k2] = ixDB.classes[k1][k2].concat(k2)  // add name into alias
        }
      }
      return this.out
    },
    classes: {
      bld: {
        "AM cortisol": [],
        "Cortisol": [],
        "ACTH": [],
        "TSH": [],
        "T4": ['fT4'],
        "T3": ['fT3'],
        "TFT": [],
        "A1c": ['HbA1c'],
        "FG": ['FBS'],
        "TC": [],
        "HDL": ['HDLC'],
        "LDL": ['LDLC'],
        "Chol": [],
        "TG": [],
        "Lipid": ['liplid'],  // common typo
        "OGTT": [],
        "LFT": [],
        "ALT": [],
        "ALP": [],
        "AFP": [],
        "GGT": [],
        "AST": [],
        "TB": [],
        "DB": [],
        "Bili": ['Bilirubin'],
        "TP": [],
        "Alb": ['Albumin'],
        "HBsAg": [],
        "Anti-HBs": [],
        "Anti-HBc": [],
        "Anti-HCV": [],
        "HBVDNA": ["HBV DNA \\(Viral Load\\),? RT-PCR",'HBV DNA','HBV-DNA'],
        "LRFT": ['RLFT','L\\/RFT'],
        "RFT": [],
        "Cr": [],
        "eGFR": [],
        "Na": [],
        "K": [],
        "CaPO4": ['CaPO','Ca\\/PO'],
        "Ca": [],
        "PO4": [],
        "Urate": [],
        "UA": [],
        "Ck": [],
        "LDH": [],
        "Hb": [],
        "CBC": ["CBP"],
        "WCC": [],
        "WBC": [],
        "PLT": [],
        "MCV": [],
        "MCH": [],
        "Retic": ['reticulocyte'],
        "HbP": [],
        "FOB": [],
        "Ferritin": [],
        "Fe": ["Iron"],
        "B12": ["Vit B12", "Vitamin B12"],
        "Folate": [],
        "INR": [],
        "Clotting": [],
        "ESR": [],
        "CRP": [],
        "RF": [],
        "ANA": [],
        "Anti-dsDNA": [],
        "ENA": [],
        "ACR": ["uACR"],
        "uPCR": [],
        "PCR": [],
        "Syphilis": [],
        "VDRL": [],
        "SPE": [],
        "BJP": [],
        "Paraprotein": [],
        "CEA": [],
        "CA125": [],
        "EBV VCA": []
      },
        
      cst: {
        "Sputum":["spt"], 
        "MSU":[], 
        "EMU":[], 
        "CSU": [], 
        "Stool":[], 
        "Nail":[], 
        "HVS": [], 
        "Swab": []
      },
  
      img: {
          "CTA": ["CT angiogram"],
          "CTB": ["CT brain"],
          "CTCA": ["CT coronary angiogram"],
          "CT": ['computer tomography'],
          "MRI": ["Magnetic Resonance Imaging"],
          "MRA": [],
          "USG": ["ultrasound", "USS"],
          "Fibroscan": [],
          "CXR": ["chest xr",'Chest X-ray'],
          "KUB": [],
          "AXR": ["abdomen xr"],
          "XR": ["Xray","x-ray","x ray"],
          "PET": [],
          "PETCT": [],
          "DEXA": ["BONE DENSITOMETRY \\(DXA\\) REPORT"],
          "Echo":["Echocardiogram","TTE"],
          "SPECT":[],
      },
  
      bedside: {
        "ECG":[], 
        "Spirometry":[],
      },
      riskassess: {
        "ABPM":[], 
        "MRAM":[],
        "DMCS":[],
        "RAMP":[],
        "RDMA":[],
        "RP":[], //retinal photo
        "RHTA":["RHTIA","RHT-IA","RHT"],
      },
      home: {
        "HBPM":["Home BP machine"]
      },
    
    }
  }
  
  const datepattern = /([0-9]+[\/-]){1,2}[0-9]{2,}(?!\.)/g
  
  function Lex(input, opt) {
    this.input = input
    this.tokens = []
    this.concat = function (a1, a2, a3) {
      return Array.prototype.concat(a1, a2, a3).filter(function (val) { return val }) // filter NULL
    }
    this.toDate = function (dateString) {
      let parts = dateString.split(/[\/-]/g)
      let d = m = y = 0
      if (parts.length === 3) {
        d = parseInt(parts[0])
        m = parseInt(parts[1]) - 1
        y = parseInt(parts[2])
      } else if (parts.length === 2) {
        m = parseInt(parts[0]) - 1
        y = parseInt(parts[1])
        d = 1
      } else {
        throw new Error("Invalid date")
      }
      if (m<0 || m>11 || d<1 || d>31) throw new Error("Invalid date")
      if (y < 100){
        //two digits
        y += (y+2000 <= new Date().getFullYear()) ? 2000 : 1900
      }else if (y < 1000){
        //3 digits??
        throw new Error("Invalid date")
      }
      let date = new Date(y, m, d)
      date.display = (date.getMonth() + 1) + "/" + date.getFullYear().toString().substr(-2)
      return date
    }
  
    this.parseString = function (str, row, col) {
      // if not an empty string
      if (!str || !str.trim().length) {
        return null
      }
      var match
      match = datepattern.exec(str)
      if (match) {
        var dateString = match[0].replace(/(:$)/g,"")  //remove colons
        try{
          var date = this.toDate(dateString)
          date.raw = match[0]
          date.row = row
          date.col = col+match.index
          return this.concat(
            this.parseString(str.substring(0, match.index), row, col),
            { date: date },
            this.parseString(str.substring(match[0].length + match.index), row, col + match[0].length + match.index))
        }catch(e){
          console.log(match[0]+' is not a valid date')
          console.log(e)
        }
      }
  
      // isolate Ix
  
      for (var k1 in ixDB.getNames()) {
        for (var k2 in ixDB.getNames()[k1]) {
          for (var k3 in ixDB.getNames()[k1][k2]) {
            match = new RegExp("\\b" + ixDB.getNames()[k1][k2][k3] + "\\b", 'i').exec(str)
            if (match)
              return this.concat(
                this.parseString(str.substring(0, match.index), row, col),
                { ix: { 
                  test: k2, //test standard name 
                  raw: match[0],
                  type: k1,
                  row: row,
                  col: col+match.index
                } },
                this.parseString(str.substring(match[0].length + match.index), row, col + match[0].length + match.index))
          }
        }
      }
  
      // Remove verbosity
      if (str == "Latest results retrieved from ePR within 16 weeks of this consultation:")
        return null
  
      // Remove common units
      if (opt.units == "all") {
        str = str.replace(/\(CKD-EPI\)/g, "")
        str = str.replace(/(\[mg\/mmol\])/g, "")
        str = str.replace(/(\[U\/L\])/g, "")
        str = str.replace(/(\(mg\/mg\))/g, "")
        str = str.replace(/(IU\/mL)/g, "")
      }
  
      str = str.replace(/(^[\s,;:=]+|[\s,:;]+$)/g,"")  //remove starting, trailing signs
  
      // replace common words
      if (opt.rename == "all") {
        str = str.replace(/ (?:H|H ?↑| *↑)$/g, "↑")
        str = str.replace(/ (?:L|L ?↓| *↓)$/g, "↓")
      }
  
      return { text: str }
    }
  
    this.tokenize = function () {
      const that = this
      let inArray = this.input.split("\n").map(function(v,i){ return that.parseString(v, i, 0) }).filter(function(v){return v})
  
      console.log(inArray)
      // combine those without date to previous line if available.
      for (var i=0;i<inArray.length; i++){
        var firstDate = null;
        if (inArray[i].constructor === Array) 
          firstDate = inArray[i].find(function(v){ return v.date })
        if (!firstDate && i>0){
          if (inArray[i-1].constructor !== Array)
            inArray[i-1] = [inArray[i-1]]
          inArray[i-1] = inArray[i-1].concat({text:"\n"},inArray[i])
          inArray.splice(i,1)
          i--
        }
      }
      let outArray = []
      let lastToken = {}  //stores the last used token
  
      for (let i = 0; i < inArray.length; i++) {
        let obj = inArray[i]
        let outObj = {}
        let unparsed = ""
  
        if (!obj) continue;
  
        if (obj.text) {
          if (ix = lastToken.ix) { //finds last a/v Ix, append text
            let lastIx = ix[ix.length - 1]
            lastIx.text = strjoin(lastIx.text, "\n" + obj.text)
          } else
            outArray.push({ unparsed: obj.text })
          continue
        }
  
        for (let j = 0; j < obj.length; j++) {
          if (d = obj[j].date)
            if (!outObj.date)
              outObj.date = d
            else
              outObj.ix[outObj.ix.length - 1].text = strjoin(outObj.ix[outObj.ix.length - 1].text, " "+d.raw+" ") // second occurance of date, treat as unparsed text.
          if (ix = obj[j].ix) {
            if (!outObj.ix) outObj.ix = []
            outObj.ix.push(ix)
          }
          if (t = obj[j].text)
            if (!outObj.ix)
              unparsed += t + " "
            else
              outObj.ix[outObj.ix.length - 1].text = strjoin(outObj.ix[outObj.ix.length - 1].text, t)
        }
  
        if (unparsed !== "") outObj.unparsed = unparsed
  
        outArray.push(outObj)
        lastToken = outObj
      }
      console.log(outArray)
      this.tokens = outArray
    }
    this.sortByDate = function () {
      this.tokens.sort(function (a, b) {
        return (b.date - a.date)
      })
    }
    this.getTokens = function () { return this.tokens }
    this.getIxList = function () {
      let outStrings = []
      for (var key in ixDB.getNames())
        outStrings[key] = ''
      let unparsed = ''
      for (var i = 0; i < this.tokens.length; i++) {
        if (this.tokens[i].ix) {
          var raw = "\n" + 
            this.tokens[i].date.display + 
            (this.tokens[i].unparsed? " " + this.tokens[i].unparsed  : "") +
            this.tokens[i].ix.reduce(function(p, v){
              return p + " " + v.test + 
              (v.text? " " + v.text + "" : "")
            }, "")
          outStrings[this.tokens[i].ix[0].type] += raw
        } else
          unparsed += '\n' + strjoin(this.tokens[i].date? this.tokens[i].date.display+" ":null, this.tokens[i].unparsed)
      }
      let out = ''
      for (var key in ixDB.getNames())
        out += outStrings[key] + "\n"
      out += unparsed
      out = out.replace(/[^\S\r\n]{2,}/g, " ").trim() // trim white
      out += "\n"
      return out
    }
    this.queryLastIx = function (lastIx) {
      let found = this.tokens.find(function (token) {
        return token.ix && token.ix.find(function (v) { return lastIx.indexOf(v.test) > -1 })
      })
      if (found)
        return found.date.display +" "+ found.ix.find(function (v) { return lastIx.indexOf(v.test) > -1 }).text
    }
  }
  
  function strjoin(str1, str2){
    if (str1 && str2){
        const space = (str1[str1.length-1] === '\n' || str2[0] === '\n')?'':' '
        return str1+space+str2 // detect if two lines separated by \n, if not add space.
    } 
    if (str1 || str2) return str1||str2
  }
  
  return Lex 
  })