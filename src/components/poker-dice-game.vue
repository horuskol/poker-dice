<template>
    <div>
        <div style="display: flex; justify-content: space-around; margin-top: 5em;" @click="rollDice">
            <die v-for="d in 5" :key="d" :state="state" @stopped="stopped"></die>
        </div>

        <table style="margin: 5em auto">
            <tr>
                <th>Dice</th>
                <th>&nbsp;</th>
                <th>Score</th>
            </tr>

            <tr>
                <td>Aces</td>
                <td>&nbsp;</td>
                <td v-for="roll in rolls">{{ roll['1'] * 1 }}</td>
            </tr>

            <tr>
                <td>Twos</td>
                <td>&nbsp;</td>
                <td v-for="roll in rolls">{{ roll['2'] * 2 }}</td>
            </tr>

            <tr>
                <td>Threes</td>
                <td>&nbsp;</td>
                <td v-for="roll in rolls">{{ roll['3'] * 3 }}</td>
            </tr>

            <tr>
                <td>Fours</td>
                <td>&nbsp;</td>
                <td v-for="roll in rolls">{{ roll['4'] * 4 }}</td>
            </tr>

            <tr>
                <td>Fives</td>
                <td>&nbsp;</td>
                <td v-for="roll in rolls">{{ roll['5'] * 5 }}</td>
            </tr>

            <tr>
                <td>Sixes</td>
                <td>&nbsp;</td>
                <td v-for="roll in rolls">{{ roll['6'] * 6 }}</td>
            </tr>

            <tr>
                <td>3 of a kind</td>
                <td>&nbsp;</td>
                <td v-for="roll in rolls">{{ threeKind(roll) }}</td>
            </tr>

            <tr>
                <td>4 of a kind</td>
                <td>&nbsp;</td>
                <td v-for="roll in rolls">{{ fourKind(roll) }}</td>
            </tr>

            <tr>
                <td>Full House</td>
                <td>&nbsp;</td>
                <td v-for="roll in rolls">{{ fullHouse(roll) }}</td>
            </tr>

            <tr>
                <td>5 of a kind</td>
                <td>&nbsp;</td>
                <td v-for="roll in rolls">{{ fiveKind(roll) }}</td>
            </tr>

            <tr>
                <td>Total</td>
                <td>&nbsp;</td>
                <td v-for="roll in rolls">{{ totalScore(roll) }}</td>
            </tr>
        </table>
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
            scores: [],
            rolls: [],
            currentRolls: 0
        }
    },

    methods: {
        rollDice() {
            this.state = ROLLING;
            this.scores = [];
        },

        stopped(score) {
            this.scores.push(score);

            console.log(score);

            if (this.scores.length === 5) {
                this.state = WAITING;

                this.rolls = [{
                    '1': 0,
                    '2': 0,
                    '3': 0,
                    '4': 0,
                    '5': 0,
                    '6': 0
                }];

                for (let i = 0; i < 5; i++) {
                    this.rolls[0][this.scores[i]]++;
                }
            }
        },

        twoKind(roll) {
            for (let i = 1; i <= 6; i++) {
                if (roll[i] === 2) {
                    return i * 2;
                }
            }

            return 0;
        },

        threeKind(roll) {
            for (let i = 1; i <= 6; i++) {
                if (roll[i] === 3) {
                    return i * 3;
                }
            }

            return 0;
        },

        fourKind(roll) {
            for (let i = 1; i <= 6; i++) {
                if (roll[i] === 4) {
                    return i * 4;
                }
            }

            return 0;
        },

        fiveKind(roll) {
            for (let i = 1; i <= 6; i++) {
                if (roll[i] === 5) {
                    return 50;
                }
            }

            return 0;
        },

        fullHouse(roll) {
            if (this.twoKind(roll) && this.threeKind(roll)) {
                return 25;
            }

            return 0;
        },

        totalScore(roll) {
            return (roll['1'] * 1)
                + (roll['2'] * 2)
                + (roll['3'] * 3)
                + (roll['4'] * 4)
                + (roll['5'] * 5)
                + (roll['6'] * 6)
                + this.threeKind(roll)
                + this.fourKind(roll)
                + this.fullHouse(roll)
                + this.fiveKind(roll);
        }
    }
}
</script>
