// spec.js
//-----------------Pre-Reqs------------------------------------------
var hotkeys = require("protractor-hotkeys");

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------


var accounts = [["Sirum Georgia Pharmacy", "123-456-7899", "George","Wang"], ["GoodPill","673-487-9111","Amy","Chen"], ["Pilly","398-222-4311","Adam","Kircher"]]
var drugs = [["4789-9455","Omar Test","Tablet"],["12345-6455","Adam Test","ER Capsule"],["4999-3355","Kiah Test","Injection"]]
var shipments = [["TESTINGME1",0],["TESTINGME2",0],["TESTINGME3",1],["TESTINGME4",1]]
var NUM_DRUGS_TO_ADD = 5
var bins = ["A111","B455","Z903"]
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------


var login = function(phone, password){
  element(by.name('pro_phone')).element(by.name('input')).clear()
  element(by.name('pro_phone')).element(by.name('input')).sendKeys(phone)
  element(by.name('pro_password')).element(by.name('input')).sendKeys(password)
  element(by.name('pro_button')).click()  //click the login button
  browser.sleep(5000)  //wait for it to load
}

var logout = function(){
      element(by.css('[href="#/account"]')).click() //How to click on any of the navbar elements
      browser.sleep(2000)
      element(by.name("pro_uninstall_button")).click()
      browser.sleep(5000)
      expect(browser.getTitle()).toEqual('Login | SIRUM'); //check that it's the right page
};

var selectDropdownbyNum = function ( element, optionNum ) {
    if (optionNum){
      var options = element.all(by.tagName('option'))   
        .then(function(options){
          options[optionNum].click();
        });
    }
  };


var join = function(arr){
    facility_name = arr[0]
    phone = arr[1]
    first_name = arr[2]
    last_name = arr[3]

    element(by.name("pro_facility")).element(by.name("input")).clear()
    element(by.name("pro_facility")).element(by.name("input")).sendKeys(facility_name)
    element(by.name("pro_license")).element(by.name("input")).clear()
    element(by.name("pro_license")).element(by.name("input")).sendKeys("Pharmacy")
    element(by.name("pro_facility_phone")).element(by.name("input")).clear()
    element(by.name("pro_facility_phone")).element(by.name("input")).sendKeys(phone)
    element(by.name("pro_street")).element(by.name("input")).clear()
    element(by.name("pro_street")).element(by.name("input")).sendKeys("Somewhere")
    element(by.name("pro_city")).element(by.name("input")).clear()
    element(by.name("pro_city")).element(by.name("input")).sendKeys("Somehow")
    element(by.name("pro_zip")).element(by.name("input")).clear()
    element(by.name("pro_zip")).element(by.name("input")).sendKeys("94301")
    element(by.name("pro_first_name")).element(by.name("input")).clear()
    element(by.name("pro_first_name")).element(by.name("input")).sendKeys(first_name)
    element(by.name("pro_last_name")).element(by.name("input")).clear()
    element(by.name("pro_last_name")).element(by.name("input")).sendKeys(last_name)
    element(by.name("pro_email")).element(by.name("input")).clear()
    element(by.name("pro_email")).element(by.name("input")).sendKeys("littleoldme@sirum.org")
    element(by.name("pro_personal_phone")).element(by.name("input")).clear()
    element(by.name("pro_personal_phone")).element(by.name("input")).sendKeys(phone)
    element(by.name("pro_password")).element(by.name("input")).clear()
    element(by.name("pro_password")).element(by.name("input")).sendKeys("password")
}

var addDrug = function(arr){
  element(by.name("pro_ndc_field")).element(by.name("input")).sendKeys(arr[0])
  element(by.name("pro_gen_field")).element(by.name("input")).clear()
  element(by.name("pro_gen_field")).element(by.name("input")).sendKeys(arr[1])
  element(by.name("pro_form_field")).element(by.name("input")).clear()
  element(by.name("pro_form_field")).element(by.name("input")).sendKeys(arr[2])
  browser.sleep(1000)
  element(by.name("pro_drug_button")).click()
  browser.sleep(2000)
}

var openPageFromScratch = function(){
    browser.loadAndWaitForAureliaPage('http://localhost:9000');
    browser.sleep(10000)   //added this because a recent change here brokethe waiting
    login(accounts[0][1],"password")
    browser.refresh()
    browser.sleep(4000)
    element(by.name('new_shipment')).click()
    browser.sleep(4000)
}

var type = function(name, text, n){
  if(n == -1){
    element(by.name(name)).element(by.name("input")).clear()
    element(by.name(name)).element(by.name("input")).sendKeys(text)
  } else {
    var cssid = '[name="'
    full = cssid.concat(name).concat('"]:nth-child(').concat(n.toString()).concat(')')
    element(by.css(full)).element(by.name("input")).clear()
    element(by.css(full)).element(by.name("input")).sendKeys(text)
  }
}

var clickDrawer = function(){
  element(by.css('[role="button"]')).click()
  browser.sleep(1000)
}

var hitEnterOn = function(name){
    element(by.name(name)).element(by.name("input")).sendKeys(protractor.Key.ENTER)
}



//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------




describe('SIRUM Website V2', function() {
  it("should let me search by various parameters", function(){
    openPageFromScratch()
    element(by.css('[href="#/inventory"]')).click()
    browser.sleep(2000)
    
    //Search by generic
    element(by.name("pro_searchbar")).click()
    element(by.name("pro_searchbar")).element(by.name("pro_input_field")).sendKeys(drugs[0][1])
    browser.sleep(1000)
    element(by.css('[name="pro_search_res"]:nth-child(1)')).click()
    browser.sleep(4000)
    
    /*
    //Search by expiration date
    element(by.name("pro_searchbar")).click()
    element(by.name("pro_searchbar")).element(by.name("pro_input_field")).clear()
    element(by.name("pro_searchbar")).element(by.name("pro_input_field")).sendKeys("2017-09")
    //browser.sleep(1000)
    //element(by.css('[name="pro_search_res"]:nth-child(1)')).click()
    browser.sleep(4000)
    //Search by  NDC
    element(by.name("pro_searchbar")).click()
    element(by.name("pro_searchbar")).element(by.name("pro_input_field")).clear()
    element(by.name("pro_searchbar")).element(by.name("pro_input_field")).sendKeys(drugs[0][0])
    browser.sleep(1000)
    element(by.css('[name="pro_search_res"]:nth-child(1)')).click()
    browser.sleep(4000)
    */

    //Search by bin
    //element(by.name("pro_searchbar")).click()
    //element(by.name("pro_searchbar")).element(by.name("pro_input_field")).sendKeys(bins[0])
    //browser.sleep(1000)
    //element(by.css('[name="pro_search_res"]:nth-child(1)')).click()
    //browser.sleep(4000)

    //browser.refresh()
    //browser.sleep(5000)
    //Verify that checkAll works
    element(by.name("pro_checkall")).click()
    browser.sleep(1000)
    var resToExpect = 9
    //Make sure all boxes are not checked, then check them all
    for(var i = 1; i <= resToExpect; i++){
      var drug_line_name = '[name="pro_transaction"]:nth-child('
      var full = drug_line_name.concat(i.toString()).concat(')')
      //expect(element(by.css(full)).$$('td').get(1).getText()).toBe(accounts[accounts.length-i][0]); //check that all the facilities are there
      expect(element(by.css(full)).element(by.name("pro_transaction_checkbox")).element(by.name("pro_input")).getAttribute('checked')).toBe("true")
      //while verifying, go ahead and check all their boxes
      element(by.css(full)).element(by.name('pro_transaction_checkbox')).click() //should unauthorize all accounts
      browser.sleep(1000)
    }

    for(var i = 1; i <= resToExpect; i++){
      var drug_line_name = '[name="pro_transaction"]:nth-child('
      var full = drug_line_name.concat(i.toString()).concat(')')
      //expect(element(by.css(full)).$$('td').get(1).getText()).toBe(accounts[accounts.length-i][0]); //check that all the facilities are there
      expect(element(by.css(full)).element(by.name("pro_transaction_checkbox")).element(by.name("pro_input")).getAttribute('checked')).toBe(null)
      //while verifying, go ahead and check all their boxes
      //element(by.css(full)).element(by.name('pro_transaction_checkbox')).click() //should unauthorize all accounts
      browser.sleep(1000)
    }

    /*
    //Check that all the filters work
    //TODO: Figure out way make this all encapsulated
    var transactions = element.all(by.name("pro_transaction"))
    expect(transactions.count()).toEqual(10)

    element(by.name("pro_ndc_filter")).element(by.name('pro_checkbox')).click()
    browser.sleep(2000)
    transactions = element.all(by.name("pro_transaction"))
    expect(transactions.count()).toEqual(0)
    element(by.name("pro_ndc_filter")).element(by.name('pro_checkbox')).click()

    element(by.name("pro_exp_filter")).element(by.name("pro_checkbox")).click()
    browser.sleep(2000)
    transactions = element.all(by.name("pro_transaction"))
    expect(transactions.count()).toEqual(8)
    element(by.name("pro_exp_filter")).element(by.name("pro_checkbox")).click()

    element(by.name("pro_repack_filter")).element(by.name("pro_checkbox")).click()
    browser.sleep(2000)
    transactions = element.all(by.name("pro_transaction"))
    expect(transactions.count()).toEqual(0)
    element(by.name("pro_repack_filter")).element(by.name("pro_checkbox")).click()

    element(by.name("pro_form_filter")).element(by.name("pro_checkbox")).click()
    browser.sleep(2000)
    transactions = element.all(by.name("pro_transaction"))
    expect(transactions.count()).toEqual(0)
    element(by.name("pro_form_filter")).element(by.name("pro_checkbox")).click()
  */
    /*
    //Test if dispensing works
    element(by.css('[name="pro_transaction"]:nth-child(1)')).element(by.name('pro_transaction_checkbox')).click()  //will dispense this drug
    browser.sleep(1000)
    element(by.name("pro_menu")).click()
    browser.sleep(2000)
    element(by.name("pro_dispense")).click()
    browser.sleep(2000)
    transactions = element.all(by.name("pro_transaction"))
    expect(transactions.count()).toEqual(9)

    browser.refresh()
    browser.sleep(4000)
    transactions = element.all(by.name("pro_transaction"))
    expect(transactions.count()).toEqual(9)
    browser.sleep(2000)
    *//*
     //Check the drug, click on "pend", then it should incremenet the amount of options
     //int he drawer, click on the first one
     //you should find the drug there
     //Test if pending works
    element(by.css('[name="pro_transaction"]:nth-child(1)')).element(by.name('pro_transaction_checkbox')).click()  //will dispense this drug
    element(by.css('[name="pro_transaction"]:nth-child(2)')).element(by.name('pro_transaction_checkbox')).click()  //will dispense this drug
    browser.sleep(1000)
    element(by.name("pro_menu")).click()
    browser.sleep(2000)
    element(by.name("pro_pend")).click()
    browser.sleep(2000)
    var transactions = element.all(by.name("pro_transaction"))
    expect(transactions.count()).toEqual(7)
    clickDrawer()
    browser.sleep(1000)
 
    var pendeditems = element.all(protractor.by.css('[name="pro_pended_items"]')) //
    expect(pendeditems.count()).toEqual(1)  //
    browser.sleep(2000)
    element(by.css('[name="pro_pended_items"]:nth-of-type(1)')).click()
    browser.sleep(1000)
    var transactions = element.all(by.name("pro_transaction"))
    expect(transactions.count()).toEqual(2)
    element(by.name("pro_menu")).click()
    browser.sleep(2000)
    element(by.name("pro_pend")).click()
    browser.sleep(2000)
    */

  })



  /* Shipments Page Testing
   * Running this block on it's own should completely test the functionality
   * of the shipments page.
   */
   //--------------------------------------------------------------------------------------------
  /*
  //START PAGE: LOGIN
  //END PAGE: NEW SHIPMENT  
  it("should let me create new shipments",function(){
    openPageFromScratch()

    for(var i = 0; i < shipments.length; i++){
      type("pro_tracking_input",shipments[i][0],-1)
      selectDropdownbyNum(element(by.name("pro_from_option")),shipments[i][1]+1)
      browser.sleep(1000)
      element(by.name('pro_create_button')).click()
      browser.sleep(2000)
      clickDrawer()
      browser.sleep(1000)
      element(by.name('new_shipment')).click()
      browser.sleep(1000)
    }
  })

  //START PAGE: NEW SHIPMENT
  //END PAGE: SHIPMENTS (with drawer open and filtered)
  it("should let me check the existing shipments", function(){
    //openPageFromScratch()
    clickDrawer()
    //element(by.css('[name="pro_shipments"]:nth-child(2)')).click()
    browser.sleep(2000)
    
    //var shipmentsindrawer = element.all(protractor.by.css('[name="pro_shipments"]')) //gets all the shipments
    //expect(shipmentsindrawer.count()).toEqual(shipments.length)  //this is how you get the count of number of shipments in the drawer
    //browser.sleep(3000)

    type("pro_filter_input",shipments[3][0],-1) //searching for one tracking number returns one output
    var aftersearchshipmentsindrawer = element.all(protractor.by.css('[name="pro_shipments"]')) //gets all the shipments
    expect(aftersearchshipmentsindrawer.count()).toEqual(1)
    browser.sleep(1000)


    type("pro_filter_input",accounts[2][0],-1)  //searching by account -- in this case unused account will return nothing
    browser.sleep(2000)
    expect(element.all(protractor.by.css('[name="pro_shipments"]')).count()).toEqual(0)
    browser.sleep(1000)
  })


  //START PAGE: SHIPMENTS
  //END PAGE: A SHIPMENT
  it("should let me add items to a donation", function(){
    //openPageFromScratch()
    browser.refresh()
    browser.sleep(5000)
    //clickDrawer()
    //browser.sleep(2000)
    //This could be a point to search for a particular shipment and then add stuff to that shipment
    element(by.css('[name="pro_shipments"]:nth-of-type(2)')).click() //this is 1-indexed. use nth-of-type instead of nth-child here to access
    browser.sleep(4000)

    for(var i = 0; i < NUM_DRUGS_TO_ADD; i++){
      drug = drugs[i%3][i%2] //alternates between all the drugs, and switches between using NDC and generic
      element(by.name("pro_searchbar")).click()
      element(by.name("pro_searchbar")).element(by.name("pro_input_field")).sendKeys(drug)
      browser.sleep(2000)
      element(by.name("pro_searchbar")).element(by.name("pro_input_field")).sendKeys(protractor.Key.ENTER)
      browser.sleep(2000)
      element(by.css('[name="pro_transaction"]:nth-of-type(1)')).element(by.name('pro_exp')).element(by.name("input")).clear()
      element(by.css('[name="pro_transaction"]:nth-of-type(1)')).element(by.name('pro_exp')).element(by.name("input")).sendKeys("8/17")
      element(by.css('[name="pro_transaction"]:nth-of-type(1)')).element(by.name('pro_exp')).element(by.name("input")).sendKeys(protractor.Key.ENTER)

      element(by.css('[name="pro_transaction"]:nth-of-type(1)')).element(by.name('pro_qty')).element(by.name("input")).sendKeys("55")
      element(by.css('[name="pro_transaction"]:nth-of-type(1)')).element(by.name('pro_qty')).element(by.name("input")).sendKeys(protractor.Key.ENTER)
    
      browser.sleep(2000)
      //Then ensure that it autochecks on an ordered drug that meets criteria
      if((drug == "Omar Test") || (drug == "4789-9455")){    
        expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Drug is ordered')
        expect(element(by.css('[name="pro_transaction"]:nth-child(1)')).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe("true") //how to expect an unchecked box
      } else {
        expect(element(by.css('[name="pro_transaction"]:nth-child(1)')).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe(null) //how to expect an unchecked box
      }
     // element(by.css('[name="pro_account"]:nth-child(2)')).element(by.name('pro_checkbox')).click() //how to approve or not approve a donor
     // browser.sleep(1000)
      //expect(element(by.css('[name="pro_account"]:nth-child(2)')).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe(null) //how to expect a checked box
    }

    var drugsinShipment = element.all(by.name("pro_transaction"))
    expect(drugsinShipment.count()).toEqual(NUM_DRUGS_TO_ADD)
    browser.sleep(2000)

  })
  
  //START PAGE: A SHIPMENT
  //END PAGE: SAME SHIPMENT
  it("should let me check/uncheck boxes and save this", function(){
    browser.refresh()
    browser.sleep(3000)
    browser.actions().mouseMove(element(by.name('new_shipment')),{x:500,y:200}).click().perform()
    
    for(var i = 1; i <= NUM_DRUGS_TO_ADD; i++){

      var name = '[name="pro_transaction"]:nth-of-type('
      var full = name.concat(i.toString()).concat(')')
      
      if((i == 2) || (i == 5)){
        expect(element(by.css(full)).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe("true") //how to expect an unchecked box
      } else {
        expect(element(by.css(full)).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe(null) //how to expect an unchecked boxclick
      }
      element(by.css(full)).element(by.name("pro_checkbox")).click()
    }

    browser.sleep(1000)
    browser.refresh()
    browser.sleep(3000)
    browser.actions().mouseMove(element(by.name('new_shipment')),{x:500,y:200}).click().perform()
    
    for(var i = 1; i <= NUM_DRUGS_TO_ADD; i++){

      var name = '[name="pro_transaction"]:nth-of-type('
      var full = name.concat(i.toString()).concat(')')
      
      if((i != 2) && (i != 5)){
        expect(element(by.css(full)).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe("true") //how to expect an unchecked box
      } else {
        expect(element(by.css(full)).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe(null) //how to expect an unchecked boxclick
      }
      element(by.css(full)).element(by.name("pro_checkbox")).click()

    }
  })


  //START PAGE: A SHIPMENT
  //END PAGE: SAME SHIPMENT
  it("should let me use keyboard shortcuts", function(){
    var drugsinShipment = element.all(by.name("pro_transaction"))
    expect(drugsinShipment.count()).toEqual(NUM_DRUGS_TO_ADD)
    browser.sleep(2000)

    element(by.css('[name="pro_transaction"]:nth-of-type(2)')).element(by.name('pro_qty')).element(by.name("input")).clear()
    element(by.css('[name="pro_transaction"]:nth-of-type(2)')).element(by.name('pro_qty')).element(by.name("input")).sendKeys("0")

    browser.sleep(2000)
    var afterdrugsinShipment = element.all(by.name("pro_transaction"))
    expect(afterdrugsinShipment.count()).toEqual(NUM_DRUGS_TO_ADD-1)
    browser.sleep(2000)

    expect(element(by.css('[name="pro_transaction"]:nth-of-type(2)')).element(by.name('pro_exp')).element(by.name("input")).getAttribute('value')).toBe('08/17')
    element(by.css('[name="pro_transaction"]:nth-of-type(2)')).element(by.name('pro_exp')).element(by.name("input")).sendKeys("+")
    expect(element(by.css('[name="pro_transaction"]:nth-of-type(2)')).element(by.name('pro_exp')).element(by.name("input")).getAttribute('value')).toBe('09/17')


  })
  */


  
  //--------------------------------------------------------------------------------------------


  /*it("should let me add a drug",function(){
    //NOTE: THIS FUNCTIONALITY IS CURRENTLY BUGGY BUT WERE IGNORING FOR NOW
    browser.loadAndWaitForAureliaPage('http://localhost:9000');
    login(accounts[0][1],"password")
    browser.refresh()
    browser.sleep(3000)
    element(by.name('new_shipment')).click() //to get rid of the drawer
    element(by.css('[href="#/drugs"]')).click()
    browser.sleep(4000)

    for(var i = 0; i<drugs.length; i++){
      addDrug(drugs[i])
      element(by.css('[href="#/drugs"]')).click()
      browser.sleep(1000)
      browser.refresh()
      browser.sleep(5000)
    }

  })*/


  //START PAGE: LOGIN
  //END PAGE: SHIPMENTS  
 /* it("should let me create the accounts we'll be using",function(){
    browser.loadAndWaitForAureliaPage('http://localhost:9000');
    element(by.css('[href="#/join"]')).click() //Go to the join page
    browser.sleep(2000) //wait for it to load
    expect(browser.getTitle()).toEqual('Join | SIRUM'); //check that it's the right page
    for(var i = 0; i < accounts.length;i++){
      join(accounts[i])
      browser.sleep(2000)
      element(by.name("pro_checkbox")).click()
      browser.sleep(2000)
      element(by.name("pro_install")).click()
      browser.sleep(6000)
      expect(browser.getTitle()).toEqual('Shipments | SIRUM'); //check that it's logged in
      element(by.css('[href="#/account"]')).click() //How to click on any of the navbar elements
      browser.sleep(2000)
      element(by.name("pro_uninstall_button")).click()
      browser.sleep(5000)
      expect(browser.getTitle()).toEqual('Login | SIRUM');
      element(by.css('[href="#/join"]')).click() //Go to the join page
      browser.sleep(2000) //wait for it to load
      expect(browser.getTitle()).toEqual('Join | SIRUM'); 
    }
    browser.sleep(1000)
    element(by.css('[href="#/login"]')).click() //How to click on any of the navbar elements
    login(accounts[0][1],"password")
  })
  
  

  //START PAGE: SHIPMENTS
  //END PAGE: SHIPMENTS  
  it("should let me log out and then log back in multiple times",function(){
    browser.loadAndWaitForAureliaPage('http://localhost:9000');
    login(accounts[0][1],"password")
    browser.refresh()
    browser.sleep(4000)
    element(by.name('new_shipment')).click()

    for(var i = 0; i < 3; i++){
      element(by.css('[href="#/account"]')).click() //How to click on any of the navbar elements
      browser.sleep(2000)
      element(by.name("pro_uninstall_button")).click()
      browser.sleep(5000)
      expect(browser.getTitle()).toEqual('Login | SIRUM'); //check that it's the right page
      login(accounts[1][1],"password")
      browser.sleep(5000)
      expect(browser.getTitle()).toEqual('Shipments | SIRUM') //So it's logged in
      element(by.name('new_shipment')).click() //to get rid of the drawer
    }
  })


  //START PAGE: SHIPMENTS
  //END PAGE: LOGIN  
  it("should not let me login without all the proper info", function(){
   // browser.loadAndWaitForAureliaPage('http://localhost:9000');
    logout()
    browser.sleep(5000)
    login(accounts[0][1],"pass")
    expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Login failed Name or password is incorrect.') //how we can read snackbar
    login("650.488.7000","pass")
    expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Login failed missing') //how we can read snackbar

  })




  //START PAGE: LOGIN
  //END PAGE: JOIN  
  it("should not let me Join without all the proper info",function(){
    element(by.css('[href="#/join"]')).click() //Go to the join page
    browser.sleep(2000) //wait for it to load
    expect(browser.getTitle()).toEqual('Join | SIRUM'); //check that it's the right page
    account = ["Buggy Pharmacy","567-989-2222","Omar","Sow"]
    join(account)
    element(by.name("pro_checkbox")).click()

    //Check that it requires facility
    element(by.name("pro_facility")).element(by.name("input")).clear()
    browser.sleep(2000)
    element(by.name("pro_install")).click()
    browser.sleep(1000)
    expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Join failed Name null is required') //how we can read snackbar
    browser.sleep(2000)
    join(account)

    //Check that it requires facility phone
    element(by.name("pro_facility_phone")).element(by.name("input")).clear()
    browser.sleep(1000)
    element(by.name("pro_install")).click()
    browser.sleep(1000)
    expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Join failed Phone null is required') //how we can read snackbar
    browser.sleep(2000)
    join(account)


    //Check that street is required
    element(by.name("pro_street")).element(by.name("input")).clear()
    browser.sleep(2000)
    element(by.name("pro_install")).click()
    browser.sleep(1000)
    expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Join failed Street null is required') //how we can read snackbar
    browser.sleep(2000)
    join(account)


    //check that city is required
    element(by.name("pro_city")).element(by.name("input")).clear()
    browser.sleep(2000)
    element(by.name("pro_install")).click()
    browser.sleep(1000)
    expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Join failed City null is required') //how we can read snackbar
    browser.sleep(2000)
    join(account)

 
    //check that zip is required
    element(by.name("pro_zip")).element(by.name("input")).clear()
    browser.sleep(2000)
    element(by.name("pro_install")).click()
    browser.sleep(1000)
    expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Join failed Zip null is required') //how we can read snackbar
    browser.sleep(2000)
    join(account)


    //check that email is required
    element(by.name("pro_email")).element(by.name("input")).clear()
    browser.sleep(2000)
    element(by.name("pro_install")).click()
    browser.sleep(1000)
    expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Join failed Email null is required') //how we can read snackbar
    browser.sleep(2000)
    join(account)


    //check that name is required
    element(by.name("pro_first_name")).element(by.name("input")).clear()
    element(by.name("pro_last_name")).element(by.name("input")).clear()
    browser.sleep(2000)
    element(by.name("pro_install")).click()
    browser.sleep(1000)
    expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Join failed Name First null is required; Name Last null is required') //how we can read snackbar
    browser.sleep(2000)
    join(account)


    //check that personal phone is required
    element(by.name("pro_personal_phone")).element(by.name("input")).clear()
    browser.sleep(2000)
    element(by.name("pro_install")).click()
    browser.sleep(1000)
    expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Join failed Phone null is required') //how we can read snackbar
    browser.sleep(2000)
    //join(account)

  })




  /* The testing for the accounts page should allow me to properly add a user
   * and then switch to them by logging out logging back in with them. It should
   * allow me to delete the user and then I can't log back in with them.
   * It should not let me create a new user without properfieldsfor everything.
   * It should list all the accounts we've added, and allow me to authorize/unauthorize
   * them all, after which I need to check my resulting options on the 
   * new shipment page.
   *
   */
   /*
  //START PAGE: LOGIN
  //END PAGE: SHIPMENT     
  it("should let me check the accounts, approve some, unauthorize all, work with that", function(){
    element(by.css('[href="#/login"]')).click() //How to click on any of the navbar elements
    //browser.loadAndWaitForAureliaPage('http://localhost:9000');
    //element(by.name('pro_phone')).element(by.name('input')).clear()
    //element(by.name('pro_phone')).element(by.name('input')).sendKeys("123-456-7899") //The first one in our facility array
    //element(by.name('pro_password')).element(by.name('input')).sendKeys("password")
    //element(by.name('pro_button')).click()
    
    login(accounts[0][1],"password")
    browser.sleep(6000)
    expect(browser.getTitle()).toEqual('Shipments | SIRUM') 
    element(by.name('new_shipment')).click()
    browser.sleep(1000)
    element(by.css('[href="#/account"]')).click() //How to click on any of the navbar elements
    browser.sleep(2000)


    //element(by.css('[name="pro_account"]:nth-child(2)')).element(by.name('pro_checkbox')).click() //how to approve or not approve a donor
    browser.sleep(4000)
    //This is how we access table elements
    var rows = element.all(protractor.by.css('[name="pro_account"]')) //gets all the rows
    expect(rows.count()).toEqual(accounts.length - 1)  //this is how you get the count of number of accounts listed
    var rowElems = element(by.css('[name="pro_account"]:nth-child(2)')).$$('td'); //this is how you get everything from a row (second here)
    //expect(rowElems.count()).toBe(3); //how you'd count the number of columns
    
    //Check that all the other accounts[1:n] excluding accounts[0] is present
    for(var i = 1; i < accounts.length; i++){
      var account_line_name = '[name="pro_account"]:nth-child('
      var full = account_line_name.concat(i.toString()).concat(')')
      expect(element(by.css(full)).$$('td').get(1).getText()).toBe(accounts[accounts.length-i][0]); //check that all the facilities are there
    
      //while verifying, go ahead and check all their boxes
      element(by.css(full)).element(by.name('pro_checkbox')).click() //should approve all donors
      browser.sleep(1000)

    }
    //at this point, expect all to be approved. need to now confirm that they stay checked after a
    //a refresh and that some can be unchecked and stay that way

    //for checkboxes, will have "true" if true and null if "false"
    expect(element(by.css('[name="pro_account"]:nth-child(2)')).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe("true") //how to expect an unchecked box
    element(by.css('[name="pro_account"]:nth-child(2)')).element(by.name('pro_checkbox')).click() //how to approve or not approve a donor
    browser.sleep(1000)
    expect(element(by.css('[name="pro_account"]:nth-child(2)')).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe(null) //how to expect a checked box
    element(by.css('[name="pro_account"]:nth-child(2)')).element(by.name('pro_checkbox')).click() //how to approve or not approve a donor
    browser.sleep(1000)
    expect(element(by.css('[name="pro_account"]:nth-child(2)')).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe("true") //how to expect an unchecked box

    for(var i = 1; i < accounts.length; i++){
      var account_line_name = '[name="pro_account"]:nth-child('
      var full = account_line_name.concat(i.toString()).concat(')')
      //expect(element(by.css(full)).$$('td').get(1).getText()).toBe(accounts[accounts.length-i][0]); //check that all the facilities are there
    
      //while verifying, go ahead and check all their boxes
      element(by.css(full)).element(by.name('pro_checkbox')).click() //should unauthorize all accounts
      browser.sleep(1000)
    }

    browser.refresh()
    browser.sleep(5000)
    for(var i = 1; i < accounts.length; i++){
      var account_line_name = '[name="pro_account"]:nth-child('
      var full = account_line_name.concat(i.toString()).concat(')')
      //expect(element(by.css(full)).$$('td').get(1).getText()).toBe(accounts[accounts.length-i][0]); //check that all the facilities are there
    
      //while verifying, go ahead and check all their boxes
      //expect(element(by.css(full)).element(by.name('pro_checkbox')).click() //should unauthorize all accounts
      expect(element(by.css(full)).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe(null) //expect all the accounts to be unauthorized
      browser.sleep(1000)
    }

    element(by.css('[href="#/shipments"]')).click()
    browser.sleep(3000)
    element(by.name('new_shipment')).click()
    browser.sleep(2000)
    var options = element(by.name("pro_from_option")).all(by.tagName('option'))
    expect(options.count()).toEqual(1)//there's one empty option here

    element(by.css('[href="#/account"]')).click()
    browser.sleep(3000)
    for(var i = 1; i < accounts.length; i++){
      var account_line_name = '[name="pro_account"]:nth-child('
      var full = account_line_name.concat(i.toString()).concat(')')
      //expect(element(by.css(full)).$$('td').get(1).getText()).toBe(accounts[accounts.length-i][0]); //check that all the facilities are there
    
      //while verifying, go ahead and check all their boxes
      //expect(element(by.css(full)).element(by.name('pro_checkbox')).click() //should unauthorize all accounts
      if(i % 2 == 0){
        element(by.css(full)).element(by.name('pro_checkbox')).click() //should unauthorize all accounts
      }
      //expect(element(by.css(full)).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe(null) //expect all the accounts to be unauthorized
      browser.sleep(1000)
    }
    element(by.css('[href="#/shipments"]')).click()
    browser.sleep(3000)
    element(by.name('new_shipment')).click()
    browser.sleep(2000)
    var options = element(by.name("pro_from_option")).all(by.tagName('option')).getAttribute('value')
    expect(options.count()).toEqual(2)
    expect(options).toEqual(["","GoodPill"])

    element(by.css('[href="#/account"]')).click()
    browser.sleep(3000)
    for(var i = 1; i < accounts.length; i++){
      var account_line_name = '[name="pro_account"]:nth-child('
      var full = account_line_name.concat(i.toString()).concat(')')
      //expect(element(by.css(full)).$$('td').get(1).getText()).toBe(accounts[accounts.length-i][0]); //check that all the facilities are there
    
      //while verifying, go ahead and check all their boxes
      //expect(element(by.css(full)).element(by.name('pro_checkbox')).click() //should unauthorize all accounts
      if(i % 2 != 0){
        element(by.css(full)).element(by.name('pro_checkbox')).click() //should unauthorize all accounts
      }
      //expect(element(by.css(full)).element(by.name('pro_checkbox')).element(by.name("pro_input")).getAttribute('checked')).toBe(null) //expect all the accounts to be unauthorized
      browser.sleep(1000)
    }
    element(by.css('[href="#/shipments"]')).click()
    browser.sleep(3000)
    element(by.name('new_shipment')).click()
    browser.sleep(2000)
    var options = element(by.name("pro_from_option")).all(by.tagName('option')).getAttribute('value')
    expect(options.count()).toEqual(3)
    expect(options).toEqual(["","GoodPill","Pilly"])

    //selectDropdownbyNum(element(by.name("pro_from_option")),1).by.tagName('option'))
    //expect(element(by.css('[name="pro_account"]:nth-child(1)')).$$('td').get(1).getText()).toBe(accounts[2][0]); //this is how you read the facility name
    //expect(element(by.css('[name="pro_account"]:nth-child(2)')).$$('td').get(1).getText()).toBe(accounts[1][0]); //this is how you read the facility name
    //expect(rowElems.get(2).getText()).toBe(accounts[1][0]); //this is how you read the facility name

  })

  //START PAGE: LOGIN
  //END PAGE: LOGIN  
  it("should let me add a user with correct info / log in with them / delete them / no longer be able to log in", function(){
    logout()
    //browser.loadAndWaitForAureliaPage('http://localhost:9000');
    //element(by.name('pro_phone')).element(by.name('input')).clear()
    //element(by.name('pro_phone')).element(by.name('input')).sendKeys("123-456-7899") //The first one in our facility array
    //element(by.name('pro_password')).element(by.name('input')).sendKeys("password")
    //element(by.name('pro_button')).click()
    login(accounts[0][1],"password")
    browser.sleep(6000)
    expect(browser.getTitle()).toEqual('Shipments | SIRUM') 
    element(by.name('new_shipment')).click()
    browser.sleep(1000)
    element(by.css('[href="#/account"]')).click() //How to click on any of the navbar elements
    browser.sleep(2000)

    element(by.css('[role="button"]')).click()
    browser.sleep(1000)
    var new_button = element(by.name('pro_new_user'))
    new_button.click()
    browser.sleep(1000)

    browser.actions().mouseMove(new_button,{x:500,y:200}).click().perform() //how to click away the drawer, somewhere arbitrary on the page
    browser.sleep(3000)

    element(by.name("pro_first_name")).element(by.name("input")).sendKeys("Mine")
    element(by.name("pro_last_name")).element(by.name("input")).sendKeys("Sow")
    element(by.name("pro_email")).element(by.name("input")).sendKeys("oez@sirum.org")
    element(by.name("pro_phone")).element(by.name("input")).sendKeys("456-098-2002")
    element(by.name("pro_password")).element(by.name("input")).sendKeys("password")
    element(by.name("pro_create_user_button")).click()
    browser.sleep(5000)

   // name = "existing_users"
    element(by.css('[role="button"]')).click()
    browser.sleep(1000)
    var users = element.all(by.name("existing_users")).then(function(users){
          //for(var i = 0; i < users.length; i++){
           // users[i].click()
         // }
         users[1].click()
        });

    //element(by.css('[name="existing_users"]:nth-child(2)')).click() //nth-child as way of picking something from a list
    browser.sleep(1000)
    browser.actions().mouseMove(new_button,{x:500,y:200}).click().perform() //how to click away the drawer
    browser.sleep(1000)
    element(by.name("pro_uninstall_button")).click()
    browser.sleep(3000)

    login("456-098-2002","password") //prove you can log in with the new user
    element(by.name('new_shipment')).click()
    browser.sleep(1000)
    logout()
    login("123-456-7899","password") //log back in with the original user for the account
    element(by.name('new_shipment')).click()
    browser.sleep(1000)
    element(by.css('[href="#/account"]')).click() //How to click on any of the navbar elements
    browser.sleep(10000)
    
    element(by.css('[role="button"]')).click()
    browser.sleep(1000)
    var users = element.all(by.name("existing_users")).then(function(users){
          //for(var i = 0; i < users.length; i++){
           // users[i].click()
         // }
         users[1].click()
        });
    browser.sleep(1000)
    browser.actions().mouseMove(new_button,{x:500,y:200}).click().perform() //how to click away the drawer
    browser.sleep(1000)
    element(by.name("pro_delete_user_button")).click()
    browser.sleep(1000)
    element(by.name("pro_uninstall_button")).click()
    browser.sleep(2000)
    login("456-098-2002","password") //prove you can log in with the new user
    expect(element(by.css('[ref="snackbar"]')).element(by.name('pro_text')).getText()).toBe('Login failed deleted') //how we can read snackbar
    browser.sleep(2000)
  }) */
  


  //BUGGY FEATURE IN SITE
  /*it("should let me verify the restrictions on adding a user account",function(){
    browser.loadAndWaitForAureliaPage('http://localhost:9000');
    login("123-456-7899","password")
    element(by.name('new_shipment')).click()
    browser.sleep(1000)
    element(by.css('[href="#/account"]')).click() //How to click on any of the navbar elements
    browser.sleep(2000)

    element(by.css('[role="button"]')).click()
    browser.sleep(1000)
    var new_button = element(by.name('pro_new_user'))
    new_button.click()
    browser.sleep(1000)

    browser.actions().mouseMove(new_button,{x:500,y:200}).click().perform() //how to click away the drawer, somewhere arbitrary on the page
    browser.sleep(3000)

    element(by.name("pro_first_name")).element(by.name("input")).sendKeys("Buggy")
    element(by.name("pro_last_name")).element(by.name("input")).sendKeys("User")
    element(by.name("pro_email")).element(by.name("input")).sendKeys("wontwork@sirum.org")
    element(by.name("pro_phone")).element(by.name("input")).sendKeys("996-098-2002")
    element(by.name("pro_password")).element(by.name("input")).sendKeys("password")
    browser.sleep(3000)

    element(by.name("pro_first_name")).element(by.name("input")).clear()
    element(by.name("pro_last_name")).element(by.name("input")).clear()
    element(by.name("pro_create_user_button")).click()
    browser.sleep(2000)
  }) */


});