onmessage = function(e){
  importScripts('https://cdn.jsdelivr.net/npm/nearley@2.20.1/lib/nearley.min.js');
    
!function(t,e){"object"==typeof module&&module.exports?module.exports=e():t.nearley=e()}(this,(function(){function t(e,r,i){return this.id=++t.highestId,this.name=e,this.symbols=r,this.postprocess=i,this}function e(t,e,r,i){this.rule=t,this.dot=e,this.reference=r,this.data=[],this.wantedBy=i,this.isComplete=this.dot===t.symbols.length}function r(t,e){this.grammar=t,this.index=e,this.states=[],this.wants={},this.scannable=[],this.completed={}}function i(t,e){this.rules=t,this.start=e||this.rules[0].name;var r=this.byName={};this.rules.forEach((function(t){r.hasOwnProperty(t.name)||(r[t.name]=[]),r[t.name].push(t)}))}function n(){this.reset("")}function s(t,e,s){if(t instanceof i){var o=t;s=e}else o=i.fromCompiled(t,e);for(var a in this.grammar=o,this.options={keepHistory:!1,lexer:o.lexer||new n},s||{})this.options[a]=s[a];this.lexer=this.options.lexer,this.lexerState=void 0;var h=new r(o,0);this.table=[h];h.wants[o.start]=[],h.predict(o.start),h.process(),this.current=0}function o(t){var e=typeof t;if("string"===e)return t;if("object"===e){if(t.literal)return JSON.stringify(t.literal);if(t instanceof RegExp)return t.toString();if(t.type)return"%"+t.type;if(t.test)return"<"+String(t.test)+">";throw new Error("Unknown symbol type: "+t)}}return t.highestId=0,t.prototype.toString=function(t){var e=void 0===t?this.symbols.map(o).join(" "):this.symbols.slice(0,t).map(o).join(" ")+" ● "+this.symbols.slice(t).map(o).join(" ");return this.name+" → "+e},e.prototype.toString=function(){return"{"+this.rule.toString(this.dot)+"}, from: "+(this.reference||0)},e.prototype.nextState=function(t){var r=new e(this.rule,this.dot+1,this.reference,this.wantedBy);return r.left=this,r.right=t,r.isComplete&&(r.data=r.build(),r.right=void 0),r},e.prototype.build=function(){var t=[],e=this;do{t.push(e.right.data),e=e.left}while(e.left);return t.reverse(),t},e.prototype.finish=function(){this.rule.postprocess&&(this.data=this.rule.postprocess(this.data,this.reference,s.fail))},r.prototype.process=function(t){for(var e=this.states,r=this.wants,i=this.completed,n=0;n<e.length;n++){var o=e[n];if(o.isComplete){if(o.finish(),o.data!==s.fail){for(var a=o.wantedBy,h=a.length;h--;){var l=a[h];this.complete(l,o)}if(o.reference===this.index){var p=o.rule.name;(this.completed[p]=this.completed[p]||[]).push(o)}}}else{if("string"!=typeof(p=o.rule.symbols[o.dot])){this.scannable.push(o);continue}if(r[p]){if(r[p].push(o),i.hasOwnProperty(p)){var u=i[p];for(h=0;h<u.length;h++){var f=u[h];this.complete(o,f)}}}else r[p]=[o],this.predict(p)}}},r.prototype.predict=function(t){for(var r=this.grammar.byName[t]||[],i=0;i<r.length;i++){var n=r[i],s=this.wants[t],o=new e(n,0,this.index,s);this.states.push(o)}},r.prototype.complete=function(t,e){var r=t.nextState(e);this.states.push(r)},i.fromCompiled=function(e,r){var n=e.Lexer;e.ParserStart&&(r=e.ParserStart,e=e.ParserRules);var s=new i(e=e.map((function(e){return new t(e.name,e.symbols,e.postprocess)})),r);return s.lexer=n,s},n.prototype.reset=function(t,e){this.buffer=t,this.index=0,this.line=e?e.line:1,this.lastLineBreak=e?-e.col:0},n.prototype.next=function(){if(this.index<this.buffer.length){var t=this.buffer[this.index++];return"\n"===t&&(this.line+=1,this.lastLineBreak=this.index),{value:t}}},n.prototype.save=function(){return{line:this.line,col:this.index-this.lastLineBreak}},n.prototype.formatError=function(t,e){var r=this.buffer;if("string"==typeof r){var i=r.split("\n").slice(Math.max(0,this.line-5),this.line),n=r.indexOf("\n",this.index);-1===n&&(n=r.length);var s=this.index-this.lastLineBreak,o=String(this.line).length;return e+=" at line "+this.line+" col "+s+":\n\n",e+=i.map((function(t,e){return a(this.line-i.length+e+1,o)+" "+t}),this).join("\n"),e+="\n"+a("",o+s)+"^\n"}return e+" at index "+(this.index-1);function a(t,e){var r=String(t);return Array(e-r.length+1).join(" ")+r}},s.fail={},s.prototype.feed=function(t){var e,i=this.lexer;for(i.reset(t,this.lexerState);;){try{if(!(e=i.next()))break}catch(t){var s=new r(this.grammar,this.current+1);throw this.table.push(s),(h=new Error(this.reportLexerError(t))).offset=this.current,h.token=t.token,h}var o=this.table[this.current];this.options.keepHistory||delete this.table[this.current-1];var a=this.current+1;s=new r(this.grammar,a);this.table.push(s);for(var h,l=void 0!==e.text?e.text:e.value,p=i.constructor===n?e.value:e,u=o.scannable,f=u.length;f--;){var c=u[f],y=c.rule.symbols[c.dot];if(y.test?y.test(p):y.type?y.type===e.type:y.literal===l){var m=c.nextState({data:p,token:e,isToken:!0,reference:a-1});s.states.push(m)}}if(s.process(),0===s.states.length)throw(h=new Error(this.reportError(e))).offset=this.current,h.token=e,h;this.options.keepHistory&&(o.lexerState=i.save()),this.current++}return o&&(this.lexerState=i.save()),this.results=this.finish(),this},s.prototype.reportLexerError=function(t){var e,r,i=t.token;return i?(e="input "+JSON.stringify(i.text[0])+" (lexer error)",r=this.lexer.formatError(i,"Syntax error")):(e="input (lexer error)",r=t.message),this.reportErrorCommon(r,e)},s.prototype.reportError=function(t){var e=(t.type?t.type+" token: ":"")+JSON.stringify(void 0!==t.value?t.value:t),r=this.lexer.formatError(t,"Syntax error");return this.reportErrorCommon(r,e)},s.prototype.reportErrorCommon=function(t,e){var r=[];r.push(t);var i=this.table.length-2,n=this.table[i],s=n.states.filter((function(t){var e=t.rule.symbols[t.dot];return e&&"string"!=typeof e}));0===s.length?(r.push("Unexpected "+e+". I did not expect any more input. Here is the state of my parse table:\n"),this.displayStateStack(n.states,r)):(r.push("Unexpected "+e+". Instead, I was expecting to see one of the following:\n"),s.map((function(t){return this.buildFirstStateStack(t,[])||[t]}),this).forEach((function(t){var e=t[0],i=e.rule.symbols[e.dot],n=this.getSymbolDisplay(i);r.push("A "+n+" based on:"),this.displayStateStack(t,r)}),this));return r.push(""),r.join("\n")},s.prototype.displayStateStack=function(t,e){for(var r,i=0,n=0;n<t.length;n++){var s=t[n],o=s.rule.toString(s.dot);o===r?i++:(i>0&&e.push("    ^ "+i+" more lines identical to this"),i=0,e.push("    "+o)),r=o}},s.prototype.getSymbolDisplay=function(t){return function(t){var e=typeof t;if("string"===e)return t;if("object"===e){if(t.literal)return JSON.stringify(t.literal);if(t instanceof RegExp)return"character matching "+t;if(t.type)return t.type+" token";if(t.test)return"token matching "+String(t.test);throw new Error("Unknown symbol type: "+t)}}(t)},s.prototype.buildFirstStateStack=function(t,e){if(-1!==e.indexOf(t))return null;if(0===t.wantedBy.length)return[t];var r=t.wantedBy[0],i=[t].concat(e),n=this.buildFirstStateStack(r,i);return null===n?null:[t].concat(n)},s.prototype.save=function(){var t=this.table[this.current];return t.lexerState=this.lexerState,t},s.prototype.restore=function(t){var e=t.index;this.current=e,this.table[e]=t,this.table.splice(e+1),this.lexerState=t.lexerState,this.results=this.finish()},s.prototype.rewind=function(t){if(!this.options.keepHistory)throw new Error("set option keepHistory to enable rewinding");this.restore(this.table[t])},s.prototype.finish=function(){var t=[],e=this.grammar.start;return this.table[this.table.length-1].states.forEach((function(r){r.rule.name===e&&r.dot===r.rule.symbols.length&&0===r.reference&&r.data!==s.fail&&t.push(r)})),t.map((function(t){return t.data}))},{Parser:s,Grammar:i,Rule:t}}));

  let drugNames = []
  function saveDrugNames(name){
    if (name && drugNames.indexOf(name)==-1)
      drugNames.push(name)
  }
  function id(x){return x[0]}
  var grammar = nearley.Grammar.fromCompiled({
    Lexer: undefined,
    ParserRules: [
    {"name": "_", "symbols": ["Head", "ln", "Rxs"], "postprocess": function(d) { return d[2] }},
    {"name": "Rxs", "symbols": ["Rxs", "ln", "Rx"], "postprocess": function (d) { return d[0].concat(d[2]) }},
    {"name": "Rxs", "symbols": ["Rx"]},
    {"name": "Rx", "symbols": ["date", "t", "any", "t", "any", "t", "any", "t", "any", "ln", "Dgs"], "postprocess":  function (d) { return {
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
      console.log('from worker')   
      const parser = new nearley.Parser(grammar)
      parser.feed(e.data)
      postMessage({Rxs:parser.results[0], drugNames:drugNames})
  }