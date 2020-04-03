<template>
    <div class="welcome-message d-flex justify-content-center">
        <div
            v-if="getClient.license"
            class="welcome-message-container"
        >
            <h2 class="my-3">Install your Chat Client!</h2>
            <h5 class="my-3">1. Copy and paste this code before the closing <i>body</i> tag!</h5>
            <div class="code-snippet-container">
                <div
                    class="code-snippet-container-button"
                    v-on:click="copyCodeToClipboard"
                >
                    Click here to copy!
                </div>
                <pre id="code-snippet">

                </pre>
            </div>
            <h5 class="my-3">2. Reload your website!</h5>
        </div>
    </div>
</template>

<script>
import hljs from 'highlight.js';
import { mapGetters } from 'vuex';
import { getServerUrl } from '../util';

export default {
  components: {
  },
  mounted: function() {
        const highlightedCode = hljs.highlightAuto(this.codeToInstall(this.getClient.license)).value;
        document.getElementById('code-snippet').innerHTML = highlightedCode;
  },
  methods: {
        copyCodeToClipboard() {
            var dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = this.codeToInstall(this.getClient.license);
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
        },
        codeToInstall(license) {
            const url = getServerUrl();
            return "<script type='text/javascript'>" +
                '\n\t' + "window.__lc = window.__lc || {};" +
                '\n\t' + "window.__lc.license = " + license + ";" +
                '\n\t' + "(function() {" +
                '\n\t\t' + "var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;" +
                '\n\t\t' + "lc.src = '" + url + "/chat/chat.js" +"';" +
                '\n\t\t' + "var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);" +
                '\n\t\t' + "var ls = document.createElement('link'); ls.type = 'text/css'; ls.rel = 'stylesheet';" +
                '\n\t\t' + "ls.href = '" + url + "/chat/chat.css" +"';" +
                '\n\t\t' + "document.head.appendChild(ls);" +
                '\n\t' + "})();" +
                '\n' + "<\/script>";
        }
  },
  computed: {
    ...mapGetters({
        getClient: 'client/getClient',
    }),
  }
  
}
</script>

<style lang="scss">
    .welcome-message {
        &-container {
            width: 512px;
        }

        & .code-snippet-container {
            position: relative;

            &-button {
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
                background: #9e9e9e;
                color: white;
                padding: 4px;
                font-size: 14px;
            }

            #code-snippet {
                padding: 16px;
                background: #303030;
                color: white;
            }
        }
    }
</style>