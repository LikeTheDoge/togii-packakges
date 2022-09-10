<template>
    <div>
        <ul>
            <li>{{title}}</li>
        </ul>

        <div class="demo">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:['title']
    }
</script>

<style lang="scss" scope>
    .demo{
        padding: 8px;
        border: 1px dashed #ccc;
        margin-bottom: 16px;
    }
</style>