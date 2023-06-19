onmessage = function(e){
  importScripts('https://cdn.jsdelivr.net/npm/nearley@2.20.1/lib/nearley.min.js');
  let drugNames = [];
  let saveDrugNames = function (name){
    if (name && drugNames.indexOf(name)==-1)
      drugNames.push(name)
  };
  let id = function (x){return x[0]};
  let grammar = nearley.Grammar.fromCompiled({
    Lexer: undefined,
    ParserRules: [
    {"name": "_", "symbols": ["Head", "ln", "Rxs"], "postprocess": function(d) { return d[2] }},
    {"name": "Rxs", "symbols": ["Rxs", "ln", "Rx"], "postprocess": function (d) { return d[0].concat(d[2]) }},
    {"name": "Rxs", "symbols": ["Rx"]},
    {"name": "Rx", "symbols": ["date", "t", "any", "t", "any", "t", "any", "t", "any", "ln", "Dgs"], "postprocess":  function (d) {
      console.log("Px on ",d[0])
      return {
        	date:d[0],
        	hospital: d[2],
        	spec: d[4],
        	type: d[6],
        	id: d[8],
        	drugs: d[10].sort(function(a,b){return a.name.n.localeCompare(b.name.n)})
        } } },
    {"name": "Dgs", "symbols": ["Dgs", "ln", "Dg"], "postprocess": function (d) { return d[0].concat(d[2]) }},
    {"name": "Dgs", "symbols": ["Dg"]},
    {"name": "Dg", "symbols": ["Days", "ln", "FMI", "ln", "PharmAlert", "ln", "DrugName", "ln", "multiline"], "postprocess":  function (d) {
      saveDrugNames(d[6].n)	
      saveDrugNames(d[6].gen)  
      return {
        	dates:d[0],
        	fmi:d[2],
        	pharmalert:d[4],
        	name:d[6],
        	content: d[8]
        } } },
    {"name": "Days", "symbols": ["any", "t", "any", "t", "date", "t", "date", "t"], "postprocess": function (d) { return {start: d[4], end:d[6]} }},
    {"name": "FMI$string$1", "symbols": [{"literal":"F"}, {"literal":"M"}, {"literal":" "}, {"literal":"i"}, {"literal":"n"}, {"literal":"d"}, {"literal":"i"}, {"literal":"c"}, {"literal":"a"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}, {"literal":" "}, {"literal":"e"}, {"literal":"x"}, {"literal":"i"}, {"literal":"s"}, {"literal":"t"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FMI", "symbols": ["FMI$string$1"]},
    {"name": "FMI", "symbols": [{"literal":" ","pos":126}], "postprocess":  function (d) { 
        	return d.filter(function(v){ return v&&(v!==" ")})
        } },
    {"name": "PharmAlert", "symbols": ["any", "t", "any", "t", "any", "t", "any", "t", "any", "t", "any"], "postprocess":  function (d) { 
        	return d.filter(function(v){ return v&&(v!==" ")})
        } },
    {"name": "DrugName$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["s", "DrugForm"]},
    {"name": "DrugName$ebnf$1$subexpression$1$ebnf$1", "symbols": ["DrugName$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "DrugName$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "DrugName$ebnf$1$subexpression$1$ebnf$2$subexpression$1$string$1", "symbols": [{"literal":" "}, {"literal":"<"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DrugName$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[^<>]/]},
    {"name": "DrugName$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[^<>]/, "DrugName$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "DrugName$ebnf$1$subexpression$1$ebnf$2$subexpression$1", "symbols": ["DrugName$ebnf$1$subexpression$1$ebnf$2$subexpression$1$string$1", "DrugName$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", {"literal":">","pos":182}]},
    {"name": "DrugName$ebnf$1$subexpression$1$ebnf$2", "symbols": ["DrugName$ebnf$1$subexpression$1$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "DrugName$ebnf$1$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "DrugName$ebnf$1$subexpression$1", "symbols": ["s", "SmDgTxt", "DrugName$ebnf$1$subexpression$1$ebnf$1", "DrugName$ebnf$1$subexpression$1$ebnf$2"]},
    {"name": "DrugName$ebnf$1", "symbols": ["DrugName$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "DrugName$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "DrugName", "symbols": ["BigDgTxt", "DrugName$ebnf$1"], "postprocess":  function (d) {
        	var inbracket = null
        	var nonbracket = d[0]	
          var match = /\((.*)\)$/.exec(d[0])
        	if (match){
        		inbracket = match[1]
        		nonbracket = d[0].substring(0,match.index).trim()
        	}
        	if (inbracket && inbracket.toUpperCase() == inbracket && nonbracket.toUpperCase() != nonbracket){
        		var temp = nonbracket
        		nonbracket = inbracket
        		inbracket = temp
        	}
        	let out = {n: nonbracket.toUpperCase(), gen:inbracket?inbracket.toUpperCase():null}
        	if(d[1]){
        		out.form = d[1][1]
        		out.strength = d[1][2]?d[1][2][1]:null
        		out.class = d[1][3]?d[1][3][1]:null
        	}
        	return out
        } },
    {"name": "BigDgTxt", "symbols": ["BigDgTxt", "s", "BigCase"], "postprocess":  function (d) {
        	return d[0]+" "+d[2]
        } },
    {"name": "BigDgTxt", "symbols": ["BigCase"], "postprocess": id},
    {"name": "BigCase$ebnf$1", "symbols": []},
    {"name": "BigCase$ebnf$1", "symbols": [/[A-Za-z0-9,/+%.\-&():]/, "BigCase$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "BigCase", "symbols": [/[A-Z0-9,/+%.\-&(:]/, "BigCase$ebnf$1"], "postprocess":  function(d) {
        	return d[0]+d[1].join("")
        } },
    {"name": "DrugForm$ebnf$1", "symbols": [/[^\t\n\r<>]/]},
    {"name": "DrugForm$ebnf$1", "symbols": [/[^\t\n\r<>]/, "DrugForm$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "DrugForm", "symbols": ["BigCase", "s", "DrugForm$ebnf$1"], "postprocess":  function (d) {
        	return d[0]+" "+d[2]
        } },
    {"name": "DrugForm", "symbols": ["BigCase"], "postprocess": id},
    {"name": "SmDgTxt$ebnf$1", "symbols": [/[a-z/]/]},
    {"name": "SmDgTxt$ebnf$1", "symbols": [/[a-z/]/, "SmDgTxt$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "SmDgTxt", "symbols": ["SmDgTxt", "s", "SmDgTxt$ebnf$1"], "postprocess": function(d) {return d[0]+" "+d[2].join("")}},
    {"name": "SmDgTxt$ebnf$2", "symbols": [/[a-z/]/]},
    {"name": "SmDgTxt$ebnf$2", "symbols": [/[a-z/]/, "SmDgTxt$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "SmDgTxt", "symbols": ["SmDgTxt$ebnf$2"], "postprocess": function(d) {return d[0].join("")}},
    {"name": "date", "symbols": ["int", {"literal":"/","pos":263}, "int", {"literal":"/","pos":267}, "int"], "postprocess": function (d) { return d[0]+"/"+d[2]+"/"+d[4] }},
    {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$1", "symbols": [/[0-9]/, "int$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "int", "symbols": ["int$ebnf$1"], "postprocess": function(d) {return d[0].join("")}},
    {"name": "t", "symbols": [/[\t]/], "postprocess": function(d) {return null }},
    {"name": "s", "symbols": [{"literal":" ","pos":294}], "postprocess": function(d) {return null }},
    {"name": "ts$ebnf$1", "symbols": [/[\t\s]/]},
    {"name": "ts$ebnf$1", "symbols": [/[\t\s]/, "ts$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "ts", "symbols": ["ts$ebnf$1"], "postprocess": function(d) {return null }},
    {"name": "ln", "symbols": [/[\n]/], "postprocess": function(d) {return null }},
    {"name": "multiline", "symbols": ["multiline", "ln", "any"], "postprocess": function(d) {return d[0]+"\n"+d[2] }},
    {"name": "multiline", "symbols": ["any"], "postprocess": id},
    {"name": "any$ebnf$1", "symbols": []},
    {"name": "any$ebnf$1", "symbols": [/[^\t\n\r]/, "any$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "any", "symbols": ["any$ebnf$1"], "postprocess": function(d) {return d[0].join("")}},
    {"name": "Head$ebnf$1", "symbols": []},
    {"name": "Head$ebnf$1", "symbols": ["ln", "Head$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "Head$string$1", "symbols": [{"literal":"O"}, {"literal":"r"}, {"literal":"d"}, {"literal":"e"}, {"literal":"r"}, {"literal":" "}, {"literal":"D"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"\t"}, {"literal":"H"}, {"literal":"o"}, {"literal":"s"}, {"literal":"p"}, {"literal":"i"}, {"literal":"t"}, {"literal":"a"}, {"literal":"l"}, {"literal":"\t"}, {"literal":"S"}, {"literal":"p"}, {"literal":"e"}, {"literal":"c"}, {"literal":"i"}, {"literal":"a"}, {"literal":"l"}, {"literal":"t"}, {"literal":"y"}, {"literal":"\t"}, {"literal":"P"}, {"literal":"r"}, {"literal":"e"}, {"literal":"s"}, {"literal":"c"}, {"literal":"r"}, {"literal":"i"}, {"literal":"p"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}, {"literal":" "}, {"literal":"T"}, {"literal":"y"}, {"literal":"p"}, {"literal":"e"}, {"literal":"\t"}, {"literal":"R"}, {"literal":"e"}, {"literal":"f"}, {"literal":"."}, {"literal":" "}, {"literal":"N"}, {"literal":"o"}, {"literal":"."}, {"literal":"\n"}, {"literal":" "}, {"literal":"\t"}, {"literal":" "}, {"literal":"\t"}, {"literal":"S"}, {"literal":"t"}, {"literal":"a"}, {"literal":"r"}, {"literal":"t"}, {"literal":" "}, {"literal":"D"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"\t"}, {"literal":"E"}, {"literal":"n"}, {"literal":"d"}, {"literal":" "}, {"literal":"D"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"\t"}, {"literal":" "}, {"literal":"\t"}, {"literal":"P"}, {"literal":"r"}, {"literal":"e"}, {"literal":"s"}, {"literal":"c"}, {"literal":"r"}, {"literal":"i"}, {"literal":"p"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Head", "symbols": ["Head$ebnf$1", "Head$string$1"], "postprocess": function(d) {return null }}
]
  , ParserStart: "_"
}
  )
      const parser = new nearley.Parser(grammar)
      parser.feed(e.data)
      postMessage({Rxs:parser.results[0], drugNames:drugNames})
  }