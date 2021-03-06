var deFunc = require('../');

// Function's arity is equal to the number of defaults so all are optional
var all_optional = deFunc(
	["default_a", "default_b", "default_function"],
	function all_optional(option_a, option_b, fn){
		console.log("optional", "(", option_a, ", ", option_b, ", ", fn, ") extra: ", Array.prototype.slice.call(arguments, 3));
	});

// Function's arity is one greater than defaults so one option (the last) is required
var one_required = deFunc(
	["default_a", "default_b"],
	function one_required(option_a, option_b, fn){
		console.log("1 required", "(",option_a, ", ", option_b, ", ", fn, ") extra: ", Array.prototype.slice.call(arguments, 3));
	});

// Function's arity is two greater than defaults so two options (the last two) are required
var two_required = deFunc(
	["default_a"],
	function two_required(option_a, fn, fn2){
		console.log("2 required", "(",option_a, ", ", fn, ", ", fn2, ") extra: ", Array.prototype.slice.call(arguments, 3));
	});

var all_required = deFunc(
	[],
	function all_required(option_a, fn, fn2){
		console.log("all required", "(",option_a, ", ", fn, ", ", fn2, ") extra: ", Array.prototype.slice.call(arguments, 3));
	});

// all_option = All arguments optional.
// The last argument, if it exists, is always placed at end of the argument list.
// The remaining arguments, if they exist, fill in starting from the beginning.
// Default arguments fill in any remaining arguments.
all_optional();
all_optional("new_function");
all_optional("new_a", "new_function");
all_optional("new_a", "new_b", "new_function");
// Extra options are passed to along to the function after all the named arguments
all_optional("new_a", "new_b", "new_function", "extra_arguments");

// one_required = One arguments required.
// Functionally the same as all_optional except:
// Throws an exception if less than 1 argument is passed.
try {
	one_required();
} catch(e) {
	console.log("one_required", e);
}
one_required("new_function");
one_required("new_a", "new_function");
one_required("new_a", "new_b", "new_function");
// Extra options are passed to along to the function after all the named arguments
one_required("new_a", "new_b", "new_function1", "extra_arguments");

// two_required = Two arguments required.
// The last 2 arguments are always placed at end of the argument list.
// The remaining arguments, if they exist, fill in starting from the beginning.
// Default arguments fill in any remaining arguments.
// Throws an exception if less than 2 arguments are passed.
try {
	two_required("new_function");
} catch(e) {
	console.log("two_required", e);
}
two_required("new_function1", "new_function2"); 
two_required("new_a", "new_function1", "new_function2");
// Extra options are passed to along to the function after all the named arguments
two_required("new_a", "new_b", "new_function1", "extra_arguments");

// all_required = All arguments required.
// Kind of useless but included for completeness
// Throws an exception if less than the required number of arguments are passed.
try {
	all_required("new_function1", "new_function2"); 
} catch(e) {
	console.log("all_required", e);
}
all_required("new_a", "new_function1", "new_function2");
// Extra options are passed to along to the function after all the named arguments
all_required("new_a", "new_function1", "new_function2", "extra_arguments");

var copy_from_to = function(source, destination, filename){
	console.log("copy", filename, "from", source, "to", destination);
};

var source_preset = deFunc(
	["/from/here/"],
	copy_from_to);

source_preset("/to/here/", "a_file");

var source_and_destination_preset = deFunc(
	["/to/here/"],
	source_preset);

source_and_destination_preset("another_file");
source_and_destination_preset("/overridden/dest/", "yet_another_file");
source_and_destination_preset("/overridden/source/", "/overridden/dest/", "one_more_file");