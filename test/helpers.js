const assert = require("chai").assert;
const testData = require("./structures.json");
const shapeResponse = require("../helpers");

describe("shapeResponse", () => {
  const shapedData = shapeResponse(testData);

  it("should return an object with a contents key", () => {
    const keys = Object.keys(shapedData);
    assert.equal(typeof shapedData, "object", "type is not object");
    assert.deepEqual(keys, ["contents"], "keys do not match");
  });

  it("should return contents as an array", () => {
    const { contents } = shapedData;
    assert.equal(contents instanceof Array, true, "type is not array");
  });

  it("should contain 'title' and 'shortText' objects in the contents array", () => {
    const { contents } = shapedData;
    assert.equal(contents[0].type, "title", "first element is not title");
    assert.equal(contents[1].type, "shortText", "second element is not shortText");
  });

  it("should contain the city name and a link to the wiki page in the title", () => {
    const { text, link } = shapedData.contents[0];
    assert.equal(text, "NYC", "city is not present");
    assert.equal(link, "https://en.wikipedia.org/wiki/New_York_City", "link is incorrect");
  });

  it("should contain the weather summary and temperature in Farenheit in the shortText", () => {
    const { text, label } = shapedData.contents[1];
    assert.equal(text, "Overcast", "no summary present");
    assert.equal(label, "57°F", "incorrect temperature")
  });
});