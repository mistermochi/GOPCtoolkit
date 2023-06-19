define([
    'component/gIcon'
],
    function(gIcon){
    return {
        components: {
            'g-icon': gIcon,
        },
        props:['pot'],
        mounted: function() {
            this.potContent = this.pot
            // function to turn non-array ('drugContent') to array ('drugClassContent' / 'prepContent')
            if (this.potContent.drugContent)
                this.potContent.drugContent = new Array(this.potContent.drugContent)
        },
        data: function(){
            return {
                potContent: null
            }
        },
        template:'<div class="card" v-if="potContent">\
            <div class="card-header">\
                <div class="card-title h2">{{potContent.potName}}</div>\
            </div>\
            <div class="card-body">\
                <div v-for="(value, key, i) in potContent">\
                    <div v-if="Array.isArray(value) && (value.length > 0)">\
                        <div v-for="(item, key, i) in value">\
                            <div class="card-subtitle text-gray">For all {{item.contentFor}}:</div>\
                            <div v-for="ind in item.indicationAndDoseGroups">\
                                <div v-for="the in ind.therapeuticIndications">\
                                    <h5 v-html="the.indication"/>\
                                </div>\
                                <div v-for="rou in ind.routesAndPatientGroups">\
                                    <p>{{rou.routeOfAdministration}}</p>\
                                    <blockquote class="tile tile-centered" v-for="pat in rou.patientGroups">\
                                        <div class="tile tile-centered">\
                                            <div class="tile-icon">\
                                                <div class="example-tile-icon">\
                                                <g-icon v-if="pat.patientGroup == \'child\'" icon="stroller"/>\
                                                <g-icon v-if="pat.patientGroup == \'adult\'" icon="face_6"/>\
                                                </div>\
                                            </div>\
                                            <div class="tile-content">\
                                                <cite v-html="pat.detailedPatientGroup"/>\
                                                <p v-html="pat.doseStatement"/>\
                                            </div>\
                                        </div>\
                                    </blockquote>\
                                </div>\
                            </div>\
                            <template v-if="item.doseEquivalence">\
                                <h3>Dose equivalence and conversion</h3>\
                                <div v-html="item.doseEquivalence"></div>\
                            </template>\
                            <template v-if="item.doseAdjustments">\
                                <h3>Dose Adjustments</h3>\
                                <div v-html="item.doseAdjustments"></div>\
                            </template>\
                            <template v-if="item.extremesOfBodyWeight">\
                                <h3>Extremes of Body Weight</h3>\
                                <div v-html="item.extremesOfBodyWeight"></div>\
                            </template>\
                            <template v-if="item.potency">\
                                <h3>Potency</h3>\
                                <div v-html="item.potency"></div>\
                            </template>\
                            <template v-if="item.pharmacokinetics">\
                                <h3>Pharmacokinetics</h3>\
                                <div v-html="item.pharmacokinetics"></div>\
                            </template>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>'
    }
})