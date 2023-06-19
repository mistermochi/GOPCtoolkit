define([
    'util/fetch',
    'util/cesarshift',
    'component/BNF/generic',
    'component/BNF/ind_dose',
    'component/BNF/monitoring',
],function(fetch,cesarShift,genericView,ind_doseView,monitoringView){
    return {
        data: function(){
            return {
                drug: null
            }
        },
        components: {
          'generic-view': genericView,
          'ind-and-dose-view': ind_doseView,
          'monitoring-view': monitoringView,
        },
        mounted: function(){
            let that = this
            fetch('https://cdn.jsdelivr.net/gh/mistermochi/GOPCtoolkit@main/data/BNF/'+this.$route.params.id+'.json',function(result){
                let json = JSON.parse(cesarShift(result,-7))
                console.log(json)
                that.drug = json
            })
        },
        template: '<div class="container text-small">\
        <div v-if="drug">\
            <ul class="breadcrumb">\
                <li class="breadcrumb-item">\
                    <router-link to="/BNF" class="btn btn-link">BNF Search</router-link>\
                </li>\
                <li class="breadcrumb-item">\
                    <router-link :to="\'/BNF/class/\'+drug.primaryClassification.slug" class="btn btn-link">{{drug.primaryClassification.title}}</router-link>\
                </li>\
                <li class="breadcrumb-item">\
                    <router-link to="" class="btn btn-link">{{drug.title}}</router-link>\
                </li>\
            </ul>\
            <h1>{{drug.title}}</h1>\
            <generic-view v-bind:pot="drug.drugAction"/>\
            <ind-and-dose-view v-bind:pot="drug.indicationsAndDose"/>\
            <generic-view v-bind:pot="drug.unlicensedUse"/>\
            <generic-view v-bind:pot="drug.importantSafetyInformation"/>\
            <generic-view v-bind:pot="drug.contraIndications"/>\
            <generic-view v-bind:pot="drug.cautions"/>\
            <!-- interactants -->\
            <generic-view v-bind:pot="drug.sideEffects"/>\
            <generic-view v-bind:pot="drug.pregnancy"/>\
            <generic-view v-bind:pot="drug.breastFeeding"/>\
            <generic-view v-bind:pot="drug.hepaticImpairment"/>\
            <generic-view v-bind:pot="drug.renalImpairment"/>\
            <monitoring-view v-bind:pot="drug.monitoringRequirements"/>\
            <generic-view v-bind:pot="drug.treatmentCessation"/>\
            <generic-view v-bind:pot="drug.directionsForAdministration"/>\
            <generic-view v-bind:pot="drug.prescribingAndDispensingInformation"/>\
            <generic-view v-bind:pot="drug.patientAndCarerAdvice"/>\
            <!-- drug.medicinalForms -->\
            <!-- primaryclass -->\
        </div>\
        <div v-else>\
        <div class="loading loading-lg"></div>\
        </div>\
        </div>'
    }
})