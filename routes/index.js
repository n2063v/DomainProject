let express = require('express');
let router = express.Router();

// Define custom success and fail return message
const success  = (res, data, message) => {
  res.status(200).json({
    status : 200,
    message : message || 'Successfully',
    data : data
  });
};

const fail = (res, message) => {
  res.status(200).json({
    status : 400,
    message : message || 'Failed'
  });
};


// Function defined list of customer to verify which customer registering. Customer Id unique
function checkCustomer (inputCustomerId) {
  // Dummy list of customers
  const customersList = [
    {customerName: "Customer 1", customerId: "123456"},
    {customerName: "Customer 2", customerId: "456789"}];
  // Check if the customer exit
  var isCustomer = customersList.find(findingCustomer => findingCustomer.customerId === inputCustomerId);
  // Return true if customer existed
  if (isCustomer)
    return true;
  else
    return false;
};

// Function defined list of providers to verify
function checkProvider (providerVerification, providerContactId) {
  // Dummy list of providers
  const providerList = [
    {provider: 'provider-software', contactId: 'software-domain', supportDomains: ['software', 'development']},
    {provider: 'provider-tech', contactId: 'tech-domain', supportDomains: ['tech', 'technology']},
    {provider: 'provider-health', contactId: 'health-domain', supportDomains: ['health']},
    {provider: 'provider-school', contactId: 'school-domain', supportDomains: ['school', 'org']}];
  // Check if the customer exit
  let isProvider = providerList.find(findingProvider => findingProvider.provider === providerVerification && findingProvider.contactId === providerContactId);

  // Return true if exist
  if (isProvider)
    return true;
  else
    return false;
};

class domainObject {
  constructor(name, registrationValue) {
    this.domainName = name;
    var gettingToday = new Date();
    var todayYear = gettingToday.getFullYear();
    var todayMonth = gettingToday.getMonth() + 1;
    var todayDate = gettingToday.getDate();
    if (todayMonth < 10)
      todayMonth = '0' + todayMonth;
    if (todayDate < 10)
      todayDate = '0' + todayDate;
    this.expirationDate = [todayYear + registrationValue, todayMonth, todayDate].join('-');
  }
}

// Create - Domain name registration
router.route('/domain').
  post((req, res) => {
    // Check to make sure domain name is at least 10 characters
    if (req.body.domainName.length < 10){
      return fail(res, 'domainName must be at least 10 characters long');
    }
    //Check the input for unit period of registration is YEAR. Only accept YEAR
    if (req.body.periodRegistration.unit !== 'year'){
      return fail(res, 'periodRegistration unit must be year');
    }
    //Check the input for value period of registration must be greater than 0
    if (req.body.periodRegistration.value <= 0){
      return fail(res, 'periodRegistration value must be greater than 0');
    }

    // Calling to check customer existed
    var checkCustomerValue = checkCustomer(req.body.customerId);
    // If customer is not found - doesnt meet the verification criteria
    if(checkCustomerValue === false){
      return fail(res, 'Fail to verify customer. CustomerId is not correct');
    }

    // Calling to check provider existed.
    var checkProviderValue = checkProvider(req.body.verifiedContact.provider, req.body.verifiedContact.contactId);
    // If provider is not found - doesnt meet the verification criteria
    if(checkProviderValue === false){
      return fail(res, 'Fail to verify provider. verifiedContact for provider and/or contactId is not correct');
    }
    // Proceeding with domain registration as succession and return
    var domainObj = new domainObject (req.body.domainName, req.body.periodRegistration.value);
    return success (res, domainObj, 'Successfully registering the domain');
});




// Function defined list of domain to verify for renewal, deletion, and get info
function checkDomain (inputDomainName) {
  // Dummy domain list
  const domainList = [
    {domainName: "seattle.health", expirationDate: new Date(2020, 10, 1)},
    {domainName: "seattle.tech", expirationDate: new Date(2022, 11, 1)},
    {domainName: "art.software", expirationDate: new Date(2023, 11, 1)},
    {domainName: "seattle.software", expirationDate: new Date(2024, 2, 1)}];
  // Check if the customer exit
  var isDomain = domainList.find(findDomain => findDomain.domainName === inputDomainName);
  // Return true if domain existed
  if (isDomain)
    return {exist: true, domainInfo: isDomain};
  else
    return {exist: false};
};

// Update - Domain updating renewal
router.route('/domain').
  put((req, res) => {
    //Check the input for unit period of registration is YEAR. Only accept YEAR
    if (req.body.periodRegistration.unit !== 'year'){
      return fail(res, 'periodRegistration unit must be year');
    }
    //Check the input for value period of registration must be greater than 0
    if (req.body.periodRegistration.value <= 0){
      return fail(res, 'periodRegistration value must be greater than 0');
    }
    // Calling function to verify the domain existed
    var checkingDomain = checkDomain(req.body.domainName);
    // If not found
    if (checkingDomain.exist === false){
      return fail(res, 'Domain Name not found');
    }
    // If found
    else {
      // Get the current info of the domain
      var domainYear = checkingDomain.domainInfo.expirationDate.getFullYear();
      var domainMonth = checkingDomain.domainInfo.expirationDate.getMonth();
      var domainDate = checkingDomain.domainInfo.expirationDate.getDate();
      // Add up the request renewal year
      var newExpiration = new Date(domainYear + req.body.periodRegistration.value, domainMonth, domainDate);
      // Return now
      var returnObject = {domainName: req.body.domainName, expirationDate: newExpiration};
      return success (res, returnObject, 'Successfully update the domain');
    }
});

// Delete - Domain remove request
router.route('/domain').
  delete((req, res) => {
    // Calling the function checkDomain to see if exist
    var checkingDomain = checkDomain(req.body.domainName);
    // If not found
    if (checkingDomain.exist === false){
      return fail(res, 'Domain Name not found');
    }
    // If found
    else {
      // Perform some kind of deletion from the domain List
      // Assume that the requested delete domain is found in the given list
      const domainList = [
        {domainName: "seattle.health", expirationDate: new Date(2020, 10, 1)},
        {domainName: "seattle.tech", expirationDate: new Date(2022, 11, 1)},
        {domainName: "art.software", expirationDate: new Date(2023, 11, 1)},
        {domainName: "seattle.software", expirationDate: new Date(2024, 2, 1)}];
      // Delete action
      // Find the index
      var indexOfdomainName = domainList.findIndex(foundDomain => foundDomain.domainName === req.body.domainName);
      // Take out the object by using the Index
      domainList.splice(indexOfdomainName, 1);
      // Return successful message
      return success (res, {}, 'Successfully delete the domain');
    }
});

// Get - Domain retrieve info request
router.route('/domain').
  get((req, res) => {
    // Calling the function checkDomain to see if exist
    var checkingDomain = checkDomain(req.body.domainName);
    // If not found
    if (checkingDomain.exist === false){
      return fail(res, 'Domain Name not found');
    }
    // If found
    else {
      // Return successful message
      return success (res, checkingDomain.domainInfo, 'Successfully retrieve the domain');
    }
  });

module.exports = router;
