define(function(){
    return {
        props:['pot'],
        template:'<div class="card" v-if="pot">\
            <div class="card-header">\
                <div class="card-title h2">{{pot.potName}}</div>\
            </div>\
            <div class="card-body">\
                <div v-for="(value, key, i) in pot">\
                    <div v-if="Array.isArray(value) && (value.length > 0)">\
                        <div v-for="(item, key, i) in value">\
                            <div class="card-subtitle text-gray">For all {{item.contentFor}}:</div>\
                            <div v-html="item.monitoringOfPatientParameters"></div>\
                            <div v-html="item.patientMonitoringProgrammes"></div>\
                        </div>\
                    </div>\
                    <div v-else-if="value && value.contentFor">\
                        <div class="card-subtitle text-gray">For {{value.contentFor}}:</div>\
                        <div v-html="value.monitoringOfPatientParameters"></div>\
                        <div v-html="value.patientMonitoringProgrammes"></div>\
                    </div>\
                </div>\
            </div>\
        </div>'
    }
})