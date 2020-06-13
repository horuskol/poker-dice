<template>
    <div :style="styleObject" class="inline-block m-1 sm:m-2"></div>
</template>

<script>
import {WAITING, ROLLING} from './poker-dice-game';

export default {
    props: {
        state: String,
        size: Number,
    },

    data() {
        return {
            styleObject: {
                height: this.size + 'px',
                width: this.size + 'px',
                backgroundImage: 'url("/images/dice-' + this.size + '.png")',
                backgroundPosition: '0 0'
            },
            side: 1,
            timer: null,
            rolls: 0
        }
    },

    mounted() {
        this.side = Math.floor(Math.random() * 6) + 1;
    },

    watch: {
        state() {
            switch (this.state) {
                case ROLLING:
                    this.rolls = Math.floor(Math.random() * 20) + 5;

                    if (!this.timer) {
                        let count = 0;
                        this.timer = setInterval(() => {
                            count++;
                            if (count > this.rolls) {
                                clearInterval(this.timer);
                                this.timer = null;
                                this.$emit('stopped', this.side);
                                return;
                            }

                            this.side = Math.floor(Math.random() * 6) + 1;
                        }, 100);
                    }
                    break;
            }
        },

        side() {
            this.styleObject.backgroundPosition = '-' + this.size * (this.side - 1) + 'px 0';
        }
    }
}
</script>