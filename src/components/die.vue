<template>
    <div :style="styleObject"></div>
</template>

<script>
import {WAITING, ROLLING} from './poker-dice-game';

export default {
    props: {
        state: String,
    },

    data() {
        return {
            styleObject: {
                height: '100px',
                width: '100px',
                backgroundImage: 'url("/images/dice-100.png")',
                backgroundPosition: '0 0'
            },
            side: 1,
            timer: null,
            rolls: 0
        }
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
                            }

                            this.side = Math.floor(Math.random() * 6) + 1;
                        }, 100);
                    }
                    break;
            }
        },

        side() {
            this.styleObject.backgroundPosition = '-' + 100 * (this.side - 1) + 'px 0';
        }
    }
}
</script>