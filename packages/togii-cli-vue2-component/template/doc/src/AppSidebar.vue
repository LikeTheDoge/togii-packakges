<template>

    <nav class="sidebar">
        <div
            v-for="v in nav"
            :key="v.name"
        >

            <component
                :is="(v.children && (v.children.length >0))?'a':'router-link'"
                v-if="v.path"
                :class="{ top:true,link_able:!v.children }"
                :to="(v.children && (v.children.length >0))?'':v.path"
            >
                <div>
                    <span>{{v.name}}</span>
                </div>
            </component>
            <router-link
                v-for="v in (v.children || [])"
                :key="v.name"
                class="child"
                :to="v.path"
            >
                <div>
                    <span>{{v.name}}</span>
                </div>
            </router-link>
        </div>
    </nav>
</template>


<script>
import { nav } from "../build/route.js";
export default {
    data() {
        return {
            nav,
        };
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
nav.sidebar {
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

    a {
        display: flex;
        transition: all 0.3s ease-out;
        padding: 6px 0;

        &.top + a.child {
            margin-top: 4px;
        }

        &.top {
            > div {
                cursor: pointer !important;
                color: #888888;
                font-weight: 600;
                font-size: 14px;
                padding: 12px 24px;
                transition: all 0.3s ease-out;
                white-space: nowrap;
                flex: auto;
            }
        }

        &.top.link_able {
            > div {
                cursor: pointer;
            }

            &.link_able:hover {
                background: var(--theme-color-light);
            }
        }

        &.top.active {
            padding-left: 12px;
            > div {
                flex: 0;
                color: #fff;
                background: var(--theme-color);
                border-radius: 23px;
                box-shadow: rgba(
                        var(--theme-color-r),
                        var(--theme-color-g),
                        var(--theme-color-b),
                        1
                    )
                    0px 9px 16px -8px;
            }
        }

        &.child {
            cursor: pointer !important;
            color: #888888;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            padding: 12px 24px;
            transition: all 0.3s ease-out;
            white-space: nowrap;
            flex: auto;
            padding-left: 36px;
            &:hover {
                background: var(--theme-color-light);
            }
        }

        &.child.active {
            color: var(--theme-color);
        }
    }

    // > div {
    //     padding: 12px 0;

    //     .top {
    //         font-size: 14px;
    //         line-height: 20px;
    //         color: #212121;
    //         font-weight: 500;
    //         padding: 12px 24px;
    //         display: block;
    //         transition: all 0.3s ease-out;
    //         font-weight: 600;

    //         &.disabled {
    //             pointer-events: none;
    //         }

    //         &:hover {
    //             background-color: var(--theme-color-light);
    //         }

    //         &.active {
    //             opacity: 1;
    //         }
    //     }
    //     .child {
    //         color: #888888;
    //         font-weight: 600;
    //         font-size: 14px;
    //         cursor: pointer;
    //         padding: 12px 24px;
    //         display: block;
    //         transition: all 0.3s ease-out;

    //         &:hover {
    //             background-color: rgba(0, 0, 0, 0.04);
    //         }

    //         &.active {
    //             color: #212121;
    //         }
    //     }
    // }
}
</style>
