<template>
    <div class="chat">
        <div class="chat-guests">
            <div class="chat-guests-guest">
                Guest1
            </div>
            
        </div>
        <div class="chat-messages">

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  methods: {

  },
  computed: {
    ...mapGetters({
        getClient: 'chatClient/getClient',
    }),
  },
  mounted: function() {
    this.$store
        .dispatch('chatClient/getClientAction')
        .then((r) => {
            this.$store
                .dispatch('chatClient/getGuestsOfClientAction', this.getClient.id)
                .then((g)=>{

                });
        })
        .catch((errors) => {
            console.log(errors);
            return this.$store.dispatch('chatClient/createClientAction');
        })
        .then((r) => {

        })
        .catch((errors) => {

        });
  },
}
</script>

<style lang="scss">
    .chat {
        width: 100%;
        display: flex;

        &-guests {
            flex: 0 0 20%;
            background: red;
            &-guest {
                padding-left: 16px;
                background: yellow;
                height: 48px;
                display: flex;
                align-items: center;
                font-size: 24px;
                cursor: pointer;
            }
        }

        &-messages {
            flex: 0 0 80%;
            background: salmon;
            height: 100vh;
        }
    }
</style>