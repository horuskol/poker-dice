import './app.css';

import Vue from 'vue';

import PokerDiceGame from './components/poker-dice-game';

Vue.component('poker-dice-game', PokerDiceGame);

var app = new Vue({
    el: '#app'
});
