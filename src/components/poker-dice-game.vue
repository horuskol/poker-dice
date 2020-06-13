<template>
    <div>
        <div style="display: flex" @click="rollDice">
            <die v-for="d in 5" :key="d" :state="state" @stopped="stopped"></die>
        </div>
    </div>
</template>

<script>
import Die from './die';

export const WAITING = 'waiting';
export const ROLLING = 'rolling';

export default {
    components: {
        'die': Die
    },

    data() {
        return {
            state: WAITING,
            scores: []
        }
    },

    methods: {
        rollDice() {
            this.state = ROLLING;
            this.scores = [];
        },

        stopped(score) {
            console.log(score);
            this.scores.push(score);

            if (this.scores.length === 5) {
                this.state = WAITING;
            }
        }
    }
}
</script>
