
<template>

    <div class="stat">
        <span class="text has-text-weight-semibold" v-text="text"></span>
        <p class="has-text-right">
            <span class="hashrate is-size-5 has-text-link is-family-secondary has-text-weight-bold" v-html="value"></span>
        </p>
    </div>

</template>

<script>
    export default {
        props:{
            name:{
                required: true
            },
            type: null,
            text : String
        },
        data(){
            return{
                value: 'waiting...',
            }
        },
        methods:{
            setValue(data=null){
                if (data.hasOwnProperty(this.name))
                {
                    this.value = this.type == 'hashrate' ? this.humanHashRate(data[this.name]) : data[this.name];

                    if ( typeof data[this.name] === 'object')
                    {
                        this.value
                    }
                    
                }else{
                    this.value = 'waiting...';
                }
            },
            
        },
        mounted() {
            eventBus.$on('updated', data => {
                this.setValue(data);  
            });
        },
    }
</script>
