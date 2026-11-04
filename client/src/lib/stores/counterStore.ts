//import {action, makeObservable, observable} from 'mobx';
import {makeAutoObservable} from 'mobx';

export default class CounterStore {
    title = 'Counter store';
    count = 42;
    events: string[] = [
        `Initial count is ${this.count}`
    ]

    // Using makeAutoObservable to automatically make all properties observable and all methods actions
    // This eliminates the need to manually specify observables and actions as done in the commented-out constructor above
    // constructor(){
    //     makeObservable(this, {
    //         title: observable,
    //         count: observable,
    //         increment: action,
    //         decrement: action
    //     })
    // }
    constructor() {
        makeAutoObservable(this)
    }

    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`Incremented by ${amount} - count is now ${this.count}`);
    }

    decrement = (amount = 1) => {
        this.count -= amount
        this.events.push(`Decremented by ${amount} - count is now ${this.count}`);
    }

    get eventCount() {
        return this.events.length
    }
}