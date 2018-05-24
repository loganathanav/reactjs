import React, { Component } from 'react';

function Car(color) {
    this.color = color;
}

Car.prototype.getColor = function() {
    return this.color;
}

var myCar = new Car("Red");
console.log(myCar.getColor());

class Car2 {
    constructor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }
}

var myCar2 = new Car2("Blue");
console.log(myCar2.getColor());


class Sample extends React.Component {
    
    render() {
        return (
            <h1>Hello, World!</h1>
        );
    }

}

