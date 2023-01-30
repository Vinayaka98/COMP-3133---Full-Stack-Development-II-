const assert = require('assert');
const calculator = require('../app/calculator');

describe('add', function () {
    it('should return the correct result when i=5 and j=2', function () {
        assert.equal(calculator.add(5, 2), 7);
    });
    it('should return the incorrect result when i=5 and j=2', function () {
        assert.notEqual(calculator.add(5, 2), 8);
    });
});


describe('sub', function () {
    it('should correctly subtract two numbers', function () {
        assert.equal(calculator.sub(5, 2), 3);
    });

    it('should fail when subtracting two numbers', function () {
        assert.notEqual(calculator.sub(5, 2), 5);
    });
});

describe('mul', function () {
    it('5 * 2 should return 10', function () {
        assert.equal(calculator.mul(5, 2), 10);
    });
    it('5 * 2 should not return 12', function () {
        assert.notEqual(calculator.mul(5, 2), 12);
    });
});

describe('div', function () {
    it('should return 5 when 10 is divided by 2', function () {
        assert.equal(calculator.div(10, 2), 5);
    });
    it('should not return 2 when 10 is divided by 2', function () {
        assert.notEqual(calculator.div(10, 2), 2);
    });
});