<template>

    <nav class="nav">
        <div

            v-for="v in list"
            :key="v.id"
            :href="'#'+v.id"
        >
            <a :href="'#'+v.id">{{v.text}}</a>
        </div>
    </nav>
</template>


<script>
export default {
    data() {
        return {
            list: [],
        };
    },
    methods: {
        $$update(node = document) {
            const headers = Array.from(node.querySelectorAll("h1,h2,h3,h4,h5"));
            const items = headers.map((ele) => {
                const level = {
                    h1: 0,
                    h2: 1,
                    h3: 2,
                    h4: 3,
                    h5: 4,
                }[ele.tagName.toLowerCase()];
                const text = ele.innerText;
                const id =
                    "h_" +
                    Math.floor(Math.random() * 0xffffffffff).toString(16);
                ele.id = id;
                return { id, text, level };
            });

            this.list = items;

            console.log(items);
        },
    },
};
</script>

<style lang="scss" scoped>
nav.nav {
    // position: fixed;
    border-right: 1px solid var(--theme-color-light);
    position: sticky;
    // top: var(--header-height);
    height: 100vh;
    top: 0;
    width: var(--sidebar-width);
    overflow: auto;
    padding: 54px 0;

    &::-webkit-scrollbar-track {
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
        width: 6px;
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: var(--color-gray-light);
    }

}
</style>
