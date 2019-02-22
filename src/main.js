window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Vue = require('vue');

// global event bus
window.eventBus = new Vue();

const delayit = ms => new Promise(res => setTimeout(res, ms));

// import SingleStat from "./vue-components/SingleStat"
Vue.component('SingleStat', require('./vue-components/SingleStat').default);



Vue.mixin({
    methods: {
        humanHashRate(hashrate, decimals=2){
            let thresh = 1000;
            if(Math.abs(hashrate) < thresh) {
                return hashrate + ' h/s';
            }
            const units = ['Kh/s','Mh/s','Gh/s','Th/s','Ph/s','Eh/s','Zh/s','Yh/s']
            let u = -1;
            do {
                hashrate /= thresh;
                ++u;
            } while(Math.abs(hashrate) >= thresh && u < units.length - 1);
            
            return hashrate.toFixed(decimals)+' <span class="is-size-7">'+units[u]+'</span>';
        }
    }
  })

const app = new Vue({
    el: '#app',
    // components:{
    //     SingleStat,
    // },
    data: {
        vars:{
            wallet: '...',
            device_id : '...',
            device_name: '...',
            pool: '....',
            hashrates : {},
            dev_mining : 'disabled'
        },
        connected: true,
        loading: true,
        errorMessage: null,
        isDevActive: false,
    },
    beforeCreate(){
        this.loading = true;
    },
    mounted(){

        this.getData();
        this.refresh = setInterval(() => {
            this.getData();
        }, 15000);
        
    },
    methods:{
        async getData(){

            this.loading = true;
            await delayit(1500);

            axios.get("/test.json")
                .then( response => {
                    this.loading = false;
                    this.connected = true;
                    
                    eventBus.$emit('updated', response.data);
                    
                    this.vars = response.data;
                    
                    if ( this.vars.dev_mining != "disabled")
                    {
                        this.isDevActive = true;
                    }
                })
                .catch( error => {
                    this.loading = false;
                    this.connected = false;
                    console.log(error);
                    this.errorMessage = error.message;
                });
        }
    },
    computed: {
        // a computed getter
        devMiningMessage() {
          if (this.isDevActive)
          {
              return "Dev Mining&nbsp;&nbsp;&nbsp;ON";
          }
          return "Dev Mining&nbsp;&nbsp;&nbsp;OFF";
        }
      }
});

