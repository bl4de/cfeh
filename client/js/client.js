/**
 * Created by rafal.janicki on 2015-03-10.
 */

// create Client application
var Application = new ClientApplication(),
	DataPresenter = new DataPresenter();

// run Application
Application.init(DataPresenter);
Application.receive();
