File: E2E Tests of Our Aurelia Framework

To run, from within the directory, run the following commands

npm install protractor
npm install selenium
npm install aurelia/protractor-plugin   //this repo sometimes changes location, and can be edited in conf.js so you access index.js, or whichever file has all the helpers, likeloadAndWaitForAureliaPage
npm install protractor-hotkeys
npm install protractor-numerator

To run the testing issue the following command

protractor conf.js

Components:
	Join Page
		Ensure all required fields   ✔
		Create Accounts ✔
		Logout ✔
 	
 	Login Page ✔
		Login  ✔

	Account Page
		Ensure User Validation 
		Add Additional User   ✔
		Delete Additional User  ✔
		Login with other user credentials  ✔
		All Accounts Listed ✔
		Unauthorize all Accounts ✔
		Authorize Several Accounts  ✔
	
	Drugs Page
		Add a Drug  ✔
		Ensure Drug Validation / Snackbar works
			Import/Export CSV (delay)
		Search Drug by Name and NDC
		Order Drug, Modify Order

	Shipment Page
		Test that From Account field has only authorized accounts ✔
		Create New Shipment ✔
		Filter Shipments by Donor Name and Tracking Number ✔
		Add Various Drugs to Shipment by NDC and Generic ✔
		Ensure you can delete a drug with qty 0 ✔
		Make sure Ordered Drugs are autochecked if meet criteria and not checked if don't ✔
		Make Sure you can manually accept (check) a drug ✔
			Make sure that inputs are marked as valid / invalid depending on input entered
		Test Keyboard Shortcuts (+/-, Enter) ✔
		Refresh Page and Make Sure Everything Saved to DB ✔
		Make sure snackbar messages are correct 

	Inventory Page
		Search by Location/Bin, Generic Name, NDC, Expiration
		Ensure CheckAll Box works  ✔
		Ensure that accepted drugs appear  ✔
		Filter drugs by each filter
		Dispense drugs disappear (including refresh)
		Dispensed drugs cannot be deleted from shipment page
		Pend / Unpend drugs
		Repack Drugs, original disappear, print label, new drugs appear with icon
		Original repacked drugs cannot be deleted from shipment page
		Eventually figure out what to do to test database “next” property set, records complete
		Ensure you can delete inventory with 0 qty
