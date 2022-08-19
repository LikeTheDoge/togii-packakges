<template>
    <main class="markdown-post">
        <section class="markdown-post-inner ">
            <div class="info">
                <h1 class="title">
                    {{ title || "" }}

                    <span v-if="this.subtitle"> ({{ subtitle || "" }})</span>
                </h1>
                <div class="description">{{ description || "" }}</div>
            </div>
            <hr />
            <div class="markdown-body">
                <slot></slot>
            </div>
        </section>
    </main>
</template>

<script>
export default {
    props: ["title", "subtitle", "description", "code"],
};
</script>

<style lang="scss" scope>
.markdown-post {
    --content-nav-width: 240px;
    flex: auto;
    padding-right: var(--content-nav-width);
}
.markdown-post-inner {
    max-width: 804px;
    padding: 0 32px;
    margin: 0 auto;
}
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    margin: 0 auto;
    padding: 0 48px 48px 48px;
}

.info {
    padding: 12px 48px;

    .title {
        font-size: 28px;
        line-height: 1.8;
        margin-top: 36px;
        margin-bottom: 12px;
    }
}
hr {
    margin: 24px 48px;
    background-color: rgba(0, 0, 0, 0.12);
}
@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }

    .info {
        padding: 15px;
    }
    hr {
        margin: 24px 15px;
    }
}
</style>
<style lang="scss">
.markdown-body {
    table {
        display: block;
        margin: 2em 0;
        overflow-x: auto;
        overflow-y: hidden;
        border: 0;
        -webkit-overflow-scrolling: touch;
        width: 100%;

        th,
        td {
            padding: 12px;
            border-width: 1px 0;
        }

        th {
            padding-top: 14px;
            border-width: 1px 0 2px 0;
        }

        tbody tr {
            transition: all 0.3s;
            &:hover {
                background: rgba(60, 90, 100, 0.04);
            }
        }

        td {
            &:first-child {
                width: 16%;
                font-weight: 600;
                white-space: nowrap;
            }
            &:nth-child(2) {
                width: 57%;
            }
            &:nth-child(3) {
                min-width: 120px;
            }
            &:nth-child(4) {
                min-width: 120px;
            }
            &:nth-child(5) {
                width: 5%;
            }
            &:nth-last-child(3):first-child {
                width: 38%;
            }
            &:nth-last-child(3):first-child ~ td:nth-last-child(2) {
                width: 70%;
            }
        }
    }

    hr {
        margin: 12px 0;
    }
}
</style>
