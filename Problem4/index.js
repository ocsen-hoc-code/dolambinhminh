
//Conplexity: O(n)
var sum_to_n_f1 = function(n) {
    let result = 0;
    for( let i = 1; i <= n ; i++) {
        result += i;
    }
    return result;
};

//Conplexity: O(n)
var sum_to_n_f2 = function(n) {
    if(n < 1)
        return 0;
    return n + sum_to_n_f2(n - 1);
};

//Conplexity: O(1)
var sum_to_n_f3 = function(n) {
    return n * (n + 1) / 2
};


console.log(sum_to_n_f1(15));
console.log(sum_to_n_f2(15));
console.log(sum_to_n_f3(15));