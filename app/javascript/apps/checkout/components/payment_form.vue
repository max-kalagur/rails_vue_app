<script>
    export default {
        emits: ['return'],
    }
</script>

<template>
    <a @click="$emit('return')" href="#">{{"<< back"}}</a>
    <br/>
    <slot>
        Form wasn't loaded properly. <br/>
        Please try again.
    </slot>
</template>