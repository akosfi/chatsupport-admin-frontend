<template>
    <div class="welcome-message d-flex justify-content-center">
        <div class="welcome-message-container">
            <h2 class="my-3">Install your Chat Client!</h2>
            <h5 class="my-3">1. Copy and paste this code before the closing <i>body</i> tag!</h5>
            <div>
                <pre id="code-snippet">

                </pre>
            </div>
            <h5 class="my-3">2. Reload your website!</h5>
        </div>
    </div>
</template>

<script>
import hljs from 'highlight.js';

export default {
  components: {
  },
  mounted: function() {
        const code = '&lt;article&gt;' +
        '&lt;h4&gt;A really awesome article&lt;/h4&gt;' +
        '&lt;p&gt;Lots of awesome text.&lt;/p&gt;'+
        "&lt;/article&gt;";
        //const highlightedCode = hljs.highlightAuto(code).value;
        document.getElementById('code-snippet').innerHTML = code;
  } 
}
</script>

<style lang="scss">
    .welcome-message {
        
        &-container {
            width: 512px;
        }
    }
</style>