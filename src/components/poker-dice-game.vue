<template>
    <div>
        <div class="flex flex-row justify-around m-5 p-5 bg-green-500 border-yellow-700 border-8 rounded-lg" @click="rollDice">
            <die v-for="d in 5" :key="d" :state="state" @stopped="stopped"></die>
        </div>

        <table class="m-5 border">
            <tr>
                <th class="text-left p-2 border-b-4">Dice</th>
                <th v-for="(roll, index) in rolls" class="text-left p-2 border-b-4 border-l-2">Game {{ index + 1}}</th>
            </tr>

            <tr>
                <td class="h-16 p-2 border-b">Aces</td>
                <td v-for="roll in rolls" class="font-fancy text-xl text-center pt-2 border-l-2 border-b">{{ roll['1'] * 1 }}</td>
            </tr>

            <tr>
                <td class="h-16 p-2 border-b">Twos</td>
                <td v-for="roll in rolls" class="font-fancy text-xl text-center pt-2 border-l-2 border-b">{{ roll['2'] * 2 }}</td>
            </tr>

            <tr>
                <td class="h-16 p-2 border-b">Threes</td>
                <td v-for="roll in rolls" class="font-fancy text-xl text-center pt-2 border-l-2 border-b">{{ roll['3'] * 3 }}</td>
            </tr>

            <tr>
                <td class="h-16 p-2 border-b">Fours</td>
                <td v-for="roll in rolls" class="font-fancy text-xl text-center pt-2 border-l-2 border-b">{{ roll['4'] * 4 }}</td>
            </tr>

            <tr>
                <td class="h-16 p-2 border-b">Fives</td>
                <td v-for="roll in rolls" class="font-fancy text-xl text-center pt-2 border-l-2 border-b">{{ roll['5'] * 5 }}</td>
            </tr>

            <tr>
                <td class="h-16 p-2 border-b">Sixes</td>
                <td v-for="roll in rolls" class="font-fancy text-xl text-center pt-2 border-l-2 border-b">{{ roll['6'] * 6 }}</td>
            </tr>

            <tr>
                <td class="h-16 p-2 border-b">3 of a kind</td>
                <td v-for="roll in rolls" class="font-fancy text-xl text-center pt-2 border-l-2 border-b">{{ threeKind(roll) }}</td>
            </tr>

            <tr>
                <td class="h-16 p-2 border-b">4 of a kind</td>
                <td v-for="roll in rolls" class="font-fancy text-xl text-center pt-2 border-l-2 border-b">{{ fourKind(roll) }}</td>
            </tr>

            <tr>
                <td class="h-16 p-2 border-b">Full House</td>
                <td v-for="roll in rolls" class="font-fancy text-xl text-center pt-2 border-l-2 border-b">{{ fullHouse(roll) }}</td>
            </tr>

            <tr>
                <td class="h-16 p-2 border-b">5 of a kind</td>
                <td v-for="roll in rolls" class="font-fancy text-xl text-center pt-2 border-l-2 border-b">{{ fiveKind(roll) }}</td>
            </tr>

            <tr>
                <td class="font-bold p-2 border-t-2 bg-gray-200">Total</td>
                <td v-for="roll in rolls" class="font-fancy font-bold text-xl text-center pt-2 border-l-2 border-t-2 bg-gray-200">{{ totalScore(roll) }}</td>
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
            rolls: []
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

                let game = {
                    '1': 0,
                    '2': 0,
                    '3': 0,
                    '4': 0,
                    '5': 0,
                    '6': 0
                };

                for (let i = 0; i < 5; i++) {
                    game[this.scores[i]]++;
                }

                this.rolls.push(game);
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
