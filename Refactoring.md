# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The original code suffers from **code duplication**, confusing **order of operations** and **nested conditionals**.

1. **Code duplication**: A new function called `createPartitionKey` is introduced. This function encapsulates the logic for generating a partition key using the `crypto` library. This refactoring improves code readability and maintainability by extracting the logic into a separate, reusable block.

2. **Order of Operations**: It is important to handle special cases at the beginning of the function to improve code readability and maintainability. By doing so, the main logic becomes more prominent and easier to understand. The function is now clearly divided into four important parts:

   - **Initialization**: Declare constants or other variables as needed.
   - **Handle special cases**: For example, an early return for an undefined event.
   - **Handle main operations**: This section represents the primary purpose of the function, which is generating the partition key.
   - **Handle last operations and return**: At the end of the function, additional operations, such as converting or formatting the final value (e.g. converting to a string) or validating it (eg. checking the length), can be performed.

3. **Nested conditionals**: By following the refactored order of operations, the need for nested conditionals is eliminated. This improvement simplifies the code structure and reduces complexity.
