(function() {
  'use strict';

  var FILL_ME_IN = 'Fill this value in';

  var checkForNativeMethods = function(runUnderbarFunction) {
    it('should not use the native version of any underbar methods in its implementation', function() {
      // These spies are set up in testSupport.js
      runUnderbarFunction();
      expect(Array.prototype.map.called).to.equal(false);
      expect(Array.prototype.indexOf.called).to.equal(false);
      expect(Array.prototype.forEach.called).to.equal(false);
      expect(Array.prototype.filter.called).to.equal(false);
      expect(Array.prototype.reduce.called).to.equal(false);
      expect(Array.prototype.every.called).to.equal(false);
      expect(Array.prototype.some.called).to.equal(false);
    });
  };

  describe('Part I', function() {

    describe('identity', function() {

      it('should return whatever value is passed into it', function() {
        var uniqueObject = {};
        expect(_.identity(1)).to.equal(1);
        expect(_.identity('string')).to.equal('string');
        expect(_.identity(false)).to.be.false;
        expect(_.identity(uniqueObject)).to.equal(uniqueObject);
      });
    });

    describe('first', function() {

      it('should be able to pull out the first element of an array', function() {
        expect(_.first([1, 2, 3])).to.equal(FILL_ME_IN);
      });

      it('should accept an index argument', function() {
        expect(_.first([1, 2, 3], 2)).to.eql([1, 2]);
      });

      it('should return empty array if zero is passed in as the index', function() {
        // There is a very important difference between `equal` and `eql`
        // Can you discover what it is?
        expect(_.first([1, 2, 3], 0)).to.eql(FILL_ME_IN);
      });

      it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
        expect(_.first([1, 2, 3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe('last', function() {

      it('should pull the last element from an array', function() {
        expect(_.last([1, 2, 3])).to.equal(3);
      });

      it('should accept an index argument', function() {
        expect(_.last([1, 2, 3], 2)).to.eql(FILL_ME_IN);
      });

      it('should return empty array if zero is passed in as the index', function() {
        expect(_.last([1, 2, 3], 0)).to.eql([]);
      });

      it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
        expect(_.last([1, 2, 3], 5)).to.eql(FILL_ME_IN);
      });
    });

    describe('each', function() {

      it('should not return anything', function() {
        var returnValue = _.each([], function() {});
        expect(returnValue).to.not.exist;
      });

      it('should not mutate the input array', function() {
        var input = [1, 2, 3, 4, 5];
        var result = _.each(input, _.identity);

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of each,
         * we would assume that `lastElement` is 5. But if inside of
         * each, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of each to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in each.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it('should iterate over arrays and provide access to each value', function() {
        var letters = ['a', 'b', 'c'];
        var iterations = [];

        _.each(letters, function(letter) {
          iterations.push(letter);
        });

        expect(iterations).to.eql(['a', 'b', 'c']);
      });

      it('should iterate over arrays and provide access to each index', function() {
        var letters = ['a', 'b', 'c'];
        var iterations = [];

        _.each(letters, function(letter, index) {
          iterations.push([letter, index]);
        });

        expect(iterations).to.eql(FILL_ME_IN);
      });

      it('should iterate over arrays and provide access to the original collection', function() {
        var letters = ['a', 'b', 'c'];
        var iterations = [];

        _.each(letters, function(letter, index, collection) {
          iterations.push([letter, index, collection]);
        });

        expect(iterations).to.eql([
          ['a', 0, letters],
          ['b', 1, letters],
          ['c', 2, letters]
        ]);
      });

      it('should only iterate over numeric keys of an array, not all properties', function() {
        var iterations = [];
        var letters = ['a', 'b', 'c'];
        letters.someProperty = 'Do not iterate over me!';

        _.each(letters, function(letter, index, collection) {
          iterations.push(letter);
        });

        expect(iterations).to.not.include(FILL_ME_IN);
      });

      it('should iterate over objects and provide access to each value', function() {
        var letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
        var iterations = [];

        _.each(letters, function(value) {
          iterations.push(value);
        });

        expect(iterations).to.eql(['dog', 'elephant', 'flotsam']);
      });

      it('should iterate over objects and provide access to each key', function() {
        var letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
        var iterations = [];

        _.each(letters, function(value, property) {
          iterations.push([value, property]);
        });

        expect(iterations).to.eql([
          ['dog', 'd'],
          ['elephant', 'e'],
          ['flotsam', 'f']
        ]);
      });

      it('should iterate over objects and provide access to the original object', function() {
        var letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
        var iterations = [];

        _.each(letters, function(value, property, object) {
          iterations.push([value, property, object]);
        });

        expect(iterations).to.eql([
          ['dog', 'd', letters],
          ['elephant', 'e', letters],
          ['flotsam', 'f', letters]
        ]);
      });

      it('should not confuse an object with a `length` property for an array', function() {
        var dresser = { length: 39, width: 79, height: 127};
        var iterations = [];

        _.each(dresser, function(value, property, object) {
          iterations.push([value, property, object]);
        });

        expect(iterations).to.eql([
          [39, 'length', dresser],
          [79, 'width', dresser],
          [127, 'height', dresser]
        ]);
      });

    });

    describe('indexOf', function() {

      it('should find 40 in the list', function() {
        var numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(FILL_ME_IN, 40)).to.equal(3);
      });

      it('should be able to compute indexOf even when the native function is undefined', function() {
        var numbers = [10, 20, 30];

        expect(_.indexOf(numbers, 20)).to.equal(1);
      });

      it('returns -1 when the target cannot be found not in the list', function() {
        var numbers = FILL_ME_IN;

        expect(_.indexOf(numbers, 35)).to.equal(-1);
      });

      it('returns the first index that the target can be found at when there are multiple matches', function() {
        var numbers = FILL_ME_IN;
        expect(FILL_ME_IN).to.equal(1);
      });
    });

    describe('filter', function() {

      it('should return all even numbers in an array', function() {
        var isEven = function(num) { return num % 2 === 0; };
        var evens = _.filter([1, 2, 3, 4, 5, 6], isEven);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('should return all odd numbers in an array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var odds = FILL_ME_IN;

        expect(odds).to.eql([1, 3, 5]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var numbers = [1, 2, 3, 4, 5, 6];
        var evens = _.filter(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe('reject', function() {

      it('should reject all even numbers', function() {
        var isEven = function(num) { return num % 2 === 0; };
        var odds = _.reject([1, 2, 3, 4, 5, 6], isEven);

        expect(odds).to.eql([1, 3, 5]);
      });

      it('should reject all odd numbers', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var numbers = [1, 2, 3, 4, 5, 6];
        var evens = _.reject(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe('uniq', function() {

      it('should not mutate the input array', function() {
        var input = [1, 2, 3, 4, 5];
        var result = _.uniq(input);

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of _.uniq,
         * we would assume that `lastElement` is 5. But if inside of
         * _.uniq, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of _.uniq to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in _.uniq.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it('should return all unique values contained in an unsorted array', function() {
        var numbers = [1, 2, 1, 3, 1, 4];

        expect(_.uniq(numbers)).to.eql([1, 2, 3, 4]);
      });

      it('should handle iterators that work with a sorted array', function() {
        var iterator = function(value) { return value + 1; };
        var numbers = [1, 2, 2, 3, 4, 4];

        expect(_.uniq(FILL_ME_IN)).to.eql([1, 2, 3, 4]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var numbers = [1, 2, 1, 3, 1, 4];
        var uniqueNumbers = _.uniq(numbers);

        expect(uniqueNumbers).to.not.equal(numbers);
      });
    });

    describe('map', function() {

      it('should not mutate the input array', function() {
        var input = [1, 2, 3, 4, 5];
        var result = _.map(input, _.identity);

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of map,
         * we would assume that `lastElement` is 5. But if inside of
         * map, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of map to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in map.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it('should apply a function to every value in an array', function() {
        var multiplyByTwo = FILL_ME_IN;

        expect(_.map([1, 2, 3], multiplyByTwo)).to.eql([2, 4, 6]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var numbers = [1, 2, 3];
        var mappedNumbers = _.map(numbers, function(num) {
          return num;
        });

        expect(mappedNumbers).to.not.equal(numbers);
      });
    });

    describe('pluck', function() {

      it('should return values contained at a user-defined property', function() {
        var people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        expect(_.pluck(people, 'name')).to.FILL_ME_IN(['moe', 'curly']);
      });

      it('should not modify the original array', function() {
        var people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        _.pluck(people, 'name');

        expect(people).to.FILL_ME_IN([{ name: 'moe', age: 30 }, { name: 'curly', age: 50 }]);
      });
    });

    describe('reduce', function() {

      it('should return a value', function() {
        var result = _.reduce([3, 2, 1], function(memo, item) { return item; });
        expect(result).to.be.defined;
      });

      it('should not mutate the input array', function() {
        var input = [1, 2, 3, 4, 5];
        var result = _.reduce(input, function(memo, item) { return item; });
        
        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of _.reduce,
         * we would assume that `lastElement` is 5. But if inside of
         * _.reduce, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of _.reduce to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in _.reduce.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it('should invoke the iterator function with arguments (memo, item) in that order', function() {
        var memoInCallback, itemInCallback;

        _.reduce(['item'], function(memo, item) {
          memoInCallback = memo;
          itemInCallback = item;
        }, 'memo');

        expect(memoInCallback).to.equal('memo');
        expect(itemInCallback).to.equal('item');
      });

      it('should pass items of the array into the iterator from left to right', function() {
        var orderTraversed = [];

        _.reduce([1, 2, 3, 4], function(memo, item) {
          // FILL_ME_IN
          // Add a line here that makes this test pass
          // for a working implementation of reduce
          return memo;
        }, 10);

        expect(orderTraversed).to.eql([1, 2, 3, 4]);
      });

      it('should continue to call iterator even if the iterator returns undefined', function() {
        var callCount = 0;
        var returnFalsy = function(total, item) {
          callCount++;
          if (callCount === 1) {
            return undefined;
          } else {
            return item + 1;
          }
        };

        var total = _.reduce([1, 1, 2], returnFalsy);
        expect(total).to.equal(3);
      });

      it('should pass every item of the array into the iterator if a memo is passed in', function() {
        var result = _.reduce([1, 2, 3], function(memo, item) {
          return memo - item;
        }, 10);

        expect(result).to.equal(4);
      });

      it('Fill me in with a description of the behavior this test is checking for', function() {
        var result = _.reduce([1, 2, 3], function(memo, item) {
          return memo * item;
        }, 0);

        expect(result).to.equal(0);
      });

      it('should set memo to be the first item of the array if no memo is passed in', function() {
        var result = _.reduce([1, 2, 3], function(memo) {
          return memo;
        });

        expect(result).to.equal(1);
      });


      it('should pass the second item of the array into the iterator first if a memo is not passed in', function() {
        var result = _.reduce([3, 2, 1], function(memo, item) {
          return memo - item;
        });

        expect(result).to.equal(0);
      });

    });
  });

}());
