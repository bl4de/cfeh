/**
 * Created by bl4de on 10.03.15.
 */
describe("ClientApplication sample test suite", function () {

	var client = new ClientApplication(false),
		data = "134256#USD#PLN#1000#300.1#0.3271#24-JAN-15 10:27:44#PL\n" +
			"134256#USD#PLN#1000#300.1#0.3271#24-JAN-15 10:27:44#PL\n" +
			"134256#USD#PLN#1000#300.1#0.3271#24-JAN-15 10:27:44#PL\n" +
			"134256#USD#PLN#1000#300.1#0.3271#24-JAN-15 10:27:44#PL\n" +
			"134256#USD#PLN#1000#300.1#0.3271#24-JAN-15 10:27:44#PL\n" +
			"134256#USD#PLN#1000#300.1#0.3271#24-JAN-15 10:27:44#PL\n";

	describe("Proceed data tests", function () {
		var __messages = client.proceedData(data);

		it("data should contains 6 messages", function () {
			expect(__messages.length).toEqual(6);
		});

		it("valid message should be added to messages array", function () {
			expect(client.proceedMessage(__messages[0])).toBeTruthy();
		});
	});
});
