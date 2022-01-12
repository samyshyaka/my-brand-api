import assert from 'assert';
import { expect } from 'chai';
import { add, sub } from '../src/test.js';

describe('the add function', () => {
    it('it should add 2 numbers together', () => {
        const result = add(2,2);
        // assert.equal(result, 4);
        expect(result).to.be.eq(4);
    });

    it('it should be able to handle 1 number', () => {
        const result = add(2);
        expect(result).to.be.eq(2);
    });

    it('it should be able to handle 0 number', () => {
        const result = add();
        expect(result).to.be.eq(0);
    });

    it('it should return 0 if either argument is not a number', () => {
        const result = add(2, 'test');
        expect(result).to.be.eq(0);
    });
    
});

describe('the sub function', () => {
    it('it should sub 1 number from the other', () => {
        const result = sub(2,2);
        // assert.equal(result, 4);
        expect(result).to.be.eq(0);
    });

    it('it should be able to handle 1 number', () => {
        const result = sub(2);
        expect(result).to.be.eq(2);
    });

    it('it should be able to handle 0 number', () => {
        const result = sub();
        expect(result).to.be.eq(0);
    });

    it('it should return 0 if either argument is not a number', () => {
        const result = sub(2, 'test');
        expect(result).to.be.eq(0);
    });
    
});