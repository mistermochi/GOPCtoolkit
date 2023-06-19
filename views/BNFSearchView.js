define([
    'component/gIcon',
    'component/searchBar',
    'util/fetch',
    'util/cesarshift',
    'https://cdn.jsdelivr.net/gh/nextapps-de/flexsearch@0.7.1/dist/flexsearch.es5.js',  //0.7.2 includes unicode regex unsupported.
], function (gIcon, searchBar,fetch,cesarShift,FlexSearch) {

    return {
        mounted: function () {
            const that = this
            /**
            fetch('./BNF-drug-list.json', function(result){
                var drugList = JSON.parse(result)
                const json = [];
                const timer = ms => new Promise(res => setTimeout(res, ms))

                async function load () { // We need to wrap the loop into an async function for this to work
                        for(var i = 687 ; i < 693; i++){
                            var link = 'https://bnf.nice.org.uk/page-data/drugs/'+drugList[i].slug+'/page-data.json'
                            fetch(link, function(result){
                                var data = JSON.parse(result).result.data.bnfDrug
                                data.id = i
                                json.push(data)
                            })
                            await timer((Math.floor(Math.random() * 15) + 5) * 300); // then the created Promise can be awaited
                        }
                    var a = document.createElement("a")
                    a.href = URL.createObjectURL(
                        new Blob([JSON.stringify(json)], {type:"application/json"})
                    )
                    a.download = "687-692.json"
                    a.click()
                }

                load();
            })
            **/
                        
            FlexSearch.registerLanguage("en", {
                filter: "a about above after again against all also am an and any are aren't as at be because been before being below both but by can cannot can't come could couldn't did didn't do does doesn't doing dont down during each even few first for from further get go had hadn't has hasn't have haven't having he hed her here here's hers herself hes him himself his how how's i id if ill im in into is isn't it it's itself i've just know let's like make me more most mustn't my myself new no nor not now of off on once only or other ought our our's ourselves out over own same say see shan't she she'd shell shes should shouldn't so some such than that that's the their theirs them themselves then there there's these they they'd they'll they're they've this those through time to too until up us very want was wasn't way we wed well were weren't we've what what's when when's where where's which while who whom who's why why's will with won't would wouldn't you you'd you'll your you're your's yourself yourselves you've".split(" "),
                h: {
                    ational: "ate",
                    iveness: "ive",
                    fulness: "ful",
                    ousness: "ous",
                    ization: "ize",
                    tional: "tion",
                    biliti: "ble",
                    icate: "ic",
                    ative: "",
                    alize: "al",
                    iciti: "ic",
                    entli: "ent",
                    ousli: "ous",
                    alism: "al",
                    ation: "ate",
                    aliti: "al",
                    iviti: "ive",
                    ement: "",
                    enci: "ence",
                    anci: "ance",
                    izer: "ize",
                    alli: "al",
                    ator: "ate",
                    logi: "log",
                    ical: "ic",
                    ance: "",
                    ence: "",
                    ness: "",
                    able: "",
                    ible: "",
                    ment: "",
                    eli: "e",
                    bli: "ble",
                    ful: "",
                    ant: "",
                    ent: "",
                    ism: "",
                    ate: "",
                    iti: "",
                    ous: "",
                    ive: "",
                    ize: "",
                    al: "",
                    ou: "",
                    er: "",
                    ic: ""
                },
                g: {}
            });
            fetch('https://cdn.jsdelivr.net/gh/mistermochi/GOPCtoolkit@main/data/BNF/search.json', function (result) {
                fetch('https://cdn.jsdelivr.net/gh/mistermochi/GOPCtoolkit@main/data/BNF/BNFdruglist.json', function (drugList) {
                    
                    fetch("https://cdn.jsdelivr.net/gh/mistermochi/GOPCtoolkit@main/drugdata.csv",function(drugDB){
                        that.drugDB = drugDB.split('\n').map(function(v){ return v.split(',') })
                        function replacer(_, value) {
                            return typeof value === 'undefined' ? null : value
                        }
                        var cache = JSON.parse(result, replacer)
                        const index = new FlexSearch.Document({
                            charset: "latin:advanced",
                            lang: "en",
                            tokenize: "forward",
                            preset: "score",
                            minlength: 3,
                            document: {
                                id: "id",
                                index: [
                                    "title",
                                    "drugAction:drugContent:content",
                                    "constituentDrugs:constituents[]:title",
                                    "primaryClassification:title",
                                    //"primaryClassification:drugs[]:title",
                                    "secondaryClassifications[]:title",
                                    //"secondaryClassifications[]:drugs[]:title"
                                    "cautions:drugContent:content",
                                    "cautions:drugClassContent[]:content",
                                    "contraIndications:drugContent:content",
                                    "contraIndications:drugClassContent[]:content",
                                    "hepaticImpairment:drugContent:content",
                                    "hepaticImpairment:drugClassContent[]:content",
                                    "renalImpairment:drugClassContent[]:content",
                                    "renalImpairment:prepContent[]:content",
                                    "renalImpairment:drugContent:content",
                                    "relatedTreatmentSummaries[]:title",
                                ]
                            }
                        })
                        for(let key in cache){
                            index.import(key, cache[key]);
                        }
                        that.index = index
                        that.drugList = JSON.parse(drugList)

                        // drugDB search
                        const UCHIndex = new FlexSearch.Index({
                            charset: "latin:advanced",
                            lang: "en",
                            preset: "score",
                            minlength: 3
                        })
                        /**
                        for (let i in that.drugDB){
                            UCHIndex.add(i,that.drugDB[i][1])
                        }
                        for (let i=0; i<200 ;i++){
                            console.log(that.drugList[i].title)
                            UCHIndex.search(that.drugList[i].title).forEach(function(result){
                                console.log(that.drugDB[result])
                            })
                        }
                        **/
                    })
                })
            })
        },
        data: function () {
            return {
                index: null,
                hits: [],
                drugDB: [],
                cache: {},
                links: [
                    {
                        name: 'FMSC referral guideline',
                        link: 'http://uchwss1/DC/fmsc/FMSC%20and%20HASC%20Clinical%20Guidelines/UCH%20FMIC%20referral%20guidelines(updated%202021.6.7)%20clean%20Ver%20(002).doc'
                    },
                    {
                        name: 'Wo Lok DEXA flyer',
                        link: 'http://uchwss1/sites/mng/Subspecialties/Endocrinology/Guidelines%20%20Protocols/Wo%20Lok%20Osteoporosis%20service/Wo%20Lok%20Flyer.pdf'
                    },
                    {
                        name: 'Renal Handbook (UCH M&G)',
                        link: 'http://uchwss1/sites/mng/Subspecialties/Nephrology/Nephrology%20Document/KEC_nephrology_manual_2020_1_%202nd%20edition_clean_110121%20PDF%20version.pdf'
                    },
                    {
                        name: 'Thyrotoxicosis',
                        link: 'https://uchwss1/DC/fmsc/FMSC%20and%20HASC%20Clinical%20Guidelines/Clinical%20Guideline/Patient%20education/Thyrotoxicosis.pdf'
                    },
                    {
                        name: 'Insomnia, Sleep hygiene',
                        link: 'https://uchwss1/DC/fmsc/FMSC%20and%20HASC%20Clinical%20Guidelines/Clinical%20Guideline/Patient%20education/Insomnia.pdf'
                    },
                ]
            }
        },
        methods:{
            search: function(event){
                let keyword = event.target.value
                this.hits.splice(0)
                if (this.index && keyword.length > 2 ){
                    var searchResults = this.index.search(keyword, ['title'])
                    for (let i=0; i<searchResults.length; i++){
                        for (let j = 0; j < searchResults[i].result.length; j++){
                            let id = searchResults[i].result[j]
                            this.$set(this.hits, j, { id: id, title: this.drugList[id].title})
                        }
                    }
                }
            },
            getfromID: function(id,obj){
                let that = this
                fetch('https://cdn.jsdelivr.net/gh/mistermochi/GOPCtoolkit@main/data/BNF/'+id+'.json', function (result) {
                    let json = JSON.parse(cesarShift(result,-7))
                    for (let key in json){
                        that.$set(obj, key, json[key]) // shallow copy
                    }
                })
            },
        },
        components: {
            'g-icon': gIcon,
            'search-bar': searchBar
        },
        template:'\
        <div>\
            <div class="container">\
                <input class="form-input" id="drugsearch" @input="search" placeholder="Search...">\
                <ol>\
                    <li v-for="item in hits">\
                        <router-link :to="\'/BNF/drug/\'+item.id" class="btn btn-link">{{item.title}}</router-link>\
                    </li>\
                </ol>\
            </div>\
        </div>\
        '
    }
})