const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {

  it("should return the literal '0' when given no input", () => {
    const partitionKey = deterministicPartitionKey();
    expect(partitionKey).toBe("0");
  });

  it("should return a deterministic partition key for a given input", () => {
    const input = { foo: "bar" };
    const partitionKey = deterministicPartitionKey(input);
    const partitionKeyCompare = deterministicPartitionKey(input);
    expect(partitionKey).toEqual(partitionKeyCompare);
  });

  it("Returns event.partitionKey if its value is a string", () => {
    const key = "foo";
    const partitionKey = deterministicPartitionKey({ partitionKey: key });
    expect(partitionKey).toEqual(key);
  });

  it("Returns stringified event.partitionKey if its value is not a string", () => {
    [2023, {"foo": "bar"}].forEach((key) => {
      const partitionKey = deterministicPartitionKey({ partitionKey: key });
      expect(partitionKey).toEqual(JSON.stringify(key));
    });
  });

  it("Shorten event.partitionKey if its length exceed 256 char", () => {
      const key256 = "0".repeat(256);
      const key257 = "0".repeat(257);

      const partitionKey256 = deterministicPartitionKey({ partitionKey: key256 });
      const partitionKey257 = deterministicPartitionKey({ partitionKey: key257 });

      expect(partitionKey256).toEqual(key256);
      expect(partitionKey257.length).toBeLessThanOrEqual(256);
  });
});
