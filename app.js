require(
    // configuration
    {
      paths: {
        'Vue': 'https://cdn.jsdelivr.net/npm/vue@2/dist/vue',
        'VueRouter': 'https://cdn.jsdelivr.net/npm/vue-router@3/dist/vue-router',
      },
    },
    ['Vue', 'VueRouter'],
    function(Vue, VueRouter){
      // 1. Define route components.
      // These can be imported from other files
  
      // 2. Define some routes
      // Each route should map to a component. The "component" can
      // either be an actual component constructor created via
      // `Vue.extend()`, or just a component options object.
      // We'll talk about nested routes later.
  
      require(["views/IxTidyView","views/RxInsightView","views/BNFSearchView","views/BNFDrugView"], function(IxTidyView,RxInsightView,BNFSearchView,BNFDrugView ) {
        console.log(IxTidyView)
        Vue.use(VueRouter);
        const routes = [
          { path:'/', redirect: { path: "/IxTidy" }  },
          { path: '/IxTidy', component: IxTidyView },
          { path: '/RxInsight', component: RxInsightView },
          { path: '/BNF', component: BNFSearchView },
          { path: '/BNF/drug/:id', component: BNFDrugView },
          { path: '/BNF/class/:id', component: BNFSearchView },
        ]
  
        // 3. Create the router instance and pass the `routes` option
        // You can pass in additional options here, but let's
        // keep it simple for now.
  
        const router = new VueRouter({
          routes: routes // short for `routes: routes`
        })
  
        // 4. Create and mount the root instance.
        // Make sure to inject the router with the router option to make the
        // whole app router-aware.
        const app = new Vue({
          data:{
            error: false,
            show: false,
          },
          template:'\
          <div>\
            <header class="navbar">\
                <section class="navbar-section">\
                    <router-link to="/IxTidy" default class="btn btn-link">IxTidy</router-link>\
                    <router-link to="/RxInsight" class="btn btn-link">RxInsight</router-link>\
                    <router-link to="/BNF" class="btn btn-link">BNFSearch</router-link>\
                    <a href="https://cdn.jsdelivr.net/gh/mistermochi/GOPCtoolkit@main/worker.js" download class="btn btn-link">WebWorker</a>\
                </section>\
            </header>\
            <div class="p-fixed" v-show="error" v-if="error" style="z-index: 1;display: none;">\
              <div class="toast toast-error" @click="show = true">\
                <button class="btn btn-clear float-right" @click="error = null"></button>\
                {{error.message}}\
              </div>\
              <div class="modal" :class="{ active:show }" id="modal-err">\
                <a href="#close" class="modal-overlay" aria-label="Close" @click="show = false"></a>\
                <div class="modal-container">\
                  <div class="modal-header">\
                    <a href="#close" class="btn btn-clear float-right" aria-label="Close" @click="show = false"></a>\
                    <div class="modal-title h5">{{error.name}}: {{error.message}}</div>\
                  </div>\
                  <div class="modal-body">\
                    <div class="content">\
                      <pre class="code"><code>{{error.stack}}</code></pre>\
                    </div>\
                  </div>\
                  <div class="modal-footer"></div>\
                </div>\
              </div>\
            </div>\
            <router-view></router-view>\
          </div>\
          ',
          router: router,
          errorCaptured: function(err) {
            this.error = err
          },
        }).$mount('#app')
      });
    }
  )
  