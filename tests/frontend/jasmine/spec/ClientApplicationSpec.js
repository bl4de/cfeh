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

/*
 it("should be able to play a Song", function () {
 player.play(song);
 expect(player.currentlyPlayingSong).toEqual(song);

 //demonstrates use of custom matcher
 expect(player).toBePlaying(song);
 });

 describe("when song has been paused", function () {
 beforeEach(function () {
 player.play(song);
 player.pause();
 });

 it("should indicate that the song is currently paused", function () {
 expect(player.isPlaying).toBeFalsy();

 // demonstrates use of 'not' with a custom matcher
 expect(player).not.toBePlaying(song);
 });

 it("should be possible to resume", function () {
 player.resume();
 expect(player.isPlaying).toBeTruthy();
 expect(player.currentlyPlayingSong).toEqual(song);
 });
 });

 // demonstrates use of spies to intercept and test method calls
 it("tells the current song if the user has made it a favorite", function () {
 spyOn(song, 'persistFavoriteStatus');

 player.play(song);
 player.makeFavorite();

 expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
 });

 //demonstrates use of expected exceptions
 describe("#resume", function () {
 it("should throw an exception if song is already playing", function () {
 player.play(song);

 expect(function () {
 player.resume();
 }).toThrowError("song is already playing");
 });
 });

 */
