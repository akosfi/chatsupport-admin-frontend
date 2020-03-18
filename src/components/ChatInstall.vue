<template>
    <div class="welcome-message d-flex justify-content-center">
        <div class="welcome-message-container">
            <h2 class="my-3">Install your Chat Client!</h2>
            <h5 class="my-3">1. Copy and paste this code before the closing <i>body</i> tag!</h5>
            <pre><code id="code-snippet" class="language-html">Loading...</code></pre>
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
        const code = '<div>\n' +
                    '\t<p>There should be a better soulution for this...</p>'    + 
                    '\n</div>'
        const highlightedCode = hljs.highlightAuto(code).value;
        document.getElementById('code-snippet').innerHTML = highlightedCode;
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