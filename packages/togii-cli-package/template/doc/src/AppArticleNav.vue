<template>

    <nav class="nav">
        <div
            v-for="v in list"
            :key="v.id"
            :href="'#'+v.id"
            :class="['header','header-'+v.level]"
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
            

                const arch = document.createElement('div')

                arch.className = 'arch'

                arch.id = id;
                
                ele.appendChild(arch)    

                ele.style.position = 'relative'

                return { id, text, level };
            });

            this.list = items;

            console.log(items);
        },
    },
};
</script>

<style>
.arch{
    position: absolute;
    left: 0 ;
    top: -40px;
}
</style>

<style lang="scss" scoped>
nav.nav {
    // position: fixed;
    // border-right: 1px solid var(--theme-color-light);
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

    .header > a {
        color: #1a1a1a;
        display: inline-block;
        border-bottom: 1px solid transparent;
        transition: border 0.2s ease;
        margin-top: 5px;
        -webkit-transition: border 0.2s ease;
        -moz-transition: border 0.2s ease;
        text-decoration: none;
        font-size: 12px;
        background-color: transparent;

        &:hover {
            opacity: 0.5;
        }
    }

    .header-0 {
        > a {
            color: #1a1a1a;
            font-size: 14px;
            font-weight: 700;
            line-height: 3;
            text-transform: uppercase;
            text-align: start;
            letter-spacing: 0.08em;
            display: block;
            font-size: 14px;
        }
    }

    .header-2 {
        margin-left: 12px;
    }

    .header-3 {
        margin-left: 24px;
    }

    .header-4 {
        margin-left: 36px;
    }
    .header-5 {
        margin-left: 48px;
    }
}
</style>
